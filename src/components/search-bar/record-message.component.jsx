import { useDispatch } from "react-redux";
import { setChatData, setIsFetchingAnswers } from "reducers/chat-slice";
import { ReactMediaRecorder } from "react-media-recorder";
import MicAnimation from "assets/animations/mic-animation.json";
import Lottie from "lottie-react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { getSpeechToTextCompletion } from "../../api";

export const RecordMessage = () => {
  const dispatch = useDispatch();

  const handleStop = async (blobUrl) => {
    try {
      dispatch(setIsFetchingAnswers(true));
      const blobRes = await fetch(blobUrl);
      if (!blobRes) return;
      const blob = await blobRes.blob();
      const formData = new FormData();
      formData.append("file", blob, "myFile.wav");
      const assistantTextResult = await getSpeechToTextCompletion(formData);
      dispatch(setChatData(assistantTextResult));
    } catch (error) {
      console.log("Unable to record audio : ", error);
    } finally {
      dispatch(setIsFetchingAnswers(false));
    }
  };
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => (
        <div
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className="ml-5 cursor-pointer"
        >
          {status !== "recording" ? (
            <KeyboardVoiceIcon fontSize="large" />
          ) : (
            <div>
              <SettingsVoiceIcon fontSize="large" />
              <Lottie
                animationData={MicAnimation}
                loop={true}
                style={{
                  position: "absolute",
                  width: "6%",
                  marginTop: "-75px",
                  marginLeft: "-42px",
                }}
              />
            </div>
          )}
        </div>
      )}
    />
  );
};

import { useDispatch } from "react-redux";
import { getSpeechToTextChat } from "reducers/chat-slice";
import { ReactMediaRecorder } from "react-media-recorder";
import MicAnimation from "assets/animations/mic-animation.json";
import Lottie from "lottie-react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

export const RecordMessage = () => {
  const dispatch = useDispatch();

  const handleStop = async (blobUrl) => {
    try {
      const blobRes = await fetch(blobUrl);
      if (!blobRes) return;
      const blob = await blobRes.blob();
      dispatch(getSpeechToTextChat(blob));
    } catch (error) {
      console.log("Unable to record audio : ", error);
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

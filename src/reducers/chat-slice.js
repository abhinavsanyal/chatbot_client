import { createSlice } from "@reduxjs/toolkit";
import { getSpeechToTextCompletion } from "../api";

const initialState = {
  chat_data: [],
  is_fetching_answer: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getSpeechToTextChat: async (state, action) => {
      try {
        state.is_fetching_answer = true;
        const formData = new FormData();
        formData.append("file", action.payload, "myFile.wav");
        const assistantTextResult = await getSpeechToTextCompletion(formData);
        console.log({ assistantTextResult });
        const myMessage = {
          sender: "ME",
          text: assistantTextResult?.user_text || "",
        };
        // Append to audio
        const botMessage = {
          sender: "BOT",
          text: assistantTextResult?.completion_text || "",
        };
        state.chat_data = [...state.chat_data, myMessage, botMessage];
      } catch (error) {
        console.log("Unable to get answer for audio : ", error);
      } finally {
        state.is_fetching_answer = false;
      }
    },
  },
});

export const { getSpeechToTextChat } = chatSlice.actions;
export const chatStore = (state) => state.chatSlice;
export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat_data: [],
  is_fetching_answers: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatData: (state, action) => {
      const myMessage = {
        sender: "ME",
        text: action.payload?.user_text || "",
      };
      const botMessage = {
        sender: "BOT",
        text: action.payload?.completion_text || "",
      };

      action.payload?.user_text && action.payload?.user_text != "" 
        && state.chat_data.push(myMessage);

      action.payload?.completion_text && action.payload?.completion_text != "" 
        && state.chat_data.push(botMessage);
    },
    setIsFetchingAnswers: (state, action) => {
      state.is_fetching_answers = action.payload;
    },
  },
});

export const { setChatData, setIsFetchingAnswers } = chatSlice.actions;
export const chatStore = (state) => state.chatSlice;
export default chatSlice.reducer;

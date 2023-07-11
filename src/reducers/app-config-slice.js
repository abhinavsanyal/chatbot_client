import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected_company: "Gaurang DSS",
  companies: ["Gaurang DSS", "Rahul DSS", "Abhinav DSS", "Salil DSS"],
  theme: "dark",
  ai_sound: true,
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      console.log({ state, action });
      state.selected_company = action.payload;
    },
    toggleAiSound: (state, action) => {
      state.ai_sound = !state.ai_sound;
    },
  },
});

export const { setCompany, toggleAiSound } = appConfigSlice.actions;
export const selectCompany = (state) => state.appConfig;
export default appConfigSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected_company: "Gaurang DSS",
  companies: ["Gaurang DSS", "Rahul DSS", "Abhinav DSS", "Salil DSS"],
  theme: "dark",
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.selected_company = action.payload;
    },
  },
});

export const { setCompany } = appConfigSlice.actions;
export const selectCompany = (state) => state.appConfig;
export default appConfigSlice.reducer;

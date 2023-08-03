import { createSlice } from "@reduxjs/toolkit";

const initialState = { mailItems: [], totalInboxMail: 0, totalSentMail: 0 };

const SentMailSlice = createSlice({
  name: "sentMail",
  initialState,
  reducers: {
    sentMail(state, action) {
      state.mailItems = [action.payload, ...state.mailItems];
    },
  },
});

export const SentMailActions = SentMailSlice.actions;

export default SentMailSlice.reducer;

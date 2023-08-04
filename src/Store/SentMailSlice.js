import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentMailList: [],
  viewSentMail: JSON.parse(localStorage.getItem("viewSentMail")),
};

const SentMailSlice = createSlice({
  name: "sentMail",
  initialState,
  reducers: {
    sentedMails(state, action) {
      state.sentMailList = action.payload;
    },
    viewSentMail(state, action) {
      state.viewSentMail = action.payload;
      localStorage.setItem("viewSentMail", JSON.stringify(action.payload));
    },
    deleteSentMail(state, action) {
      state.sentMailList = state.sentMailList.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const SentMailActions = SentMailSlice.actions;

export default SentMailSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { inboxMails: [], totalRecieveMail: 0 };

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    receivedMails(state, action) {
      state.inboxMails = action.payload;
    },
    inboxMail(state, action) {
      state.inboxMails = [action.payload, ...state.inboxMails];
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;

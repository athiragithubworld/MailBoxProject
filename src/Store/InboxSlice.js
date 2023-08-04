import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxMails: [],
  // totalRecieveMail: 0,
  unread: true,
  viewMail: JSON.parse(localStorage.getItem("viewMail")),
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    receivedMails(state, action) {
      state.inboxMails = action.payload;
    },

    readMessage(state, action) {
      state.unread = action.payload;
    },
    viewMail(state, action) {
      state.viewMail = action.payload;
      localStorage.setItem("viewMail", JSON.stringify(action.payload));
    },
    deleteMail(state, action) {
      state.inboxMails = state.inboxMails.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;

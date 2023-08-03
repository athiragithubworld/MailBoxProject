import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import mailBoxReducer from "./MailBoxSlice";
import inboxReducer from "./InboxSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mailBoxData: mailBoxReducer,
    inboxMail: inboxReducer,
  },
});

export default store;

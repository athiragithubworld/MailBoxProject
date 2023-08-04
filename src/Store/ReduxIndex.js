import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
// import mailBoxReducer from "./MailBoxSlice";
import inboxReducer from "./InboxSlice";
import sentMailReducer from "./SentMailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // mailBoxData: mailBoxReducer,
    inboxMail: inboxReducer,
    sentMail: sentMailReducer,
  },
});

export default store;

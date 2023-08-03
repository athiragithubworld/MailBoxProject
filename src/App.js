import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoginPage from "./Components/Authentication/LoginPage";
import Headers from "./Components/Layouts/Headers";
import { Routes, Route } from "react-router-dom";
import MainMenuList from "./Components/Layouts/MainMenuList";
// import ComposeMail from "./Components/Pages/ComposeMail";
// import DraftMail from "./Components/Pages/DraftMail";
// import SentMail from "./Components/Pages/SentMail";
// import Inbox from "./Components/Pages/Inbox";
import axios from "axios";
import { MailBoxActions } from "./Store/MailBoxSlice";
import { inboxActions } from "./Store/InboxSlice";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const receiveMailData = () => {
    axios
      .get(
        `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/recieveMailData.json`
      )
      .then((response) => {
        console.log("get response", response.data);
        const data = response.data;
        const recievedMails = [];
        for (const key in data) {
          // totalAmount += data[key].expenseAmount;

          recievedMails.push({
            key: key,
            // toEmail: data[key].toEmail,
            fromEmail: data[key].fromEmail,
            date: data[key].date,
            subject: data[key].subject,
            mailContent: data[key].mailContent,
            id: data[key].id,
          });
        }
        console.log("recieve data", recievedMails);
        dispatch(inboxActions.receivedMails(recievedMails));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (auth.isLoggedIn) {
      receiveMailData();
    }
  }, []);
  return (
    <div>
      {auth.isLoggedIn && <Headers />}
      {auth.isLoggedIn && <MainMenuList />}
      {/* <ComposeMail /> */}
      <Routes>
        {!auth.isLoggedIn && <Route path="/" element={<LoginPage />}></Route>}
        {/* {auth.isLoggedIn && (
          <Route path="/compose" element={<ComposeMail />}></Route>
        )}
        {auth.isLoggedIn && <Route path="/inbox" element={<Inbox />}></Route>}
        {auth.isLoggedIn && (
          <Route path="/draft" element={<DraftMail />}></Route>
        )}
        {auth.isLoggedIn && <Route path="/sent" element={<SentMail />}></Route>} */}
      </Routes>
    </div>
  );
}

export default App;

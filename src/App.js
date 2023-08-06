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
import { inboxActions } from "./Store/InboxSlice";
import { SentMailActions } from "./Store/SentMailSlice";
import useFetch from "./Components/CustomHooksDataFetching/UseFetch";
// import ViewMessage from "./Components/Pages/ViewMessage";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let sentMailUrl = `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/sendMailData.json`;

  const [sentedData] = useFetch(sentMailUrl);
  // useSentedMailData(sentMailUrl, dispatch, SentMailActions);

  // ---------  Getting data from Received Mails ----------- //

  let receiveMailUrl = `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/recieveMailData.json`;
  const [receiveData] = useFetch(receiveMailUrl);

  // Getting sented Mail Data

  const receiveMailData = () => {
    // axios
    //   .get(
    //     `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/recieveMailData.json`
    //   )
    //   .then((response) => {
    //     console.log("get response", response.data);
    //     const data = response.data;
    //     const recievedMails = [];
    //     for (const key in data) {
    //       // totalAmount += data[key].expenseAmount;
    //       recievedMails.push({
    //         key: key,
    //         // toEmail: data[key].toEmail,
    //         fromEmail: data[key].fromEmail,
    //         date: data[key].date,
    //         subject: data[key].subject,
    //         mailContent: data[key].mailContent,
    //         id: data[key].id,
    //         unread: data[key].unread,
    //       });
    //     }
    //     console.log("recieve data", recievedMails);
    //     if (recievedMails) {
    //       dispatch(inboxActions.receivedMails(recievedMails));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // Using CustomHooks

    const recievedMails = [];
    for (const key in receiveData) {
      // totalAmount += data[key].expenseAmount;
      recievedMails.push({
        key: key,
        // toEmail: data[key].toEmail,
        fromEmail: receiveData[key].fromEmail,
        date: receiveData[key].date,
        subject: receiveData[key].subject,
        mailContent: receiveData[key].mailContent,
        id: receiveData[key].id,
        unread: receiveData[key].unread,
      });
    }
    // console.log("recieve data 111", recievedMails);
    if (recievedMails) {
      dispatch(inboxActions.receivedMails(recievedMails));
    }
  };

  const sentedMailData = async () => {
    // Using CustomHooks
    const sentedMails = [];
    for (const key in sentedData) {
      // totalAmount += data[key].expenseAmount;
      sentedMails.push({
        key: key,
        // toEmail: data[key].toEmail,
        toEmail: sentedData[key].toEmail,
        date: sentedData[key].date,
        subject: sentedData[key].subject,
        mailContent: sentedData[key].mailContent,
        id: sentedData[key].id,
        unread: sentedData[key].unread,
      });
    }
    // console.log("sent data", sentedMails);
    if (sentedMails.length > 0) {
      dispatch(SentMailActions.sentedMails(sentedMails));
    }
  };

  let interval;

  useEffect(() => {
    if (auth.isLoggedIn) {
      // receiveMailData();
      // sentedMailData();

      interval = setInterval(() => {
        receiveMailData();
        sentedMailData();
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      // clearInterval(sentMailInterval);
    };
  }, [auth.isLoggedIn, receiveMailData, sentedMailData]);

  // useEffect(() => {
  //   receiveMailData();
  //   sentedMailData();
  //   interval = setInterval(() => {
  //     receiveMailData();
  //     sentedMailData();
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //     // clearInterval(sentMailInterval);
  //   };
  // }, [auth.isLoggedIn]);

  return (
    <div>
      {auth.isLoggedIn && <Headers />}
      {auth.isLoggedIn && <MainMenuList />}
      {/* <ComposeMail /> */}
      <Routes>
        {!auth.isLoggedIn && <Route path="/" element={<LoginPage />}></Route>}
        {/* {auth.isLoggedIn && (
          <Route path="/viewmessage" element={<ViewMessage />}></Route>
        )} */}
        {/* {auth.isLoggedIn && (
          <Route path="/compose" element={<ComposeMail />}></Route>
        )} */}
        {/* {auth.isLoggedIn && <Route path="/inbox" element={<Inbox />}></Route>}
       
        {auth.isLoggedIn && (
          <Route path="/draft" element={<DraftMail />}></Route>
        )} */}
        {/* {auth.isLoggedIn && <Route path="/sent" element={<SentMail />}></Route>} */}
        {/* {auth.isLoggedIn && <Route path="/starred" element={<Starred />}></Route>} */}
      </Routes>
    </div>
  );
}

export default App;

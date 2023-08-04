import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ComposeMail from "../Pages/ComposeMail";
import { Navigate, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SentMail from "../Pages/SentMail";
import DraftMail from "../Pages/DraftMail";
import Inbox from "../Pages/Inbox";
import ViewMessage from "../Pages/ViewMessage";
import axios from "axios";
import { inboxActions } from "../../Store/InboxSlice";

const MainMenuList = () => {
  const auth = useSelector((state) => state.auth);
  const inbox = useSelector((state) => state.inboxMail.inboxMails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalUnread = 0;
  inbox.forEach((item) => {
    if (item.unread === true) {
      totalUnread++;
    }
  });

  const composeHandler = () => {
    navigate("/compose", { replace: true });
    // <Navigate to="/compose" replace={true} />;
  };

  const inboxHandler = () => {
    // <Navigate to="/inbox" replace={true} />;

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
            unread: data[key].unread,
          });
        }
        console.log("recieve data", recievedMails);
        dispatch(inboxActions.receivedMails(recievedMails));
        navigate("/inbox", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const draftHandler = () => {
    navigate("/draft", { replace: true });
    // <Navigate to="/draft" replace={true} />;
  };

  const sentHandler = () => {
    navigate("/sent", { replace: true });
    // <Navigate to="/sent" replace={true} />;
  };

  return (
    <>
      <div className="row">
        <div className="col-1">
          <div
            className="card"
            style={{
              width: "10rem",
              height: "630px",
              backgroundColor: "rgb(55, 54, 54)",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              style={{
                marginTop: "15px",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
              onClick={composeHandler}
            >
              Compose
              {/* <NavLink to="/compose">Compose</NavLink> */}
            </button>
            <div class="list-group" style={{ gap: 15 }} role="tablist">
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px", gap: 5 }}
                onClick={inboxHandler}
              >
                Inbox
                <>
                  <span
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    {totalUnread}
                  </span>
                </>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                onClick={draftHandler}
              >
                Draft
                {/* <NavLink to="/draft">Draft</NavLink> */}
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                // onClick={allMailsHandler}
              >
                All Mails
                {/* <NavLink to="/allmails">All Mails</NavLink> */}
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                onClick={sentHandler}
              >
                Sent
                {/* <NavLink to="/sent">Sent</NavLink> */}
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                // onClick={starredHandler}
              >
                Starred
                {/* <NavLink to="/starred">Starred</NavLink> */}
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                // onClick={snoozedHandler}
              >
                Snoozed
                {/* <NavLink to="/snoozed">Snoozed</NavLink> */}
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                // onClick={spamHandler}
              >
                Spam
                {/* <NavLink to="/snoozed">Spam</NavLink> */}
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
                // onClick={trashHandler}
              >
                Trash
                {/* <NavLink to="/snoozed">Trash</NavLink> */}
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div
            className="container-sm"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "50px",
              marginRight: "10px",
              marginBottom: "5px",
              maxWidth: "1250px",
              maxHeight: "1500px",
              minHeight: "600px",
            }}
          >
            <Routes>
              {auth.isLoggedIn && (
                <Route path="/compose" element={<ComposeMail />}></Route>
              )}
              {auth.isLoggedIn && (
                <Route path="/inbox" element={<Inbox />}></Route>
              )}
              {auth.isLoggedIn && (
                <Route path="/draft" element={<DraftMail />}></Route>
              )}
              {auth.isLoggedIn && (
                <Route path="/sent" element={<SentMail />}></Route>
              )}
              {auth.isLoggedIn && (
                <Route path="/viewmessage" element={<ViewMessage />}></Route>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenuList;

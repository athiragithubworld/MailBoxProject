import React from "react";
import { useSelector } from "react-redux";
import ComposeMail from "../Pages/ComposeMail";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SentMail from "../Pages/SentMail";
import DraftMail from "../Pages/DraftMail";
import Inbox from "../Pages/Inbox";

const MainMenuList = () => {
  const auth = useSelector((state) => state.auth);
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
            >
              <NavLink to="/compose">Compose</NavLink>
            </button>
            <div class="list-group" style={{ gap: 15 }} role="tablist">
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/inbox">Inbox</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/draft">Draft</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/allmails">All Mails</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/sent">Sent</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/starred">Starred</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/snoozed">Snoozed</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/snoozed">Spam</NavLink>
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                <NavLink to="/snoozed">Trash</NavLink>
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
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenuList;

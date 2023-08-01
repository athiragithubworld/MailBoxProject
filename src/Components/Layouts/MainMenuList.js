import React from "react";
import ComposeMail from "../Pages/ComposeMail";

const MainMenuList = () => {
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
              Compose
            </button>
            <div class="list-group" style={{ gap: 15 }} role="tablist">
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Inbox
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Starred
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Snoozed
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Sent
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Draft
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                All Mails
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Spam
              </button>
              <button
                type="button"
                class="btn btn-outline-info"
                style={{ border: "0px" }}
              >
                Trash
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div
            className="container-sm"
            style={{
              backgroundColor: "white",
              // width: "77rem",
              marginTop: "10px",
              marginLeft: "50px",
              marginRight: "10px",
              marginBottom: "5px",
            }}
          >
            <ComposeMail />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenuList;

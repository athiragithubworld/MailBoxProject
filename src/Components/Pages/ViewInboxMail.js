import React from "react";
import "./ViewInboxMail.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMessage = () => {
  const navigate = useNavigate();
  const inbox = useSelector((state) => state.inboxMail);
  const closeHandler = () => {
    navigate("/inbox", { replace: true });
  };

  return (
    <div className="container">
      {}
      <div>
        <button
          type="button"
          className="btn btn-outline-danger"
          style={{ marginTop: "30px", marginLeft: "1050px" }}
          onClick={closeHandler}
        >
          Close
        </button>
      </div>
      <main>
        <div>
          <div className="header">
            <h1>{inbox.viewMail.subject}</h1>
          </div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <img
                  // className="avatar"
                  style={{ width: "40px", height: "40px" }}
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                />
              </li>
              <li style={{ gap: "50" }}>
                <span style={{ fontWeight: "bold" }}>From : </span>
                <span>{inbox.viewMail.fromEmail}</span>

                <div>
                  <span style={{ fontWeight: "bold" }}>Date : </span>
                  <span>{inbox.viewMail.date}</span>
                </div>
              </li>
            </ul>
          </div>
          <div
            style={{
              textAlign: "left",
              // width: "800px",
              padding: "50px",
            }}
            dangerouslySetInnerHTML={{ __html: inbox.viewMail.mailContent }}
          ></div>
        </div>

        <ul
          style={{
            listStyle: "none",
            paddingBottom: "0px",
            marginBottom: "10px",
          }}
        >
          {/* <div className="attachments"> */}
          <li style={{ gap: 5 }}>
            <span className="badge badge-danger">zip</span> <b>bootstrap.zip</b>{" "}
            <i>(2,5MB)</i>
            <span className="menu">
              <a href="#" class="fa fa-search"></a>
              <a href="#" class="fa fa-share"></a>
              <a href="#" class="fa fa-cloud-download"></a>
            </span>
            <span className="badge badge-info">txt</span> <b>readme.txt</b>{" "}
            <i>(7KB)</i>
            <span className="menu">
              <a href="#" class="fa fa-search"></a>
              <a href="#" class="fa fa-share"></a>
              <a href="#" class="fa fa-cloud-download"></a>
            </span>
            <span className="badge badge-success">xls</span>
            <b>spreadsheet.xls</b> <i>(984KB)</i>
            <span className="menu">
              <a href="#" className="fa fa-search"></a>
              <a href="#" className="fa fa-share"></a>
              <a href="#" className="fa fa-cloud-download"></a>
            </span>
          </li>

          {/* </div> */}
        </ul>
        {/* </div> */}
      </main>
    </div>
  );
};

export default ViewMessage;

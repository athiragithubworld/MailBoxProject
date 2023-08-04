import React from "react";
import "./ViewSentMail.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewSentMail = () => {
  const navigate = useNavigate();
  const sentMail = useSelector((state) => state.sentMail);

  const closeHandler = () => {
    navigate("/sent", { replace: true });
  };
  return (
    <div className="container">
      {}

      <div>
        {/* <h2>View Sent Mail</h2> */}

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
            <h1>{sentMail.viewSentMail.subject}</h1>
          </div>
          <div>
            <ul style={{ listStyle: "none", gap: 5 }}>
              <li>
                <img
                  // className="avatar"
                  style={{ width: "40px", height: "40px" }}
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                />
              </li>
              <li style={{ gap: "50" }}>
                <span style={{ fontWeight: "bold" }}>To : </span>
                <span>{sentMail.viewSentMail.toEmail}</span>

                <div>
                  <span style={{ fontWeight: "bold" }}>Date : </span>
                  <span>{sentMail.viewSentMail.date}</span>
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
            dangerouslySetInnerHTML={{
              __html: sentMail.viewSentMail.mailContent,
            }}
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

export default ViewSentMail;

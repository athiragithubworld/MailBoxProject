import React from "react";
import { GrSearch } from "react-icons/gr";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoIosMail } from "react-icons/io";

const Inbox = () => {
  const inbox = useSelector((state) => state.inboxMail);

  const inboxMaillen = inbox.inboxMails.length;

  return (
    <div>
      <div
        className="container-sm"
        style={{
          backgroundColor: "white",
          marginTop: "10px",
          marginLeft: "50px",
          marginRight: "10px",
          marginBottom: "5px",
        }}
      >
        <h1>Inbox Mails</h1>
        {/* <!-- BEGIN INBOX CONTENT --> */}
        <div class="col-md-9">
          <div class="row">
            <div class="col-sm-6">
              <label style={{ marginRight: "8px" }} class="">
                <div
                  class="icheckbox_square-blue"
                  style={{ position: "relative" }}
                >
                  <input
                    type="checkbox"
                    id="check-all"
                    class="icheck"
                    style={{
                      position: "absolute",
                      top: "-20%",
                      left: "-20%",
                      display: "block",
                      width: "140%",
                      height: "140%",
                      margin: "0px",
                      padding: "0px",
                      border: "0px",
                      opacity: "0",
                      background: "rgb(255, 255, 255)",
                    }}
                  />
                  <ins
                    class="iCheck-helper"
                    style={{
                      position: "absolute",
                      top: "-20%",
                      left: "-20%",
                      display: "block",
                      width: "140%",
                      height: "140%",
                      margin: "0px",
                      padding: "0px",
                      border: "0px",
                      opacity: "0",
                      background: "rgb(255, 255, 255)",
                    }}
                  ></ins>
                </div>
              </label>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Action <span className="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu">
                  <li>
                    <a href="#">Mark as read</a>
                  </li>
                  <li>
                    <a href="#">Mark as unread</a>
                  </li>
                  <li>
                    <a href="#">Mark as important</a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a href="#">Report spam</a>
                  </li>
                  <li>
                    <a href="#">Delete</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-6 search-form">
              <form action="#" class="text-right">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control input-sm"
                    placeholder="Search"
                  />
                  <span class="input-group-btn">
                    <button
                      type="submit"
                      name="search"
                      class="btn_ btn-primary btn-sm search"
                    >
                      <GrSearch />
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>

          <div class="padding" style={{ gap: 5 }}></div>
          <div>
            <div class="table-responsive table-hover">
              <table class="table">
                <tbody>
                  {/* {console.log(mailBoxData.receivedMails)} */}
                  {inboxMaillen > 0
                    ? inbox.inboxMails.map((item) => (
                        <tr key={item.key}>
                          <td class="action">
                            <input type="radio" />
                          </td>
                          <td class="action">
                            <CiStar />
                          </td>
                          <td class="subject">{item.subject}</td>
                          <td class="sender">{item.fromEmail}</td>
                          <td class="Date">{item.date}</td>
                          <td class="action">
                            <IoIosMail />
                          </td>
                          <td class="action">
                            <MdDelete />
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginBottom: "0px", gap: "5" }}>
            <ul class="pagination">
              <li class="disabled">
                <a href="#">«</a>
              </li>
              <li class="active">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">5</a>
              </li>
              <li>
                <a href="#">»</a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- END INBOX CONTENT --> */}
      </div>
    </div>
  );
};

export default Inbox;

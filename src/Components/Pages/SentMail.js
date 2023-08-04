import React from "react";
import { BiMessageCheck } from "react-icons/bi";
import { BiUserCheck } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { BiFolder } from "react-icons/bi";
import { GrSearch } from "react-icons/gr";
import { CiStar } from "react-icons/ci";
// import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { SentMailActions } from "../../Store/SentMailSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SentMail = () => {
  const sentMails = useSelector((state) => state.sentMail);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sentMaillen = sentMails.sentMailList.length;

  const viewMailHandler = (item) => {
    dispatch(SentMailActions.viewSentMail(item));

    navigate("/viewSentMail", { replace: true });
  };

  const onDeleteHandler = (item) => {
    // console.log("delete", item);
    axios
      .delete(
        `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/sendMailData/${item.key}.json`
      )
      .then((response) => {
        console.log("res", response);
        dispatch(SentMailActions.deleteSentMail(item));
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

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
        <h1>Sent Mails</h1>
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
              <table className="table">
                <tbody>
                  {/* {console.log(mailBoxData.receivedMails)} */}
                  {sentMaillen > 0
                    ? sentMails.sentMailList.map((item) => (
                        <tr
                          key={item.key}
                          onClick={() => viewMailHandler(item)}
                        >
                          <td class="action">
                            {/* <input type="radio" checked={item.unread} /> */}
                          </td>
                          <td class="action">
                            <CiStar />
                          </td>
                          <td className="px-1">
                            <BiSolidUser />
                          </td>
                          <td class="sender"> To : {item.toEmail}</td>
                          <td className="px-20">{item.subject}</td>
                          <td> </td>
                          <td className="px-20">{item.date}</td>
                          <td> </td>
                          <td className="px-2">
                            <BiMessageCheck />
                          </td>
                          {/* <td class="action">
                            <BiUserCheck />
                          </td> */}

                          <td class="px-2">
                            <BiFolder />
                          </td>
                          <td class="px-2">
                            {/* <button> */}{" "}
                            <MdDelete
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteHandler(item);
                              }}
                            />{" "}
                            {/* </button> */}
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
        {/* <!-- END SENT MAIL CONTENT --> */}
      </div>
    </div>
  );
};

export default SentMail;

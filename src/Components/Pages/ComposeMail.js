import React, { useRef, useState } from "react";
import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // Import Draft Wysiwyg styles
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SentMailActions } from "../../Store/SentMailSlice";
import { convertToHTML } from "draft-convert";

const ComposeMail = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputEmail, setInputMail] = useState("");
  const inputSubject = useRef("");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const emailHandler = (event) => {
    setInputMail(event.target.value);
  };

  const sendMailHandler = (event) => {
    const contentText = convertToHTML(editorState.getCurrentContent());

    const sendMailItem = {
      toEmail: inputEmail,
      // fromEmail: auth.emailId,
      subject: inputSubject.current.value,
      mailContent: contentText,
      date: new Date(),
      id: Math.random().toString(),
    };

    if (inputEmail !== "" && inputSubject.current.value !== "") {
      axios
        .post(
          `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/sendMailData.json`,
          sendMailItem
        )
        .then((response) => {
          console.log("res", response.data);
          dispatch(SentMailActions.sentMail(sendMailItem));
          alert("Mail sent successfully");
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      return alert("Enter valid data ");
    }

    const recieveMailItem = {
      // toEmail: auth.emailId,
      fromEmail: auth.emailId,
      subject: inputSubject.current.value,
      mailContent: contentText,
      date: new Date(),
      id: Math.random().toString(),
    };

    if (inputEmail !== "" && inputSubject.current.value !== "") {
      const inputmail = inputEmail.replace(/[@.]/g, "");
      axios
        .post(
          `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${inputmail}/recieveMailData.json`,
          recieveMailItem
        )
        .then((response) => {
          console.log("res", response.data);
          dispatch(SentMailActions.inboxMail(recieveMailItem));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    setInputMail("");
    inputSubject.current.value = "";
    setEditorState(editorState.createEmpty);
  };

  return (
    <>
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
        <p class="text-center">New Message</p>

        <form>
          <div class="form-row mb-3">
            <label for="to" class="col-2 col-sm-1 col-form-label">
              To
            </label>
            <div class="col-10 col-sm-11">
              <input
                type="email"
                class="form-control"
                id="to"
                placeholder="Type email"
                value={inputEmail}
                onChange={emailHandler}
              />
            </div>
          </div>

          <div class="form-row mb-3">
            <label for="text" class="col-2 col-sm-1 col-form-label">
              Subject
            </label>
            <div class="col-10 col-sm-11">
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Type Subject"
                ref={inputSubject}
              />
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-sm-11 ml-auto">
            <div
              class="form-group mt-4"
              style={{
                border: "2px solid #ccc",
                height: "350px",
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "center",
                // fontSize: "calc(10px+2vmin)",
                // margin: "5vh",
                // textAlign: "center",
                // padding: "12px",
              }}
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={handleChange}

                // toolbarClassName="toolbarClassName"
                // wrapperClassName="wrapperClassName"
                // editorClassName="editorClassName"
              />
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-success"
                onClick={sendMailHandler}
              >
                Send
              </button>
              <button type="submit" class="btn btn-light">
                Draft
              </button>
              <button type="submit" class="btn btn-danger">
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposeMail;

import React, { useRef, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // Import Draft Wysiwyg styles
import { useSelector } from "react-redux";
import axios from "axios";

const ComposeMail = () => {
  const auth = useSelector((state) => state.auth);
  const inputEmail = useRef();
  const inputSubject = useRef("");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  const sendMailHandler = (event) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentText = contentState.getPlainText();

    const mailItem = {
      toEmail: inputEmail.current.value,
      fromEmail: auth.emailId,
      subject: inputSubject.current.value,
      mailContent: contentText,
      id: Math.random().toString(),
    };

    if (mailItem) {
      axios
        .post(
          `https://mailboxproject-f1499-default-rtdb.firebaseio.com/${auth.email}/sendMailData.json`,
          mailItem
        )
        .then((response) => {
          console.log("res", response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <>
      <div className="container">
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
                ref={inputEmail}
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
              {/* <textarea
                className="form-control"
                rows="12"
                cols="50"
                name="content"
                form="usrform"
                type="text"
                id="text"
                placeholder="Click here to reply"
                value={inputMailContent}
              ></textarea> */}
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

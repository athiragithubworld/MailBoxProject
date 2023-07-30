import React, { useRef, useState } from "react";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/AuthSlice";

const LoginPage = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const [login, setLogin] = useState(false);

  const dispatch = useDispatch();

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;

    console.log("email", enteredEmail);
    console.log("pass", enteredPassword);

    if (enteredEmail.includes("@") && enteredPassword.trim().length > 6) {
      let url = "";
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW3HHSmF3d1gplJ7H71iATFTnR70fNHmo";
      } else {
        const enteredConfirmPassword = inputConfirmPassword.current.value;
        if (enteredPassword === enteredConfirmPassword) {
          url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW3HHSmF3d1gplJ7H71iATFTnR70fNHmo";
        } else if (enteredPassword !== enteredConfirmPassword) {
          return alert(" Please enter same password ");
        }
        inputConfirmPassword.current.value = "";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              let errormessage = "Authentication Failed";
              // if (data && data.error && data.error.message) {
              //   errormessage = data.error.message;
              // }

              throw new Error(errormessage);
            });
          }
        })
        .then((data) => {
          console.log("loginid", data.idToken);

          const email = data.email.replace(/[@.]/g, "");

          // authcontext api
          // authcntx.login(data.idToken, email);

          // dispatch the value
          dispatch(authActions.login({ token: data.idToken, email: email }));
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      return alert("Please enter valid data");
    }

    inputEmail.current.value = "";
    inputPassword.current.value = "";
  };
  return (
    <div>
      <div className="form-box">
        <form className="form" onSubmit={submitHandler}>
          <span className="title">{login ? "Log In" : "Sign Up"}</span>
          <span className="subtitle">
            {!login
              ? "Create a free account with your email."
              : "Enter your Email and Password to Login"}
          </span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              ref={inputEmail}
              // required=""
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              ref={inputPassword}
              // required=""
            />
            {!login && (
              <input
                type="password"
                className="input"
                placeholder="Confirm Password"
                ref={inputConfirmPassword}
                required=""
              />
            )}
          </div>
          <button>{!login ? "Sign up" : "Login"}</button>
        </form>
        <div className="form-section" onClick={switchAuthModeHandler}>
          {!login && (
            <p>
              Have an account? <a href="">Log in</a>{" "}
            </p>
          )}
          {login && (
            <p>
              Create new account? <a href="">Sign Up</a>{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

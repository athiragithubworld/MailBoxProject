import React, { useEffect, useRef, useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const [isLogin, setIsLogin] = useState(false);

  let url = "";

  const loginHandler = (event) => {
    event.prevenDefault();
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const signUpHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;
    const enteredConfirmPassword = inputConfirmPassword.current.value;

    if (
      enteredEmail.includes("@") &&
      enteredPassword.trim().length > 6 &&
      enteredConfirmPassword.trim().length > 6
    ) {
      if (enteredPassword === enteredConfirmPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW3HHSmF3d1gplJ7H71iATFTnR70fNHmo";

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
              console.log("Sign Up");
              alert(" Sucessfully Signed Up ");
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

            // // authcontext api
            // // authcntx.login(data.idToken, email);

            // // dispatch the value
            // dispatch(authActions.login({ token: data.idToken, email: email }));

            // // console.log("email", email);
            // // cartcntx.addProduct({ email: email });
            // // navigate("/store");
          })
          .catch((err) => {
            alert(err.message);
          });
      } else if (enteredPassword !== enteredConfirmPassword) {
        return alert(" Please enter same password ");
      }
    } else {
      alert("Please enter valid data");
    }

    inputEmail.current.value = "";
    inputPassword.current.value = "";
    inputConfirmPassword.current.value = "";
  };

  return (
    <div>
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="login">
          <form class="form">
            <label for="chk" aria-hidden="true">
              Log in
            </label>
            <input
              class="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              class="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            {/* {!isLogin && (
              <div className="form_control">
                <input
                  required
                  className="input"
                  type="password"
                  ref={inputConfirmPassword}
                />
                <label className="label"> Confirm Password</label>
              </div>
            )} */}
            <button onClick={loginHandler}>
              {/* {isLogin ? "Login" : "Sign Up"} */}
              Log in
            </button>
          </form>
        </div>

        <div class="register">
          <form class="form">
            <label for="chk" aria-hidden="true">
              Sign Up
            </label>

            <input
              class="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              ref={inputEmail}
            />
            <input
              class="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              ref={inputPassword}
            />
            <input
              class="input"
              type="password"
              name="pswd"
              placeholder="Confirm Password"
              required=""
              ref={inputConfirmPassword}
            />
            <button onClick={signUpHandler}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

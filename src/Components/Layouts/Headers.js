import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("viewMail");
    localStorage.removeItem("viewSentMail");
    navigate("/", { replace: true });
    dispatch(authActions.logout());
  };

  return (
    <div>
      <nav
        className="navbar  border-bottom border-body"
        data-bs-theme="#573b8a"
        style={{ backgroundColor: "black", marginTop: "0px", gap: 2 }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "30px",
            fontFamily: "Arila",
            fontWeight: "bold",
            fontStyle: "oblique",

            // textAlign: "left",
          }}
        >
          Welcome to Cloud Mail
        </h1>
        <h6 style={{ color: "white" }}> Login User : {auth.email}</h6>
        <span style={{ marginLeft: "120px" }}>
          <button
            style={{ borderRadius: "20px" }}
            type="button"
            className="btn btn-outline-danger"
            onClick={LogoutHandler}
          >
            Logout
          </button>
        </span>
      </nav>
    </div>
  );
};

export default Headers;

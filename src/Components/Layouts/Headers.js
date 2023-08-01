import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/AuthSlice";

const Headers = () => {
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div>
      <nav
        className="navbar  border-bottom border-body"
        data-bs-theme="#573b8a"
        style={{ backgroundColor: "black" }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "30px",
            fontFamily: "Arila",
            fontWeight: "bold",
            fontStyle: "oblique",
            // marginLeft: 0,
            // textAlign: "left",
          }}
        >
          Welcome to Cloud Mail
        </h1>

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

import React from "react";

const Headers = () => {
  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body"
        // data-bs-theme="#573b8a"
        style={{ color: "#573b8a" }}
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
          Cloud Mail
        </h1>
      </nav>
    </div>
  );
};

export default Headers;

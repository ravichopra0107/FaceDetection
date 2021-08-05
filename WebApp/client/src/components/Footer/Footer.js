import React from "react";
import classes from "./Footer.module.css";
import { withRouter } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className={classes.Footer} style={{ position: "fixed", bottom: "0" }}>
      <div>
        <a
          className={classes.Link}
          href="https://www.linkedin.com/in/ravichopraatiiitm/"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a className={classes.Link} href="https://github.com/ravichopra0107">
          <i className="fab fa-github"></i>
        </a>
      </div>
      <p className={classes.P}>
        Hi, {JSON.parse(localStorage.getItem("user")).name}!
      </p>
    </div>
  );
};

export default withRouter(Footer);

import React from "react";
import classes from "./Footer.module.css";
import { withRouter } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className={classes.Footer} style={{ position: "fixed", bottom: "0" }}>
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
  );
};

export default withRouter(Footer);

import React from "react";
import classes from "./Footer.module.css";
import { withRouter } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className={classes.Footer} style={{ position: "fixed", bottom: "0" }}>
      <i className="fab fa-linkedin-in"></i>
      <i className="fab fa-github"></i>
    </div>
  );
};

export default withRouter(Footer);

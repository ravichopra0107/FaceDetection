import React from "react";
import classes from "./Logo.module.css";
import bbqSVG from "../../../assets/logo.svg";

const Logo = (props) => {
  return (
      <div>
      <img src={bbqSVG} alt="bbqSVG" className={classes.Logo}/>
        <h1 className={classes.LogoText}>ate</h1>
      </div>
  );
};

export default Logo;

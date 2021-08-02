import React from "react";
import classes from "./Logo.module.css";
import {NavLink} from "react-router-dom";
import bbqSVG from "../../../assets/logo.svg";

const Logo = (props) => {
  return (
      <NavLink to="/">
      <img src={bbqSVG} alt="bbqSVG" className={classes.Logo}/>
        <h1 className={classes.LogoText}>ate</h1>
      </NavLink>
  );
};

export default Logo;

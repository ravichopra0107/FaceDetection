import React, { Component } from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../components/UI/Logo/Logo.js";

class Navbar extends Component {
  render() {
    return (
      <div className={classes.Navbar}>
        <Logo />
        <NavLink to="/" className={classes.Ulink}><h1>Login</h1></NavLink>
      </div>
    );
  }
}

export default Navbar;

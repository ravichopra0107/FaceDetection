import React, { Component } from "react";
import classes from "./Navbar.module.css";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../components/UI/Logo/Logo.js";

class Navbar extends Component {
  logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.props.setAuthFalse();
  };
  render() {
    return (
      <div className={classes.Navbar}>
        <Logo />
        {this.props.auth ? (
          <div className={classes.Items}>
            <NavLink to="/pay" className={classes.Link}>
              Pay
            </NavLink>
            <NavLink to="/profile" className={classes.Link}>
              <i className="fas fa-user-circle"></i>
            </NavLink>
            <NavLink
              to="/"
              className={classes.Ulink}
              style={{ fontWeight: "normal" }}
              onClick={this.logout}
            >
              Logout
            </NavLink>
          </div>
        ) : this.props.match.url === "/login" ||
          this.props.match.url === "/otp" ? (
          <NavLink to="/" className={classes.Ulink}>
            Sign Up
          </NavLink>
        ) : (
          <NavLink to="/login" className={classes.Ulink}>
            Login
          </NavLink>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthFalse: () => dispatch({ type: "False_Auth" }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

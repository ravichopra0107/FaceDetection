import React, { Component } from "react";
import classes from "./Navbar.module.css";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux.js";
import hamburgerSVG from "../../assets/hamburger.svg";
import Logo from "../../components/UI/Logo/Logo.js";
import Sidedrawer from "../Sidedrawer/Sidedrawer.js";

class Navbar extends Component {
  state = {
    show: false,
  };
  logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.props.history.replace("/");
    this.props.setAuthFalse();
  };
  show = () => {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  };
  render() {
    return (
      <Aux>
        <div className={classes.Navbar}>
          <Logo />
          {this.props.auth ? (
            <Aux>
              <div className={classes.Items}>
                <NavLink to="/pay" className={classes.Link}>
                  Pay
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
              <img
                src={hamburgerSVG}
                alt="hamburger"
                className={classes.Hamburger}
                onClick={this.show}
              />
            </Aux>
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
        {this.props.auth && this.state.show && <Sidedrawer />}
      </Aux>
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

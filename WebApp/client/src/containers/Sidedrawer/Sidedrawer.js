import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Sidedrawer.module.css";
import Fade from "react-reveal/Fade";

class Sidedrawer extends Component {
  logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.props.history.replace("/");
    this.props.setAuthFalse();
  };
  render() {
    return (
      <Fade>
        <ul className={classes.List}>
          <li>
            <NavLink to="/pay" className={classes.Link}>
              Pay
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={classes.Ulink}
              style={{ fontWeight: "normal" }}
              onClick={this.logout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </Fade>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidedrawer)
);

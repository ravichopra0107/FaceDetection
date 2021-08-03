import React, { Component } from "react";
import classes from "./paymentFailed.module.css";
import failSVG from "../../assets/fail.svg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class paymentFailed extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.replace("/");
    }
  }
  render() {
    return <img src={failSVG} alt="paymentFail" className={classes.failSVG} />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(paymentFailed));

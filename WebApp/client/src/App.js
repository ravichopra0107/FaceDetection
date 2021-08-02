import "./App.css";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import Timeline from "./containers/Timeline/Timeline.js";
import SignUp from "./containers/SignUp/SignUp.js";
import Payment from "./containers/Payment/Payment.js";
import OTP from "./containers/OTP/otp.js";
import SignIn from "./containers/SignIn/SignIn.js";

class App extends Component {
  UNSAFE_componentWillMount() {
    var isExpired = false;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      var decodedToken = jwt.decode(user.token);
      var dateNow = new Date();
      console.log(decodedToken.iat * 1000 + 3600000 - dateNow.getTime());
      if (dateNow.getTime() > decodedToken.iat * 1000 + 3600000)
        isExpired = true;
      if (isExpired) {
        localStorage.clear();
        this.props.setAuthFalse();
      } else {
        this.props.setAuthTrue();
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/otp" component={OTP} />
          <Route path="/pay" component={Payment} />
          <Route path="/login" component={SignIn} />
          <Route path="/" component={this.props.auth ? Timeline : SignUp} />
        </Switch>
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
    setAuthTrue: () => dispatch({ type: "True_Auth" }),
    setAuthFalse: () => dispatch({ type: "False_Auth" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

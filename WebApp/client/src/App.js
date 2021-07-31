import "./App.css";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import SignUp from "./containers/SignUp/SignUp.js";

class App extends Component {
  UNSAFE_componentWillMount() {
    var isExpired = false;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      var decodedToken = jwt_decode(user.token);
      var dateNow = new Date();
      if (decodedToken.exp < dateNow.getTime()) isExpired = true;
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
          <Route path="/" component={SignUp} />
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

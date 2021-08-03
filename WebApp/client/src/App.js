import "./App.css";
import { Switch, Route } from "react-router-dom";
import React, { Component, Suspense } from "react";
import jwt from "jsonwebtoken";
import Navbar from "./containers/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import { connect } from "react-redux";
import loaderSVG from "./assets/loader2.svg";

const OTP = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
    import("./containers/OTP/otp.js")
  )
);

const paymentFailed = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
    import("./components/paymentFailed/paymentFailed.js")
  )
);

const Timeline = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
    import("./containers/Timeline/Timeline.js")
  )
);

const SignUp = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
    import("./containers/SignUp/SignUp.js")
  )
);

const Payment = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
    import("./containers/Payment/Payment.js")
  )
);

const SignIn = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
    import("./containers/SignIn/SignIn.js")
  )
);

class App extends Component {
  UNSAFE_componentWillMount() {
    var isExpired = false;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      var decodedToken = jwt.decode(user.token);
      var dateNow = new Date();
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
        <Navbar />
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={loaderSVG} alt="loader" />
            </div>
          }
        >
          <Switch>
            <Route path="/paymentFailed" component={paymentFailed} />
            <Route path="/otp" component={OTP} />
            <Route path="/pay" component={Payment} />
            <Route path="/login" component={SignIn} />
            <Route path="/" component={this.props.auth ? Timeline : SignUp} />
          </Switch>
        </Suspense>
        <Footer />
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

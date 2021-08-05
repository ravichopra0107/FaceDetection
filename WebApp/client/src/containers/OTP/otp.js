import React, { Component } from "react";
import loaderSVG from "../../assets/loader.svg";
import Aux from "../../hoc/Aux/Aux.js";
import classes from "./otp.module.css";
import axios from "../../axios-auth.js";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";

class OTP extends Component {
  state = {
    loading: false,
    phone: "",
    div: 1,
    otp: "",
    err: false,
    phoneErr: false,
  };
  id = "";
  componentDidMount() {
    if (this.props.auth) {
      this.props.history.replace("/");
    }
  }
  change = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  sendOTP = (event) => {
    this.setState({ loading: true });
    axios.post("/api/auth/OTP", { phone: this.state.phone }).then((res) => {
      if (res.data.status !== false) {
        this.id = res.data.id;
        this.setState({ phoneErr: false, div: 2, loading: false });
      } else {
        this.setState({ phoneErr: true, loading: false });
      }
    });
  };
  verifyOTP = (event) => {
    this.setState({ loading: true });
    axios
      .post("/api/auth/checkOTP", {
        id: this.id,
        phone: this.state.phone,
        code: this.state.otp,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.status === true) {
            const user = {
              ...res.data.user,
              token: res.data.token,
            };
            localStorage.setItem("user", JSON.stringify(user));
            this.props.setAuthTrue();
            this.setState({ loading: true });
            this.props.history.push("/");
          }
        }
      })
      .catch((err) => {
        this.setState({ name: "", err: true, otp: "", div: 1, loading: false });
      });
  };
  render() {
    return (
      <Aux>
        <div className={classes.OTP}>
          <h1>Login with OTP</h1>
          {this.state.err && <p className={classes.P}>*Invalid OTP</p>}
          {this.state.phoneErr && (
            <p className={classes.P}>* Invalid Phone Number</p>
          )}
          {this.state.div === 1 && (
            <Fade>
              <input
                className={classes.Input}
                name="phone"
                value={this.state.phone}
                onChange={this.change}
                placeholder="+91883767xxxx"
              />

              {this.state.loading ? (
                <button
                  className={classes.Button}
                  style={{ cursor: "disabled" }}
                >
                  <img
                    style={{ height: "5vh" }}
                    src={loaderSVG}
                    alt="loaderSVG"
                  />
                </button>
              ) : (
                <button className={classes.Button} onClick={this.sendOTP}>
                  Send OTP <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </Fade>
          )}
          {this.state.div === 2 && (
            <Fade>
              <input
                className={classes.Input}
                name="otp"
                value={this.state.otp}
                onChange={this.change}
                placeholder="xxxxxx"
              />
              {this.state.loading ? (
                <button
                  className={classes.Button}
                  style={{ cursor: "disabled" }}
                >
                  <img
                    style={{ height: "5vh" }}
                    src={loaderSVG}
                    alt="loaderSVG"
                  />
                </button>
              ) : (
                <button className={classes.Button} onClick={this.verifyOTP}>
                  Verify OTP <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </Fade>
          )}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return { setAuthTrue: () => dispatch({ type: "True_Auth" }) };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);

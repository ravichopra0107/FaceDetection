import React, { Component } from "react";
import Navbar from "../Navbar/Navbar.js";
import Aux from "../../hoc/Aux/Aux.js";
import loaderSVG from "../../assets/loader.svg";
import classes from "./SignIn.module.css";
import Footer from "../../components/Footer/Footer.js";
import Fade from "react-reveal/Fade";
import axios from "../../axios-auth.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SignIn extends Component {
  state = {
    loading: false,
    roll: "",
    password: "",
    err: false,
  };
  componentDidMount() {
    if (this.props.auth) {
      this.props.history.replace("/");
    }
  }
  change = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = (event) => {
    event.preventDefault();
    if (this.state.roll.length > 0 && this.state.password.length > 0) {
      this.setState({ loading: true });
      axios
        .post("/api/auth/login", {
          rollID: this.state.roll,
          password: this.state.password,
        })
        .then((res) => {
          if (res.status === 200) {
            const user = {
              ...res.data.user,
              token: res.data.token,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(() => {
              this.setState({ loading: false });
            }, 1000);
            this.props.setAuthTrue();
            this.props.history.push("/");
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.setState({
              roll: "",
              password: "",
              err: true,
              loading: false,
            });
          }, 1000);
        });
    }
  };
  render() {
    return (
      <Aux>
        <Navbar />
        <Fade>
          <div className={classes.SignIn}>
            <h1 className={classes.H1}>Login</h1>
            {this.state.err && (
              <p className={classes.Error}>Invalid credentials.</p>
            )}
            <input
              autoFocus
              placeholder="Roll ID (2019bcs046)"
              type="text"
              id="roll"
              name="roll"
              value={this.state.roll}
              onChange={this.change}
            />
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.change}
            />
            {(this.state.roll.length === 0 ||
              this.state.password.length === 0) && (
              <p className={classes.Error}>Please enter name and password.</p>
            )}
            <p className={classes.P}>Forgot password?</p>
            {this.state.loading ? (
              <button className={classes.Button} style={{ cursor: "disabled" }}>
                <img
                  style={{ height: "5vh" }}
                  src={loaderSVG}
                  alt="loaderSVG"
                />
              </button>
            ) : (
              <button
                type="submit"
                className={classes.Button}
                onClick={this.submit}
              >
                Submit <i className="fas fa-chevron-right"></i>
              </button>
            )}
            <Link to="/otp" style={{margin: "auto"}}>
              <button className={classes.Button}>
                <i className="fas fa-mobile"></i> Login with OTP{" "}
                <i className="fas fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        </Fade>
        <Footer />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthTrue: () => dispatch({ type: "True_Auth" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

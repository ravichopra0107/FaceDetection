import React, { Component } from "react";
import classes from "./SignUp.module.css";
import foodSVG from "../../assets/food.svg";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../../components/Footer/Footer.js";
import Aux from "../../hoc/Aux/Aux.js";
import Fade from "react-reveal/Fade";
import axios from "../../axios-auth.js";
import { connect } from "react-redux";

class SignUp extends Component {
  state = {
    div: 1,
    name: "",
    roll: "",
    phone: "",
    password: "",
    cPassword: "",
  };
  change = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  changeDiv = (event) => {
    if (this.state.div === 1 && this.state.name.length > 0) {
      this.setState({ div: 2 });
    }
    if (this.state.div === 2) {
      this.setState({ div: 1 });
    }
  };
  checkRoll = (roll) => {
    try {
      let re = /(?:2016|2017|2018|2019|2020)(?:bcs|imt|img)/;
      if (
        roll.substr(7).length === 3 &&
        Number(roll.substr(7)) >= 0 &&
        Number(roll.substr(7)) <= 200
      ) {
        return re.test(roll.substr(0, 7));
      }
    } catch {
      return false;
    }
  };
  checkPhone = (phone) => {
    try {
      let re = /\+{1}\d{12}$/;
      return re.test(phone);
    } catch {
      return false;
    }
  };
  checkPassword = (password) => {
    try {
      return password.length >= 8;
    } catch {
      return false;
    }
  };
  checkConfirmPassword = () => {
    return this.state.password === this.state.cPassword;
  };
  submit = (event) => {
    event.preventDefault();
    if (
      this.checkRoll(this.state.roll) &&
      this.checkPhone(this.state.phone) &&
      this.checkPassword(this.state.password) &&
      this.checkConfirmPassword()
    ) {
      axios
        .post("/api/auth/signup", {
          name: this.state.name,
          rollID: this.state.roll,
          contact: this.state.phone,
          password: this.state.password,
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.exists) {
              this.props.history.push("/login");
            } else {
              const user = {
                name: this.state.name,
                rollID: this.state.roll,
                contact: this.state.contact,
                password: this.state.password,
                token: res.data.token,
              };
              localStorage.setItem("user", JSON.stringify(user));
              this.props.setAuthTrue();
            }
          } else {
            this.changeDiv();
          }
        });
    }
  };
  render() {
    return (
      <Aux>
        <Navbar />
        <div className={classes.Parent}>
          <div className={classes.Child1}>
            {this.state.div === 1 && (
              <Fade right distance="20%">
                <div>
                  <h1>Get Started</h1>
                  <input
                    autoFocus
                    placeholder="Your name"
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.change}
                  />
                  {this.state.name.length === 0 && (
                    <p className={classes.Error}>*Please enter your name</p>
                  )}
                  <button className={classes.Button} onClick={this.changeDiv}>
                    Next <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </Fade>
            )}
            {this.state.div === 2 && (
              <Fade right distance="20%">
                <div className={classes.Div2}>
                  <label htmlFor="roll">Roll Number:</label>
                  <input
                    placeholder="2019bcsxxx"
                    type="text"
                    id="roll"
                    name="roll"
                    value={this.state.roll}
                    onChange={this.change}
                  />
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    placeholder="+91883767xxxx"
                    type="text"
                    id="phone"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.change}
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.change}
                  />
                  <label htmlFor="cPassword">Confirm Password:</label>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    id="cPassword"
                    name="cPassword"
                    value={this.state.cPassword}
                    onChange={this.change}
                  />
                  {!this.checkRoll(this.state.roll) && (
                    <p className={classes.Error}>
                      *Please enter correct roll ID.
                    </p>
                  )}
                  {!this.checkPhone(this.state.phone) && (
                    <p className={classes.Error}>
                      *Please enter correct phone number.
                    </p>
                  )}
                  {!this.checkPassword(this.state.password) && (
                    <p className={classes.Error}>
                      *Password must be of more than 7 characters.
                    </p>
                  )}
                  {!this.checkConfirmPassword() && (
                    <p className={classes.Error}>
                      *Password and confirm password are not same.
                    </p>
                  )}
                  <button
                    type="submit"
                    className={classes.Button}
                    onClick={this.submit}
                  >
                    Submit <i className="fas fa-chevron-right"></i>
                  </button>
                  <button
                    className={classes.BackButton}
                    onClick={this.changeDiv}
                  >
                    Back <i className="fas fa-chevron-left"></i>
                  </button>
                </div>
              </Fade>
            )}
            <Footer />
          </div>
          <div className={classes.Child2}>
            <img src={foodSVG} alt="foodSVG" />
          </div>
        </div>
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
    setAuthTrue: () => dispatch({ type: "True_Auth" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

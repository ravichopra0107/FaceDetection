import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-auth.js";
import Aux from "../../hoc/Aux/Aux.js";
import classes from "./Payment.module.css";

class Payment extends Component {
  state = {
    b: 0,
    l: 0,
    d: 0,
    loading: false,
  };
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.replace("/login");
    }
    axios.get("/api/payment/getBill").then((res) => {
      console.log(res.data);
      this.setState({ b: res.data.b, l: res.data.l, d: res.data.d });
    });
  }
  render() {
    return (
      <Aux>
        <table className={classes.Table}>
          <thead className={classes.TableHead}>
            <tr className={classes.TableRow}>
              <th>Meal</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.TableRow}>
              <td className={classes.TableData}>Breakfast</td>
              <td className={classes.TableData}>{this.state.b}</td>
            </tr>
            <tr className={classes.TableRow}>
              <td className={classes.TableData}>Lunch</td>
              <td className={classes.TableData}>{this.state.l}</td>
            </tr>
            <tr className={classes.TableRow}>
              <td className={classes.TableData}>Dinner</td>
              <td className={classes.TableData}>{this.state.d}</td>
            </tr>
          </tbody>
        </table>
        <form
          method="POST"
          action="http://localhost:3000/api/payment/create"
        >
          <button type="submit" className={classes.Button}>
            Pay Now <i className="fas fa-chevron-right"></i>
          </button>
        </form>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Payment);

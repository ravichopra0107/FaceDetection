import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux.js";
import Meal from "../../components/Meal/Meal.js";
import axios from "../../axios-auth.js";
import Fade from "react-reveal/Fade";
import classes from "./Timeline.module.css";

class Timeline extends Component {
  state = {
    meals: [],
  };
  componentDidMount() {
    axios
      .get("/api/meal")
      .then((res) => this.setState({ meals: res.data.meals }));
  }
  render() {
    return (
      <Aux>
        <Fade>
          <div style={{ overflowX: "auto" }}>
            <table className={classes.Table}>
              <thead>
                <tr>
                  <th className={classes.TableHead}>Meal type</th>
                  <th className={classes.TableHead}>
                    <i className="far fa-calendar-alt"></i>
                  </th>
                  <th className={classes.TableHead}>
                    <i className="far fa-clock"></i>
                  </th>
                  <th className={classes.TableHead}>Paid</th>
                </tr>
              </thead>
              <tbody>
                {this.state.meals.map((meal) => {
                  return (
                    <Meal
                      key={meal.time}
                      type={meal.mealType}
                      time={new Date(meal.time)}
                      paid={!meal.due}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </Fade>
      </Aux>
    );
  }
}

export default Timeline;

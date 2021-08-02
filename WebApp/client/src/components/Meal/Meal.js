import React from "react";
import classes from "./Meal.module.css";

const Meal = (props) => {
  const mapTypes = {
    b: "breakfast",
    l: "lunch",
    d: "dinner",
  };
  return (
    <tr className={classes.TableRow}>
      <td className={classes.TableData}>{mapTypes[props.type]}</td>
      <td className={classes.TableData}>{`${props.time.getDate()}/${
        props.time.getMonth() + 1
      }`}</td>
      <td
        className={classes.TableData}
      >{`${props.time.getHours()}:${props.time.getMinutes()}`}</td>
      <td className={classes.TableData}>
        {props.paid ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </td>
    </tr>
  );
};

export default Meal;

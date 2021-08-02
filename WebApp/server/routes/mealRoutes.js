const express = require("express");
const router = express.Router();
const checkAdmin = require("../Middlewares/checkAdmin.js");
const verifyToken = require("../Middlewares/verifyToken.js");
const sendMessage = require("../utils/sendMessage.js");
const { Student, Meal } = require("../models/schemas.js");

router
  .route("/")
  .post(checkAdmin, (req, res) => {
    Student.findOne({ rollID: req.body.id }, (err, student) => {
      if (!err) {
        if (student) {
          const date = new Date();
          let type = "";
          if (date.getHours() >= 8 && date.getHours() <= 11) {
            type = "b";
          } else if (date.getHours() >= 14 && date.getHours() <= 16) {
            type = "l";
          } else if (date.getHours() >= 20 && date.getHours() <= 22) {
            type = "d";
          } else {
            // res.sendStatus(500);
            type = "b"; // For testing purposes
          }
          const meal = new Meal({
            time: date,
            mealType: type,
            due: true,
          });
          student.meals.push(meal);
          student.save((err) => {
            if (!err) {
              // CHANGE
              // sendMessage(
              //   `Hello ${student.name},\n Enjoy your meal!`,
              //   student.contact
              // );
              res.sendStatus(200);
            } else {
              console.log(err);
              res.sendStatus(404);
            }
          });
        } else {
          res.sendStatus(500);
        }
      } else {
        console.log(err);
        res.sendStatus(500);
      }
    });
  })
  .get(verifyToken, (req, res) => {
    let rollID = "";
    if (req.cookies.user) {
      rollID = req.cookies.user._doc.rollID;
    } else if (req.body.user) {
      rollID = req.body.user.rollID;
    }
    console.log(rollID);
    Student.findOne({ rollID: rollID }, (err, student) => {
      if (!err) {
        if (student) {
          res.status(200);
          res.json({ meals: student.meals });
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(500);
      }
    });
  });

module.exports = router;

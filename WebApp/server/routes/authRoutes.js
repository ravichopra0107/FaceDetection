const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { Student } = require("../models/schemas.js");
const router = express.Router();

router.post("/signup", (req, res) => {
  // req.body = {
  // rollID: string e.g. 2019bcs046
  // contact: string e.g. +91883xxxx784
  // name: string
  // password: string
  // }
  Student.find({ rollID: req.body.rollID }, (err, user) => {
    if (err) {
      console.log("Error: ", err);
      res.json({ status: false }).status(500);
    } else {
      // if user exists
      if (user.length > 0) {
        console.log(user);
        res.json({ exists: true }).status(200);
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          const newUser = new Student({
            rollID: req.body.rollID,
            contact: req.body.contact,
            name: req.body.name,
            password: hash,
            billDue: -1,
            meals: [],
          });
          newUser.save((err) => {
            if (!err) {
              console.log("Successfully add to database!");
              res.json({ status: true }).status(200);
            } else {
              console.log("Error: ", err);
              res.json({ status: false }).status(400);
            }
          });
        });
      }
    }
  });
});

router.post("/login", (req, res) => {
  // req.body = {
  // rollID: string,
  // password: string
  // }
  Student.findOne({ rollID: req.body.rollID }, (err, user) => {
    if (err) {
      console.log("Error: ", err);
      res.json({ status: false }).status(400);
    } else {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            // user without a password field
            user = { ...user, password: null };
            // Sign a token
            jwt.sign({ user: user }, process.env.JWTSECRET, (err, token) => {
              if (!err) {
                // Set user and token to a cookie
                res
                  .cookie("user", user, {
                    expires: new Date(Date.now() + 1 * 3600000),
                  })
                  .cookie("token", token, {
                    expires: new Date(Date.now() + 1 * 3600000),
                  })
                  .json({ status: true })
                  .status(200);
              }
            });
          }
        });
      } else {
        res.json({ status: false }).status(400);
      }
    }
  });
});

module.exports = router;

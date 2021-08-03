const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const sendMessage = require("../utils/sendMessage.js");
const { Student } = require("../models/schemas.js");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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
      res.status(500);
      res.json({ status: false });
    } else {
      // if user exists
      if (user.length > 0) {
        console.log(user);
        res.status(200);
        res.json({ exists: true });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          const newUser = new Student({
            rollID: req.body.rollID,
            contact: req.body.contact,
            name: req.body.name,
            password: hash,
            meals: [],
          });
          newUser.save((err) => {
            if (!err) {
              console.log("Successfully added to database!");
              // CHANGE
              sendMessage(
                `Hello ${req.body.name},\nwelcome to ATE...*`,
                req.body.contact
              );
              jwt.sign(
                { user: { ...newUser, meals: null } },
                process.env.JWTSECRET,
                (err, token) => {
                  if (!err) {
                    // Set user and token to a cookie
                    res.status(200);
                    res
                      .cookie(
                        "user",
                        { ...newUser, meals: null },
                        {
                          expires: new Date(Date.now() + 1 * 3600000),
                        }
                      )
                      .cookie("token", token, {
                        expires: new Date(Date.now() + 1 * 3600000),
                      })
                      .json({ status: true, token: token });
                  }
                }
              );
            } else {
              console.log("Error: ", err);
              res.status(400);
              res.json({ status: false });
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
      res.status(400);
      res.json({ status: false });
    } else {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            // user without a password field
            user = { ...user, password: null };
            // Sign a token
            jwt.sign(
              { user: user },
              process.env.JWTSECRET,
              { expiresIn: "1hr" },
              (err, token) => {
                if (!err) {
                  // Set user and token to a cookie
                  res.status(200);
                  res
                    .cookie("user", user, {
                      expires: new Date(Date.now() + 1 * 3600000),
                    })
                    .cookie("token", token, {
                      expires: new Date(Date.now() + 1 * 3600000),
                    })
                    .json({ status: true, token: token, user: user._doc });
                }
              }
            );
          } else {
            res.status(403);
            res.json({ status: false });
          }
        });
      } else {
        res.status(400);
        res.json({ status: false });
      }
    }
  });
});

router.post("/OTP", (req, res) => {
  Student.findOne({ contact: req.body.phone }, (err, user) => {
    if (err) {
      console.log("Error: ", err);
      res.status(400);
      res.json({ status: false });
    } else {
      if (!user) {
        res.json({ status: false });
      } else {
        client.verify.services
          .create({ friendlyName: "My First Verify Service" })
          .then((service) => {
            client.verify
              .services(service.sid)
              .verifications.create({ to: req.body.phone, channel: "sms" })
              .then((verification) => console.log(verification));
            res.status(200).json({ id: service.sid });
          });
      }
    }
  });
});

router.post("/checkOTP", (req, res) => {
  client.verify
    .services(req.body.id)
    .verificationChecks.create({ to: req.body.phone, code: req.body.code })
    .then((verification_check) => {
      if (verification_check.status === "approved") {
        Student.findOne({ contact: req.body.phone }, (err, user) => {
          if (err) {
            console.log("Error: ", err);
            res.status(400);
            res.json({ status: false });
          } else {
            // user without a password field
            console.log(user);
            user = { ...user, password: null };
            // Sign a token
            jwt.sign(
              { user: user },
              process.env.JWTSECRET,
              { expiresIn: "1hr" },
              (err, token) => {
                if (!err) {
                  // Set user and token to a cookie
                  res.status(200);
                  res
                    .cookie("user", user, {
                      expires: new Date(Date.now() + 1 * 3600000),
                    })
                    .cookie("token", token, {
                      expires: new Date(Date.now() + 1 * 3600000),
                    })
                    .json({ status: true, token: token, user: user._doc });
                }
              }
            );
          }
        });
      } else {
        res.sendStatus(403);
      }
    });
});

module.exports = router;

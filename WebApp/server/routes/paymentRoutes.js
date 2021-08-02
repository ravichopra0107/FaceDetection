const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);
const verifyToken = require("../Middlewares/verifyToken.js");
const { Student } = require("../models/schemas.js");

router.post("/create", verifyToken, (req, res) => {
  let rollID = "";
  if (req.cookies.user) {
    rollID = req.cookies.user._doc.rollID;
  } else if (req.body.user) {
    rollID = req.body.user.rollID;
  }
  Student.findOne({ rollID: rollID }, async (err, student) => {
    if (!err) {
      if (student) {
        let breakfasts = 0,
          lunches = 0,
          dinners = 0;
        for (let i = 0; i < student.meals.length; i++) {
          if (student.meals[i].due && student.meals[i].mealType === "b")
            breakfasts++;
          else if (student.meals[i].due && student.meals[i].mealType === "l")
            lunches++;
          else if (student.meals[i].due && student.meals[i].mealType === "d")
            dinners++;
        }
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Breakfast",
                },
                unit_amount: 100,
              },
              quantity: breakfasts > 0 ? breakfasts : 1,
            },
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Lunch",
                },
                unit_amount: 100,
              },
              quantity: lunches > 0 ? lunches : 1,
            },
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Dinner",
                },
                unit_amount: 100,
              },
              quantity: dinners > 0 ? dinners : 1,
            },
          ],
          mode: "payment",
          success_url:
            "https://ateatiiitm.herokuapp.com/api/payment/check?sessionID={CHECKOUT_SESSION_ID}",
          cancel_url:
            "https://ateatiiitm.herokuapp.com/api/payment/check?sessionID={CHECKOUT_SESSION_ID}",
        });
        res.redirect(303, session.url);
      }
    }
  });
});

router.get("/check", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.sessionID);
  if (session.payment_status === "paid") {
    let rollID = "";
    if (req.cookies.user) {
      rollID = req.cookies.user._doc.rollID;
    } else if (req.body.user) {
      rollID = req.body.user.rollID;
    }
    Student.findOne({ rollID: rollID }, (err, student) => {
      if (!err) {
        if (student) {
          for (let i = 0; i < student.meals.length; i++) {
            student.meals[i].due = false;
          }
          student.save((err) => {
            if (!err) {
              res.redirect("http://localhost:3000/");
            } else {
              res.redirect("http://localhost:3000/paymentFailed");
            }
          });
        }
      }
    });
  } else {
    res.redirect("http://localhost:3000/paymentFailed");
  }
});

router.get("/getBill", verifyToken, (req, res) => {
  let rollID = "";
  if (req.cookies.user) {
    rollID = req.cookies.user._doc.rollID;
  } else if (req.body.user) {
    rollID = req.body.user.rollID;
  }
  Student.findOne({ rollID: rollID }, (err, student) => {
    if (!err) {
      if (student) {
        let breakfasts = 0,
          lunches = 0,
          dinners = 0;
        for (let i = 0; i < student.meals.length; i++) {
          if (student.meals[i].mealType === "b") breakfasts++;
          else if (student.meals[i].mealType === "l") lunches++;
          else if (student.meals[i].mealType === "d") dinners++;
        }
        res.status(200).json({ b: breakfasts, l: lunches, d: dinners });
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;

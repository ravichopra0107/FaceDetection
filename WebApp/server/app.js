// Requiring modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const mealRoutes = require("./routes/mealRoutes.js");
const path = require("path");

const app = express();

// Setting up middlewares
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/payment", paymentRoutes);

mongoose.connect("mongodb://localhost:27017/messDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});
// App runs on port 3000 by default;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

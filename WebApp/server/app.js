// Requiring modules
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const mealRoutes = require("./routes/mealRoutes.js");

const app = express();

// Setting up middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/meal", mealRoutes);

mongoose.connect("mongodb://localhost:27017/messDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// App runs on port 3000 by default;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

// Requiring modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { Meal, User } = require("./schemas.js");
const authRoutes = require("./routes/authRoutes.js");

const app = express();

// Setting up middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb://localhost:27017/messDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// App runs on port 3000 by default;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  // mealType: 'B', 'L', 'D'
  mealType: { type: String, required: true },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollID: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  meals: [{ type: mealSchema }],
});

module.exports = {
  Meal: mongoose.model("Meal", mealSchema),
  Student: mongoose.model("Student", studentSchema),
};

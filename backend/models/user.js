const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, minlength: 6, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);

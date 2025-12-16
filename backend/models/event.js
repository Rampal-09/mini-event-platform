const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    dateTime: {
      type: Date,
      required: true,
    },
    location: { type: String, trim: true, required: true },
    capacity: { type: Number, min: 1, required: true },
    image: {
      type: String,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

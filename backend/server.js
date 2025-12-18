require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { authRoutes } = require("./routes/authRoutes");
const { eventRoutes } = require("./routes/eventRoutes");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});
app.use("/user", authRoutes);
app.use("/event", eventRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on  http://localhost port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

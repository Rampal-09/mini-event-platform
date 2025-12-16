require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { authRoutes } = require("./routes/authRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", authRoutes);

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

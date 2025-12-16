const express = require("express");
const authRoutes = express.Router();
const authControllers = require("../controllers/authControllers");

authRoutes.post("/signup", authControllers.signup);
authRoutes.post("/login", authControllers.login);

exports.authRoutes = authRoutes;

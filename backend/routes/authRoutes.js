const express = require("express");
const authRoutes = express.Router();
const authControllers = require("../authControllers");

authRoutes.post("/signup", authControllers.signup);
authControllers.post("/login", authControllers.login);

exports.authRoutes = authRoutes;

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        type: "duplicateUser",
        message: "user already exisit",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "user signup successfully",
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "something wrong on server ",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        type: "userNotFound",
        message: "email is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        type: "incorrectPassword",
        message: "password is incorrect",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: "user login successfully",
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      success: false,
      type: "serverError",
      message: "something wrong on server ",
    });
  }
};

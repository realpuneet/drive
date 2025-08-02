const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .isLength({ min: 13 })
    .withMessage("Email must be at least 13 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        msg: "Invalid data",
      });
    }

    const { email, username, password } = req.body;

    try {
      // check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "Email or username already exists" });
      }

      // hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // create new user
      const newUser = await User.create({
        email,
        username,
        password: hashPassword,
      });

      res.status(201).json({ msg: "User registered", user: newUser });
      
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

module.exports = router;

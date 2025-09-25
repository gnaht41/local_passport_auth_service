const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in successfully", user: req.user });
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});

// Protected route
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ message: "Profile data", user: req.user });
});

module.exports = router;
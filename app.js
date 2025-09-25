const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const initPassport = require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// Routes
app.use("/auth", authRoutes);

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/passport_local_demo")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  })
  .catch((err) => console.error(err));
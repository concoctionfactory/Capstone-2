const express = require("express");
const cors = require("cors");
const ExpressError = require("./helpers/ExpressError");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const boardRoutes = require("./routes/boards");
const listRoutes = require("./routes/lists");
const cardRoutes = require("./routes/cards");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

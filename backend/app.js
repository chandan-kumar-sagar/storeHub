// Express app setup

const express = require("express");
const app = express();

//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//  Health Check
app.get("/", (req, res) => {
  res.send("StoreHub API is running ");
});

//  Global Error Handler (basic)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;

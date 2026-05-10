// Express app setup

const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(helmet());


//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());


//  Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const deliveryRoutes = require("./routes/delivery.routes");


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);



//  Health Check
app.get("/", (req, res) => {
  res.send("StoreHub API is running ");
});



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests
  message: {
    success: false,
    message: "Too many requests, try again later",
  },
});

app.use(limiter);


//  Global Error Handler
app.use(errorHandler);




module.exports = app;

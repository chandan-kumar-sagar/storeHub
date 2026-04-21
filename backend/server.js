// Server entry point

require("dotenv").config(); //  MUST BE FIRST

const app = require("./app");
const { db } = require("./config/db");

const PORT = process.env.PORT || 5000;

//  Check DB connection before starting server
const startServer = async () => {
  try {
    await db.query("SELECT 1"); // simple test query
    console.log(" Database connected");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" DB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();

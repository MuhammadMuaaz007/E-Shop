const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected with HOST: ${con.connection.host}`);
  } catch (err) {
    console.error(`Database connection failed:`, err);
    // Exit process if DB connection is required for the app to run
    process.exit(1);
  }
};
module.exports = connectDatabase;

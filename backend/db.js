const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/employeeDB";

const connectDB = async () => {
  try {
    mongoose.connect(URL);
    console.log(`Database connected \n${URL}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

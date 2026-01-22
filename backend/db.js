const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    if (!URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    await mongoose.connect(URL);
    console.log(`Database connected \n${URL}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

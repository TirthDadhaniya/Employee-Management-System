const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

// MIDDLEWARE: Runs before saving to database
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
});

// INSTANCE METHOD: A helper function to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// JWT Token Generation
userSchema.methods.generateToken = function () {
  try {
    // We hide the User ID inside the token
    return jwt.sign(
      {
        id: this._id.toString(),
      },
      process.env.JWT_SECRET, // Use a long random string in real apps
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      },
    );
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

module.exports = User = mongoose.model("User", userSchema);

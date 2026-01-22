const User = require("../model/user");
const bcrypt = require("bcryptjs");

// Register
exports.register = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const registeredUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: registeredUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if both fields exist
    if (!email || !password) {
      return res.status(400).json({ status: "fail", error: "Please provide email and password" });
    }
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Invalid email or password",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

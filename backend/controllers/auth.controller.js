const User = require("../model/user");

// Register
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide fullName, email and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User with this email already exists",
      });
    }

    const registeredUser = await User.create({ fullName, email, password });
    res.status(201).json({
      status: "success",
      data: registeredUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        error: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "User not found",
      });
    }

    // Use the helper method created in the schema
    const isMatch = await user.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        error: "Invalid password",
      });
    }

    const token = user.generateToken();

    res.status(200).json({
      status: "success",
      token: token,
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

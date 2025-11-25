
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("BODY RECEIVED:", req.body);

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: fullName,   // 🔥 FIXED
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.json({ message: "Signup successful" });
};

// LOGIN
exports.loginUser = async (req, res) => {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) return res.json({ message: "User not found" });

const isCorrect = await bcrypt.compare(password, user.password);
if (!isCorrect) return res.json({ message: "Invalid password" });

const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "1h" });

res.json({ message: "Login successful", token });
};


exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

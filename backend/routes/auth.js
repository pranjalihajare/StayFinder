import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, isHost: user.isHost },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isHost } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password, isHost });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user: { _id: user._id, name, email, isHost }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ user: { _id: user._id, name: user.name, email, isHost: user.isHost }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

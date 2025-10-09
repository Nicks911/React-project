import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { buildUserPayload } from "../utils/serializers.js";

const router = express.Router();

const signToken = (user, secret) => {
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  const payload = { sub: user._id.toString(), role: user.role };
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      passwordHash,
    });

    const token = signToken(user, process.env.JWT_SECRET);

    res.status(201).json({
      user: buildUserPayload(user),
      token,
    });
  } catch (err) {
    console.error("Failed to register user", err);
    res.status(500).json({ message: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user, process.env.JWT_SECRET);

    res.json({
      user: buildUserPayload(user),
      token,
    });
  } catch (err) {
    console.error("Failed to log in", err);
    res.status(500).json({ message: "Failed to login" });
  }
});

export default router;

import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import { buildUserPayload, buildUsersResponse } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("admin"));

const normalizeEmail = (email) => email?.toLowerCase?.().trim?.() ?? email;

router.get("/", async (req, res) => {
  try {
    const { search, status, role } = req.query;

    const filter = {};

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ fullName: regex }, { email: regex }, { phone: regex }];
    }

    if (status && ["active", "inactive"].includes(status)) {
      filter.status = status;
    }

    if (role && ["admin", "customer"].includes(role)) {
      filter.role = role;
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    res.json({
      users: buildUsersResponse(users),
      total: users.length,
    });
  } catch (error) {
    console.error("Failed to fetch users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      role = "customer",
      status = "active",
      password,
    } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res
        .status(400)
        .json({
          message: "Full name, email, phone, and password are required",
        });
    }

    const normalizedEmail = normalizeEmail(email);

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: normalizedEmail,
      phone,
      role,
      status,
      passwordHash,
    });

    res.status(201).json({ user: buildUserPayload(user) });
  } catch (error) {
    console.error("Failed to create user", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, role, status, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && normalizeEmail(email) !== user.email) {
      const normalizedEmail = normalizeEmail(email);
      const existing = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(409).json({ message: "Email is already registered" });
      }
      user.email = normalizedEmail;
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (phone) {
      user.phone = phone;
    }

    if (role && ["admin", "customer"].includes(role)) {
      user.role = role;
    }

    if (status && ["active", "inactive"].includes(status)) {
      user.status = status;
    }

    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ user: buildUserPayload(user) });
  } catch (error) {
    console.error("Failed to update user", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Failed to delete user", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;

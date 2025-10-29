import express from "express";
import bcrypt from "bcryptjs";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import {
  buildBookingPayload,
  buildBookingsResponse,
  buildUserPayload,
} from "../utils/serializers.js";

const router = express.Router();

const ACTIVE_STATUSES = ["pending", "confirmed", "in-progress"];
const normalizeEmail = (email) => email?.toLowerCase?.().trim?.() ?? email;

router.use(authenticate);
router.use(authorizeRoles("customer"));

router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: buildUserPayload(user) });
  } catch (error) {
    console.error("Failed to load customer profile", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

router.patch("/profile", async (req, res) => {
  try {
    const { fullName, email, phone, avatarUrl } = req.body ?? {};

    if (
      [fullName, email, phone, avatarUrl].every((value) => value === undefined)
    ) {
      return res
        .status(400)
        .json({ message: "No profile fields were provided" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email !== undefined) {
      const normalizedEmail = normalizeEmail(email);
      if (!normalizedEmail) {
        return res.status(400).json({ message: "Email cannot be empty" });
      }

      if (normalizedEmail !== user.email) {
        const existing = await User.findOne({
          email: normalizedEmail,
          _id: { $ne: user._id },
        });
        if (existing) {
          return res.status(409).json({ message: "Email is already in use" });
        }
        user.email = normalizedEmail;
      }
    }

    if (fullName !== undefined) {
      if (!fullName) {
        return res.status(400).json({ message: "Full name cannot be empty" });
      }
      user.fullName = fullName;
    }

    if (phone !== undefined) {
      if (!phone) {
        return res
          .status(400)
          .json({ message: "Phone number cannot be empty" });
      }
      user.phone = phone;
    }

    if (avatarUrl !== undefined) {
      user.avatarUrl = avatarUrl || null;
    }

    await user.save();
    req.user = user;

    res.json({ user: buildUserPayload(user) });
  } catch (error) {
    console.error("Failed to update customer profile", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

router.post("/profile/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {};

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Failed to update password", error);
    res.status(500).json({ message: "Failed to update password" });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const userId = req.user._id;

    const baseFilter = { user: userId };

    const [
      totalBookings,
      activeBookings,
      completedServices,
      recentBookings,
      upcomingBooking,
    ] = await Promise.all([
      Booking.countDocuments(baseFilter),
      Booking.countDocuments({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
      }),
      Booking.countDocuments({ user: userId, status: "completed" }),
      Booking.find(baseFilter)
        .sort({ startTime: -1 })
        .limit(10)
        .populate("stylist", "fullName avatarUrl phone")
        .lean(),
      Booking.findOne({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
        startTime: { $gte: new Date() },
      })
        .sort({ startTime: 1 })
        .populate("stylist", "fullName avatarUrl phone")
        .lean(),
    ]);

    res.json({
      stats: {
        totalBookings,
        activeBookings,
        completedServices,
      },
      recentBookings: buildBookingsResponse(recentBookings),
      upcomingBooking: upcomingBooking
        ? buildBookingPayload(upcomingBooking)
        : null,
    });
  } catch (error) {
    console.error("Failed to load customer dashboard", error);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
});

export default router;

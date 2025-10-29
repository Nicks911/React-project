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

const SETTINGS_NOTIFICATION_KEYS = [
  "email",
  "sms",
  "push",
  "bookingReminders",
  "promotions",
  "newsletter",
];

const DEFAULT_NOTIFICATION_PREFS = {
  email: true,
  sms: false,
  push: true,
  bookingReminders: true,
  promotions: false,
  newsletter: true,
};

const DEACTIVATION_GRACE_DAYS = 30;

const extractNotificationPrefs = (user) => {
  const raw =
    user?.notificationPrefs &&
    typeof user.notificationPrefs.toObject === "function"
      ? user.notificationPrefs.toObject()
      : user?.notificationPrefs || {};

  const prefs = { ...DEFAULT_NOTIFICATION_PREFS };
  SETTINGS_NOTIFICATION_KEYS.forEach((key) => {
    if (raw[key] !== undefined) {
      prefs[key] = Boolean(raw[key]);
    }
  });

  return prefs;
};

const buildSettingsResponse = (user) => ({
  theme: user?.preferences?.theme === "dark" ? "dark" : "light",
  darkMode: user?.preferences?.theme === "dark",
  notificationPrefs: extractNotificationPrefs(user),
  status: user?.status ?? "active",
  deactivation: user?.deactivation ?? null,
  updatedAt: user?.updatedAt ?? null,
});

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

router.get("/bookings", async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      status,
      page: pageParam = "1",
      limit: limitParam = "10",
      sort = "desc",
    } = req.query ?? {};

    const parsedPage = Number.parseInt(pageParam, 10);
    const parsedLimit = Number.parseInt(limitParam, 10);

    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limitBase =
      Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;
    const limit = Math.min(Math.max(limitBase, 1), 100);

    const normalizedStatus =
      typeof status === "string" ? status.trim().toLowerCase() : "";

    const now = new Date();

    const statusFilter = {};

    if (normalizedStatus && normalizedStatus !== "all") {
      if (normalizedStatus === "upcoming") {
        statusFilter.status = { $in: ACTIVE_STATUSES };
        statusFilter.startTime = { $gte: now };
      } else if (normalizedStatus === "completed") {
        statusFilter.status = "completed";
      } else if (normalizedStatus === "cancelled") {
        statusFilter.status = "cancelled";
      } else {
        statusFilter.status = normalizedStatus;
      }
    }

    const baseFilter = { user: userId, ...statusFilter };

    const sortOrder = sort === "asc" ? 1 : -1;
    const skip = (page - 1) * limit;

    const [
      bookings,
      totalForFilter,
      totalCount,
      upcomingCount,
      completedCount,
      cancelledCount,
    ] = await Promise.all([
      Booking.find(baseFilter)
        .sort({ startTime: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate("stylist", "fullName email phone avatarUrl")
        .populate("services.service", "name")
        .lean(),
      Booking.countDocuments(baseFilter),
      Booking.countDocuments({ user: userId }),
      Booking.countDocuments({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
        startTime: { $gte: now },
      }),
      Booking.countDocuments({ user: userId, status: "completed" }),
      Booking.countDocuments({ user: userId, status: "cancelled" }),
    ]);

    const totalPages =
      totalForFilter > 0 ? Math.ceil(totalForFilter / limit) : 0;

    res.json({
      bookings: buildBookingsResponse(bookings),
      pagination: {
        page,
        limit,
        total: totalForFilter,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1 && totalPages > 0,
      },
      stats: {
        total: totalCount,
        upcoming: upcomingCount,
        completed: completedCount,
        cancelled: cancelledCount,
      },
    });
  } catch (error) {
    console.error("Failed to load customer bookings", error);
    res.status(500).json({ message: "Failed to load bookings" });
  }
});

router.get("/settings", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ settings: buildSettingsResponse(user) });
  } catch (error) {
    console.error("Failed to load customer settings", error);
    res.status(500).json({ message: "Failed to load settings" });
  }
});

router.patch("/settings", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { darkMode, theme, notificationPrefs } = req.body ?? {};
    let hasChanges = false;

    if (typeof darkMode === "boolean" || typeof theme === "string") {
      const resolvedTheme =
        typeof theme === "string"
          ? theme.toLowerCase() === "dark"
            ? "dark"
            : "light"
          : darkMode
          ? "dark"
          : "light";
      user.preferences ??= {};
      if (user.preferences.theme !== resolvedTheme) {
        user.preferences.theme = resolvedTheme;
        hasChanges = true;
      }
    }

    if (notificationPrefs && typeof notificationPrefs === "object") {
      user.notificationPrefs ??= {};
      SETTINGS_NOTIFICATION_KEYS.forEach((key) => {
        if (notificationPrefs[key] !== undefined) {
          const nextValue = Boolean(notificationPrefs[key]);
          if (user.notificationPrefs[key] !== nextValue) {
            user.notificationPrefs[key] = nextValue;
            hasChanges = true;
          }
        }
      });
    }

    if (!hasChanges) {
      return res
        .status(400)
        .json({ message: "No settings changes were provided" });
    }

    await user.save();
    req.user = user;

    res.json({
      settings: buildSettingsResponse(user),
      user: buildUserPayload(user),
    });
  } catch (error) {
    console.error("Failed to update customer settings", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
});

router.post("/settings/deactivate", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { reason } = req.body ?? {};
    const trimmedReason =
      typeof reason === "string" && reason.trim().length > 0
        ? reason.trim()
        : null;
    const requestedAt = new Date();
    const expiresAt = new Date(
      requestedAt.getTime() + DEACTIVATION_GRACE_DAYS * 24 * 60 * 60 * 1000
    );

    user.status = "inactive";
    user.deactivation = {
      reason: trimmedReason,
      requestedAt,
      expiresAt,
    };

    await user.save();
    req.user = user;

    res.json({
      message:
        "Account deactivated successfully. You can reactivate within 30 days.",
      user: buildUserPayload(user),
      settings: buildSettingsResponse(user),
    });
  } catch (error) {
    console.error("Failed to deactivate account", error);
    res.status(500).json({ message: "Failed to deactivate account" });
  }
});

export default router;

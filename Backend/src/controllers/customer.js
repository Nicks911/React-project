import express from "express";
import Booking from "../models/Booking.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import {
  buildBookingPayload,
  buildBookingsResponse,
} from "../utils/serializers.js";

const router = express.Router();

const ACTIVE_STATUSES = ["pending", "confirmed", "in-progress"];

router.use(authenticate);
router.use(authorizeRoles("customer"));

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

import express from "express";
import { isValidObjectId } from "mongoose";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import {
  buildBookingPayload,
  buildBookingsResponse,
  buildBookingStats,
} from "../utils/serializers.js";

const router = express.Router();

const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "in-progress",
  "completed",
  "cancelled",
];

const PAYMENT_STATUSES = ["unpaid", "pending", "paid", "refunded"];

const optionalString = (value) =>
  typeof value === "string" ? value.trim() || null : null;

router.use(authenticate);
router.use(authorizeRoles("admin"));

router.get("/", async (req, res) => {
  try {
    const { status, paymentStatus, dateFrom, dateTo } = req.query;
    const filter = {};

    if (status && BOOKING_STATUSES.includes(status)) {
      filter.status = status;
    }

    if (paymentStatus && PAYMENT_STATUSES.includes(paymentStatus)) {
      filter["payment.status"] = paymentStatus;
    }

    if (dateFrom || dateTo) {
      filter["slot.date"] = {};
      if (dateFrom) {
        filter["slot.date"].$gte = dateFrom;
      }
      if (dateTo) {
        filter["slot.date"].$lte = dateTo;
      }
    }

    const bookings = await Booking.find(filter)
      .populate("user", "fullName email phone avatarUrl role")
      .populate("stylist", "fullName email phone avatarUrl role")
      .sort({ createdAt: -1 });

    res.json({
      bookings: buildBookingsResponse(bookings),
      stats: buildBookingStats(bookings),
    });
  } catch (error) {
    console.error("Failed to fetch bookings", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.post("/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(id)
      .populate("user", "fullName email phone avatarUrl role")
      .populate("stylist", "fullName email phone avatarUrl role");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res
        .status(409)
        .json({ message: "Booking already cancelled and cannot be accepted" });
    }

    if (["confirmed", "in-progress", "completed"].includes(booking.status)) {
      return res.status(409).json({ message: "Booking is already processed" });
    }

    const { stylistId, adminNotes } = req.body ?? {};

    if (stylistId) {
      if (!isValidObjectId(stylistId)) {
        return res.status(400).json({ message: "Invalid stylist id" });
      }

      const stylist = await User.findById(stylistId);
      if (!stylist) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      booking.stylist = stylist._id;
    }

    if (adminNotes !== undefined) {
      booking.adminNotes = optionalString(adminNotes);
    }

    booking.status = "confirmed";

    await booking.save();
    await booking.populate("user", "fullName email phone avatarUrl role");
    await booking.populate("stylist", "fullName email phone avatarUrl role");

    res.json({ booking: buildBookingPayload(booking) });
  } catch (error) {
    console.error("Failed to accept booking", error);
    res.status(500).json({ message: "Failed to accept booking" });
  }
});

router.post("/:id/cancel", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(id)
      .populate("user", "fullName email phone avatarUrl role")
      .populate("stylist", "fullName email phone avatarUrl role");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (["cancelled", "completed"].includes(booking.status)) {
      return res.status(409).json({ message: "Booking cannot be cancelled" });
    }

    const { adminNotes, paymentStatus } = req.body ?? {};

    if (adminNotes !== undefined) {
      booking.adminNotes = optionalString(adminNotes);
    }

    booking.status = "cancelled";

    if (booking.payment) {
      if (paymentStatus) {
        if (!PAYMENT_STATUSES.includes(paymentStatus)) {
          return res.status(400).json({ message: "Invalid payment status" });
        }
        booking.payment.status = paymentStatus;
      } else if (booking.payment.status === "paid") {
        booking.payment.status = "refunded";
      }
    }

    await booking.save();
    await booking.populate("user", "fullName email phone avatarUrl role");
    await booking.populate("stylist", "fullName email phone avatarUrl role");

    res.json({ booking: buildBookingPayload(booking) });
  } catch (error) {
    console.error("Failed to cancel booking", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

export default router;

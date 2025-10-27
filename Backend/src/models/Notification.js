import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["reminder", "promo", "system", "booking"] },
    title: String,
    message: String,
    channels: [{ type: String, enum: ["email", "whatsapp", "in-app"] }],
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    scheduledFor: Date,
    sentAt: Date,
    readAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);

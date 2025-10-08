import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    reply: String,
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);

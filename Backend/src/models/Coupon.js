import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    description: String,
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    amount: { type: Number, required: true },
    minSpend: { type: Number, default: 0 },
    startDate: Date,
    endDate: Date,
    usageLimit: Number,
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", CouponSchema);

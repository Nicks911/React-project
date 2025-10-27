import mongoose from "mongoose";

const NotificationPrefsSchema = new mongoose.Schema(
  {
    email: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: true },
    inApp: { type: Boolean, default: true },
  },
  { _id: false }
);

const PreferencesSchema = new mongoose.Schema(
  {
    favoriteServices: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    ],
    preferredStylist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const TimeSlotSchema = new mongoose.Schema(
  {
    dayOfWeek: { type: Number, min: 0, max: 6, required: true },
    start: { type: String, required: true }, // e.g. '09:00'
    end: { type: String, required: true }, // e.g. '17:00'
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    avatarUrl: String,
    loyaltyPoints: { type: Number, default: 0 },
    preferences: PreferencesSchema,
    notificationPrefs: NotificationPrefsSchema,
    emailVerifiedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // Optional staff profile for stylists/admins
    staffProfile: {
      photoUrl: String,
      bio: String,
      skills: [{ type: String }],
      specialties: [{ type: String }],
      availability: [TimeSlotSchema],
      commissionRate: { type: Number, default: 0 }, // percentage
      stats: {
        servicesCount: { type: Number, default: 0 },
        averageRating: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 },
      },
      active: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

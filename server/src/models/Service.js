import mongoose from "mongoose";
import slugify from "slugify";

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: String,
    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    benefits: [{ type: String }],
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.pre("save", function (next) {
  if (this.isModified("name"))
    this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

ServiceSchema.pre("insertMany", function (next, docs) {
  if (Array.isArray(docs)) {
    for (const doc of docs) {
      if (!doc.slug && doc.name) {
        doc.slug = slugify(doc.name, { lower: true, strict: true });
      }
    }
  }
  next();
});

export default mongoose.model("Service", ServiceSchema);

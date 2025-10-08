import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema(
  {
    imageUrl: { type: String },
    caption: String,
    categories: [{ type: String }],
    type: { type: String, enum: ["single", "before-after"], default: "single" },
    beforeUrl: String,
    afterUrl: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", GalleryItemSchema);

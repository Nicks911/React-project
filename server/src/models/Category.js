import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    description: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

// Generate slug on save
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Ensure slug is set for insertMany (save middleware doesn't run there)
CategorySchema.pre("insertMany", function (next, docs) {
  if (Array.isArray(docs)) {
    for (const doc of docs) {
      if (!doc.slug && doc.name) {
        doc.slug = slugify(doc.name, { lower: true, strict: true });
      }
    }
  }
  next();
});

export default mongoose.model("Category", CategorySchema);

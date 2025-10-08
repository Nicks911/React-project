import mongoose from "mongoose";
import slugify from "slugify";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: String,
    content: { type: String, required: true },
    category: { type: String },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
    },
    publishedAt: Date,
    seo: {
      title: String,
      description: String,
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

BlogPostSchema.pre("save", function (next) {
  if (this.isModified("title"))
    this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

BlogPostSchema.pre("insertMany", function (next, docs) {
  if (Array.isArray(docs)) {
    for (const doc of docs) {
      if (!doc.slug && doc.title) {
        doc.slug = slugify(doc.title, { lower: true, strict: true });
      }
    }
  }
  next();
});

export default mongoose.model("BlogPost", BlogPostSchema);

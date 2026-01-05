import mongoose from "mongoose";
import slugify from "slugify";
import baseBlogSchema from "./baseBlogschema.js";
import weeklySchema from "./weeklySchema.js";
import lifeSchema from "./lifeSchema.js";
import techSchema from "./techSchema.js";

const blogSchema = new mongoose.Schema({}, { timestamps: true });

blogSchema.add(baseBlogSchema);

blogSchema.add({
  weeklyMeta: {
    type: weeklySchema,
    required: function () {
      return this.category === "weekly";
    },
  },
  techMeta: {
    type: techSchema,
    required: function () {
      return this.category === "tech";
    },
  },
  lifeMeta: {
    type: lifeSchema,
    required: function () {
      return this.category === "life";
    },
  },
});

blogSchema.pre("save", async function () {
  if (!this.isModified("title")) return;

  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
});

export default mongoose.model("Blog", blogSchema);

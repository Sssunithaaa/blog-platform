import { Schema, model } from "mongoose";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const postSchema = new Schema(
  {
    title: { type: String, required: true, default: "" },
    description: { type: String, required: true },
    link: { type: String, required: true },
    board: { type: String, required: true },
    topics: { type: [String], default: "" },
    slug: { type: String, default: false },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "post",
});

const Post = model("Post", postSchema);
export default Post;

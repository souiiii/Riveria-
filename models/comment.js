import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blog",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);

export default comment;

import express from "express";
import blog from "../models/blog.js";

const router = express.Router();

async function getBlogs() {
  const blogs = await blog.find({}).populate("author").sort({ createdAt: -1 });
  return blogs;
}

router.get("/", async (req, res) =>
  res.render("home", { user: req.user, blogs: await getBlogs() })
);

export default router;

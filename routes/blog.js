import express from "express";
import multer from "multer";
import path from "path";
import blog from "../models/blog.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/coverImages"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => res.render("addBlog", { user: req.user }));
router.post("/add-new", upload.single("coverImage"), async (req, res) => {
  console.log(req.body, req.file);
  const body = req.body;
  await blog.create({
    title: body.title,
    body: body.body,
    coverImageUrl: `/coverImages/${req.file.filename}`,
    author: req.user._id,
  });
  return res.redirect("/riveria");
});

router.get("/:id", async (req, res) => {
  try {
    const blogg = await blog.findById(req.params.id).populate("author");
    if (!blogg) return res.redirect("/riveria");
    console.log(blogg.coverImageUrl);
    return res.render("blog", { blog: blogg.toObject() });
  } catch (err) {
    console.log(err);
    return res.redirect("/riveria");
  }
});

export default router;

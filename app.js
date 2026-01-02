import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import commentRouter from "./routes/comment.js";
import staticRouter from "./routes/staticRouter.js";
import connectMongoose from "./connection.js";
import { checkAuth, checkAuthorization } from "./middlewares/user.js";
import cookieParser from "cookie-parser";

connectMongoose(process.env.mongoUrl)
  .then(() => console.log("database connected"))
  .catch(() =>
    console.log("error encountered while connecting to the database")
  );

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.resolve("public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(checkAuth);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/riveria", staticRouter);
app.use("/blog", blogRouter);
app.use("/comment", checkAuthorization(["USER", "ADMIN"]), commentRouter);
app.use("/", userRouter);

app.listen(PORT, () => console.log("server started"));

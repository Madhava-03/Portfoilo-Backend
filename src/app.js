import express from "express";
import dotenv from "dotenv";
import path from "path";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { connectDB } from "./Config/db.js";
import authRouter from "./routes/authRoutes.js";
import oauth2Router from "./routes/oauth2Routes.js";
import aboutRouter from "./routes/aboutRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import socialProfileRouter from "./routes/socialProfileRoutes.js";
import contentRouter from "./routes/contentRoutes.js";
import commentRouter from "./routes/commentsRouter.js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const app = express();

//DB config

connectDB();

// Securtiy Middlwares

app.use(helmet());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); // it will be used to parse the cookies from the headers

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1000,
});

app.use("/api", limiter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "sucess", message: "API is Working " });
});

// app.get("/error-test", (req, res, next) => {
//   next(new AppError("Testing The GlobalErrorHandling", 400));
// });

/* 

ROUTES

*/

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth/", oauth2Router);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/profile", socialProfileRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/comments", commentRouter);

//global error handling
app.use(globalErrorHandler);
export default app;

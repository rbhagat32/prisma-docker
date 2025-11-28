import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.js";
import { PostRouter } from "@/routes/post.js";
import { UserRouter } from "@/routes/user.js";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";

const app = express();
configDotenv({ path: ".env", quiet: true });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL_DEV}`, `${process.env.FRONTEND_URL_PROD}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);

// custom error handler
app.use(ErrorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

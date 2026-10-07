import "dotenv/config";
import express from "express";
import cors from "cors";
import propertyRouter from "./routes/propertiesRouter.js";
import { router as authRouter } from "./routes/authRouter.js";
import savedPropertiesRouter from "./routes/savedPropertiesRouter.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin.endsWith(".vercel.app");
      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/saved-properties", savedPropertiesRouter);
app.use("/api/admin", adminRouter);

export default app;

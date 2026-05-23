import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import propertyRouter from "./routes/propertiesRouter.js";
import { router as authRouter } from "./routes/authRouter.js";
import savedPropertiesRouter from "./routes/savedPropertiesRouter.js";
import adminRouter from "./routes/adminRouter.js";
const app = express();

const port = Number(process.env.PORT) || 1015;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/saved-properties", savedPropertiesRouter);
app.use("/api/admin", adminRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Connected");

    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};
startServer();

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router as authRouter } from "./routes/authRouter.js";

const app = express();

const port = process.env.PORT || 1015;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

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

// name: horlabodehyibrahim_db_user;
// password: t33C4hqzzvFbiio4;

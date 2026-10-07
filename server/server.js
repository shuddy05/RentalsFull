import "dotenv/config";
import mongoose from "mongoose";
import dns from "node:dns";
import app from "./app.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const port = Number(process.env.PORT) || 1015;

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

import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";

dotenv.config();
import connectDB from "./db/connectDB.js";

const app = express();
connectDB();

app.use(express.json());

// load all routes

app.use("/api/v1", userRoute);

export default app;

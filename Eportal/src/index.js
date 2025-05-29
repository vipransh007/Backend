import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

// Configure environment variables
dotenv.config({ path: './.env' });

// Create an Express application
const app = express();

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });

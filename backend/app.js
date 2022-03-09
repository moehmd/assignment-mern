import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import employeeRouter from "./routes/employeeRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(
    cors({ origin: 'http://localhost:3000' }),
    express.urlencoded({ extended: true }), 
    express.json(), 
);

app.use('/employee', employeeRouter);

app.listen();
  
export default app

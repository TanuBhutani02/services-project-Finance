import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import routes from "./routes";

const app = express();
const PORT = 3001;


app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
})
);

// Connect to MongoDB
connectDB();

// Hook the routes
app.use('/api', routes);

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

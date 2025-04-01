import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import routes from "./routes";
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
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
console.log('calling app ts final ff ');
// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

module.exports = app;
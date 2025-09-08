import connectDB from "./db";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import eventsRouter from "./routes/events";
import authRouter from "./routes/auth"
import ticketsRouter from "./routes/tickets";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("server running really fast");
});

//event route
app.use("/events", eventsRouter);

//auth route
app.use("/auth", authRouter);

//tickets route
app.use("/tickets", ticketsRouter);

//db connect
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});

export default app;

import connectDB from "./db";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import eventsRouter from "./routes/events";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

//db connect
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});


app.get("/", (req: Request, res: Response) => {
  res.send("server running really fast");
});

//event route
app.use("/events", eventsRouter);

export default app;

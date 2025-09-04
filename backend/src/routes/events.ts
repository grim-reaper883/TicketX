import express, { Request, Response } from "express";
import Event from "../models/Event";

const router = express.Router();

// GET /events - all events
router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});



export default router;

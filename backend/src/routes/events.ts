import express, { Request, Response } from "express";
import Event from "../models/Event";
import mongoose from "mongoose";
import {requireAdmin} from "../middleware/verifyadmin";

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

// GET /events/:id - get single event (public)
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ error: "Event not found" });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch event" });
//   }
// });

// POST /events - create event (admin only)
router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { eventTitle, description, organizer, ticketLimit, deadline, price } =
      req.body;

    const event = new Event({
      id: new mongoose.Types.ObjectId().toHexString(),
      eventTitle,
      description,
      organizer,
      ticketLimit,
      deadline,
      price,
      ticketsSold: 0,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// PUT /events/:id - update event (admin only)
// router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
//   try {
//     const event = await Event.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!event) {
//       return res.status(404).json({ error: "Event not found" });
//     }

//     res.json({ message: "Event updated successfully", event });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update event" });
//   }
// });




// DELETE /events/:id - delete event (admin only)


router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// GET /events/admin/manage - get all events for admin management (admin only)
router.get("/admin/manage", requireAdmin, async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events for management" });
  }
});

export default router;

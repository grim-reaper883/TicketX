import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Ticket from "../models/Ticket";
import Event from "../models/Event";
import { authtoken } from "../middleware/verifyadmin";

const router = express.Router();

// POST /tickets/purchase

router.post("/purchase", authtoken, async (req: Request, res: Response) => {
  try {
    const { eventId, couponCode } = req.body as { eventId?: string; couponCode?: string };

    if (!eventId) {
      return res.status(400).json({ error: "eventId is required" });
    }

    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }


    const now = new Date();
    if (new Date(event.deadline) < now) {
      return res.status(400).json({ error: "Ticket purchase deadline has passed" });
    }

    const ticketsRemaining = event.ticketLimit - event.ticketsSold;
    if (ticketsRemaining <= 0) {
      return res.status(400).json({ error: "Tickets are sold out" });
    }
    const userId = req.user!.userID;
    const existing = await Ticket.findOne({ userId, eventId: event.id });
    if (existing) {
      return res.status(400).json({ error: "You already purchased a ticket for this event" });
    }

   
    let finalPrice = event.price;
    if (couponCode && typeof couponCode === "string" && couponCode.trim().length > 0) {
      const code = couponCode.trim().toUpperCase();
      if (code === "DISCOUNT10") {
        finalPrice = Math.max(0, Math.round(event.price * 0.9));
      } else {
        return res.status(400).json({ error: "Invalid coupon code" });
      }
    }

    
    const ticketId = new mongoose.Types.ObjectId().toHexString();
    const ticketCode = `TCK-${ticketId.slice(-8).toUpperCase()}`;
    const ticket = new Ticket({
      id: ticketId,
      eventId: event.id,
      userId,
      purchaseDate: new Date(),
      ticketCode,
    });

 
    event.ticketsSold = event.ticketsSold + 1;

    await ticket.save();
    await event.save();

    return res.status(201).json({
      message: "Ticket purchased successfully",
      ticket,
      pricePaid: finalPrice,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to purchase ticket" });
  }
});

// GET /tickets/mine - list current user's tickets with event info
router.get("/mine", authtoken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userID;
    const tickets = await Ticket.find({ userId }).sort({ purchaseDate: -1 });

    if (tickets.length === 0) {
      return res.json([]);
    }

    const eventIds = tickets.map(t => t.eventId);
    const events = await Event.find({ id: { $in: eventIds } });
    const idToEvent = new Map(events.map(e => [e.id, e] as const));

    const response = tickets.map(t => ({
      id: t.id,
      eventId: t.eventId,
      eventTitle: idToEvent.get(t.eventId)?.eventTitle ?? "",
      userId: t.userId,
      purchaseDate: t.purchaseDate,
      ticketCode: t.ticketCode,
    }));

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

export default router;

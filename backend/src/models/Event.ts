import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  id: string;
  eventTitle: string;
  description: string;
  organizer: string;
  ticketLimit: number;
  ticketsSold: number;
  deadline: Date;
  price: number;
}

const EventSchema: Schema = new Schema({
  id: { type: String, required: true },
  eventTitle: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: String, required: true },
  ticketLimit: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model<IEvent>("events", EventSchema);

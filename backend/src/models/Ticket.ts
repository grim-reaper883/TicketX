import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: Date;
  ticketCode: string;
}

const TicketSchema: Schema = new Schema({
  id: { type: String, required: true },
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  ticketCode: { type: String, required: true },
});

export default mongoose.model<ITicket>("tickets", TicketSchema);

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { ticketApi, ApiError } from "@/lib/api";
import Loading from "./loading";

interface TicketRow {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  purchaseDate: string;
  ticketCode: string;
}

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await ticketApi.myTickets();
        const data = await res.json();
        setTickets(data);
      } catch (err: any) {
        console.log(typeof(err))
        const msg = err instanceof ApiError ? err.message : (err?.message || "Failed to load tickets");
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) return <Loading/>;
  if (error) return <div className="text-white p-6">{error}</div>;
  if (tickets.length === 0) return <div className="text-white p-6">No tickets yet.</div>;

  return (
    <div className="text-white p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center"> My Tickets</h1>

      <div className="overflow-x-auto bg-slate-800 rounded-xl shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-cyan-700 text-left">
            <tr>
              <th className="px-4 py-3">Ticket Code</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-t border-slate-700 hover:bg-slate-700 transition"
              >
                <td className="px-4 py-3 font-mono">{ticket.ticketCode}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{ticket.eventTitle}</p>
                  <p className="text-xs text-gray-400">{ticket.eventId}</p>
                </td>
                <td className="px-4 py-3">{formatDate(ticket.purchaseDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTicketsPage;
import React from "react";

const MyTicketsPage = () => {
  // Example ticket data (normally from API)
  const tickets = [
    {
      id: "1",
      eventId: "event-001",
      eventTitle: "Summer Music Festival",
      userId: "user-001",
      purchaseDate: "2025-08-13T10:00:00Z",
      ticketCode: "ABC123XYZ",
    },
    {
      id: "2",
      eventId: "event-002",
      eventTitle: "Tech Conference 2025",
      userId: "user-001",
      purchaseDate: "2025-09-01T15:30:00Z",
      ticketCode: "XYZ789ABC",
    },
  ];

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
              <th className="px-4 py-3">Actions</th>
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
                <td className="px-4 py-3">
                  <button className="bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded-md text-sm font-semibold transition">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTicketsPage;

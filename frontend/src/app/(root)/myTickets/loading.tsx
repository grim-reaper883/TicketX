import React from 'react'

const Loading = () => {
  return (
    <div className="text-white p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center">My Tickets</h1>

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
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr
                key={idx}
                className="border-t border-slate-700 animate-pulse"
              >
                <td className="px-4 py-3">
                  <div className="h-4 bg-slate-600 rounded w-24"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 bg-slate-600 rounded w-40 mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-20"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 bg-slate-600 rounded w-28"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Loading
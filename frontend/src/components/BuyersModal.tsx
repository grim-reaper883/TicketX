"use client";

import React from "react";

interface Buyer {
  id: string;
  name: string;
  email: string;
  quantity?: number;
  purchasedAt?: string;
}

interface BuyersModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  buyers: Buyer[];
  title?: string;
  error?: string | null;
}

const BuyersModal = ({ open, onClose, loading, buyers, title = "Ticket Buyers", error }: BuyersModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">✕</button>
        </div>

        {loading ? (
          <div className="text-gray-300">Loading buyers...</div>
        ) : error ? (
          <div className="bg-red-900 border border-red-700 text-red-200 px-3 py-2 rounded mb-4">
            {error}
          </div>
        ) : buyers.length === 0 ? (
          <div className="text-gray-400">No buyers yet for this event.</div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {buyers.map((b) => (
              <li key={b.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{b.name || b.email}</div>
                  <div className="text-gray-400 text-sm">{b.email}</div>
                </div>
                <div className="text-gray-300 text-sm">
                  {b.quantity ? `${b.quantity} ticket${b.quantity > 1 ? "s" : ""}` : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BuyersModal;
"use client";

import React, { useState } from "react";
import { adminApi, ApiError } from "@/lib/api";

interface CreateEventFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateEventForm = ({ onSuccess, onCancel }: CreateEventFormProps) => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    description: "",
    organizer: "",
    ticketLimit: "",
    deadline: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await adminApi.createEvent({
        eventTitle: formData.eventTitle,
        description: formData.description,
        organizer: formData.organizer,
        ticketLimit: parseInt(formData.ticketLimit),
        deadline: formData.deadline,
        price: parseFloat(formData.price),
      });
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Event</h2>
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            name="eventTitle"
            placeholder="Event title"
            required
            onChange={onChange}
          />
          <textarea
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            name="description"
            placeholder="Description"
            rows={3}
            required
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            name="organizer"
            placeholder="Organizer"
            required
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            type="number"
            name="ticketLimit"
            placeholder="Ticket limit"
            min="1"
            required
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            type="datetime-local"
            name="deadline"
            required
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            type="number"
            name="price"
            placeholder="Price"
            min="0"
            step="0.01"
            required
            onChange={onChange}
          />
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;

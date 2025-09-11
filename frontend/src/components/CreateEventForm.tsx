"use client";

import React, { useEffect, useState } from "react";
import { adminApi, ApiError } from "@/lib/api";

interface CreateEventFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  eventId?: string;
  initialData?: {
    eventTitle: string;
    description: string;
    organizer: string;
    ticketLimit: number;
    deadline: string;
    price: number;
    ticketsSold: number;
  };
}

const CreateEventForm = ({
  onSuccess,
  onCancel,
  eventId,
  initialData,
}: CreateEventFormProps) => {
  const [formData, setFormData] = useState({
    eventTitle: initialData?.eventTitle ?? "",
    description: initialData?.description ?? "",
    organizer: initialData?.organizer ?? "",
    ticketLimit: initialData ? String(initialData.ticketLimit) : "",
    deadline: initialData
      ? new Date(initialData.deadline).toISOString().slice(0, 16)
      : "",
    price: initialData ? String(initialData.price) : "",
  });
  const ticketsSold = initialData?.ticketsSold ?? 0;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData) return;
    setFormData({
      eventTitle: initialData.eventTitle ?? "",
      description: initialData.description ?? "",
      organizer: initialData.organizer ?? "",
      ticketLimit: String(initialData.ticketLimit ?? ""),
      deadline: initialData.deadline
        ? new Date(initialData.deadline).toISOString().slice(0, 16)
        : "",
      price: String(initialData.price ?? ""),
    });
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const parsedLimit = parseInt(formData.ticketLimit);
    if (eventId && parsedLimit < ticketsSold) {
      setLoading(false);
      setError(
        `Ticket limit cannot be less than tickets already sold (${ticketsSold}).`
      );
      return;
    }

    const payload = {
      eventTitle: formData.eventTitle,
      description: formData.description,
      organizer: formData.organizer,
      ticketLimit: parseInt(formData.ticketLimit),
      deadline: new Date(formData.deadline).toISOString(),
      price: parseFloat(formData.price),
    };

    try {
      if (eventId) {
        await adminApi.updateEvent(eventId, payload);
      } else {
        await adminApi.createEvent(payload);
      }
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else
        setError(eventId ? "Failed to update event" : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isEdit = Boolean(eventId);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          {isEdit ? "Edit Event" : "Create New Event"}
        </h2>
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            name="eventTitle"
            placeholder="Event title"
            required
            value={formData.eventTitle}
            onChange={onChange}
          />
          <textarea
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            name="description"
            placeholder="Description"
            rows={3}
            required
            value={formData.description}
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            name="organizer"
            placeholder="Organizer"
            required
            value={formData.organizer}
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            type="number"
            name="ticketLimit"
            placeholder="Ticket limit"
            // min={Math.max(1, ticketsSold)}
            required
            value={formData.ticketLimit}
            onChange={onChange}
          />
          <input
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            type="datetime-local"
            name="deadline"
            required
            value={formData.deadline}
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
            value={formData.price}
            onChange={onChange}
          />
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {loading
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                ? "Save Changes"
                : "Create"}
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

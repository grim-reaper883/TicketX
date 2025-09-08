"use client";
import React, { useEffect, useState } from "react";
import { Clock, DollarSign, Building2, Trash, Plus } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import { adminApi, ApiError } from "@/lib/api";
import CreateEventForm from "@/components/CreateEventForm";

interface EventItem {
  _id: string;
  eventTitle: string;
  description: string;
  organizer: string;
  deadline: string;
  ticketLimit: number;
  ticketsSold: number;
  price: number;
}

const ManageEvent = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getEvents();
      const data: EventItem[] = await response.json();
      setEvents(data);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 403) {
          setError("You don't have admin permissions to view this page.");
        } else if (err.status === 401) {
          setError("Please sign in to access this page.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to fetch events");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await adminApi.deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (err) {
      if (err instanceof ApiError) {
        alert(`Failed to delete event: ${err.message}`);
      } else {
        alert("Failed to delete event");
      }
    }
  };

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Error</h1>
          <p className="text-lg">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminGuard>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white text-center mb-6">
            Manage Events
          </h1>

          <div
            className="mt-7 cursor-pointer bg-gradient-to-r from-cyan-700 to-slate-900 rounded-xl p-3 text-center font-bold max-w-xl mx-auto hover:from-cyan-600 hover:to-slate-800 transition-all"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <h2 className="text-2xl font-extrabold flex items-center justify-center">
              <Plus className="mr-2" />
              Add New Event
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
          {events.map((event) => {
            const availableTickets = Math.max(
              0,
              event.ticketLimit - event.ticketsSold
            );
            const soldPercentage =
              event.ticketLimit > 0
                ? (event.ticketsSold / event.ticketLimit) * 100
                : 0;

            return (
              <div
                key={event._id}
                className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800 mb-6"
              >
                {/* Event Header */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  {event.eventTitle}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {event.description}
                </p>

                {/* Organizer */}
                <div className="flex items-center mb-4 text-cyan-400">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{event.organizer}</span>
                </div>

                {/* Deadline */}
                <div className="flex items-center mb-4 text-gray-300">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Deadline: {formatDeadline(event.deadline)}
                  </span>
                </div>

                {/* Tickets */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">
                      Tickets Available
                    </span>
                    <span className="text-white font-semibold">
                      {availableTickets}/{event.ticketLimit}
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${soldPercentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {event.ticketsSold} sold
                    </span>
                    <span className="text-cyan-400">
                      {soldPercentage.toFixed(1)}% sold
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-400 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {event.price}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">BDT</span>
                  </div>

                  <button className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Buy Ticket
                  </button>
                </div>

                {/* Event ID and Delete */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      Event ID: {event._id}
                    </span>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-red-500 cursor-pointer hover:text-red-400 transition-colors"
                      title="Delete Event"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showCreateForm && (
        <CreateEventForm
          onSuccess={() => {
            setShowCreateForm(false);
            fetchEvents();
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </AdminGuard>
  );
};

export default ManageEvent;

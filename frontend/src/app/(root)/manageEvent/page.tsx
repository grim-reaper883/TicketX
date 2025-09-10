"use client";
import React, { useEffect, useState } from "react";
import {
  Clock,
  DollarSign,
  Building2,
  Trash,
  Plus,
  SquarePen,
  User,
} from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import { adminApi, ApiError } from "@/lib/api";
import CreateEventForm from "@/components/CreateEventForm";
import Swal from "sweetalert2";
import BuyersModal from "@/components/BuyersModal";
import Loading from "./loading";

interface EventItem {
  _id: string;
  id: string;
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
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [buyersOpen, setBuyersOpen] = useState(false);
  const [buyersLoading, setBuyersLoading] = useState(false);
  const [buyersError, setBuyersError] = useState<string | null>(null);
  const [buyers, setBuyers] = useState<
    {
      id: string;
      name: string;
      email: string;
      quantity?: number;
      purchasedAt?: string;
    }[]
  >([]);
  const [buyersEventTitle, setBuyersEventTitle] = useState<string>("");

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await adminApi.deleteEvent(eventId);
          setEvents(events.filter((event) => event._id !== eventId));

          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
        } catch (err) {
          if (err instanceof ApiError) {
            Swal.fire(
              "Error",
              `Failed to delete event: ${err.message}`,
              "error"
            );
          } else {
            Swal.fire("Error", "Failed to delete event", "error");
          }
        }
      }
    });
  };

  const handleEditEvent = (eventId: string) => {
    const found = events.find((e) => e._id === eventId) || null;
    setEditingEvent(found);
    setShowCreateForm(true);
  };

  const handleShowBuyers = async (eventMongoId: string) => {
    const evt = events.find((e) => e._id === eventMongoId);
    setBuyersEventTitle(evt?.eventTitle || "Ticket Buyers");
    setBuyersOpen(true);
    setBuyersLoading(true);
    setBuyersError(null);
    try {
      if (!evt?.id) throw new Error("Event is missing");
      const res = await adminApi.getEventBuyers(evt.id);
      const data = await res.json();
      setBuyers(data);
    } catch (err) {
      if (err instanceof ApiError) setBuyersError(err.message);
      else setBuyersError("Failed to load buyers");
    } finally {
      setBuyersLoading(false);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <Loading key={index} />
        ))}
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
            onClick={() => {
              setEditingEvent(null);
              setShowCreateForm(true);
            }}
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
                    <button
                      onClick={() => handleEditEvent(event._id)}
                      className=" cursor-pointer hover:text-gray-500 transition-colors"
                      title="Edit Event"
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShowBuyers(event._id)}
                      className=" cursor-pointer hover:text-gray-500 transition-colors"
                      title="View Buyers"
                    >
                      <User className="w-5 h-5" />
                    </button>
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
          eventId={editingEvent?._id}
          initialData={
            editingEvent
              ? {
                  eventTitle: editingEvent.eventTitle,
                  description: editingEvent.description,
                  organizer: editingEvent.organizer,
                  ticketLimit: editingEvent.ticketLimit,
                  deadline: editingEvent.deadline,
                  price: editingEvent.price,
                }
              : undefined
          }
          onSuccess={() => {
            setShowCreateForm(false);
            setEditingEvent(null);
            fetchEvents();
          }}
          onCancel={() => {
            setShowCreateForm(false);
            setEditingEvent(null);
          }}
        />
      )}
      <BuyersModal
        open={buyersOpen}
        onClose={() => setBuyersOpen(false)}
        loading={buyersLoading}
        buyers={buyers}
        title={buyersEventTitle}
        error={buyersError}
      />
    </AdminGuard>
  );
};

export default ManageEvent;

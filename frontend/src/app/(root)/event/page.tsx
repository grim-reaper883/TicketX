"use client";
import React, { useEffect, useState } from "react";
import { Clock, DollarSign, Building2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { ticketApi } from "@/lib/api";

interface EventItem {
  id: string | number;
  eventTitle: string;
  description: string;
  organizer: string;
  deadline: string;
  ticketLimit: number;
  ticketsSold: number;
  price: number | string;
}

const EventCard = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<Set<string>>(new Set());
  const [buyingId, setBuyingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: EventItem[] = await res.json();
        setEvents(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

    useEffect(() => {
    // Pre-load my purchased tickets when signed-in
    async function fetchMine() {
      try {
        if (!session) {
          setPurchased(new Set());
          return;
        }
        const res = await ticketApi.myTickets();
        const data = await res.json();
        const ids = new Set<string>(data.map((t: any) => String(t.eventId)));
        setPurchased(ids);
      } catch {
        // ignore
      }
    }
    fetchMine();
  }, [session]);

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

  const handleBuyTicket = async (event: EventItem) => {
    if (!session) {
      Swal.fire({
        title: "Please sign in to buy ticket!",
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
        icon: "info",
      });
      return;
    }

    const now = new Date();
    const isExpired = new Date(event.deadline) < now;
    const available = Math.max(0, event.ticketLimit - event.ticketsSold);
    const isSoldOut = available <= 0;
    const alreadyPurchased = purchased.has(String(event.id));
    if (isExpired || isSoldOut || alreadyPurchased) return;

    try {
      setBuyingId(String(event.id));
      // Optional: ask for coupon code
      // const { value: couponCode } = await Swal.fire({ input: "text", title: "Coupon code (optional)", inputPlaceholder: "DISCOUNT10", showCancelButton: true });
      // if (couponCode === undefined) return;

      const res = await ticketApi.purchase(String(event.id) /*, couponCode */);
      const data = await res.json();

      // Update UI: mark purchased + increment ticketsSold
      setPurchased(prev => {
        const next = new Set(prev);
        next.add(String(event.id));
        return next;
      });
      setEvents(prev =>
        prev.map(e =>
          String(e.id) === String(event.id)
            ? { ...e, ticketsSold: e.ticketsSold + 1 }
            : e
        )
      );

      Swal.fire({
        title: "Ticket purchased!",
        text: `Code: ${data.ticket.ticketCode}`,
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      const msg =
        err instanceof ApiError
          ? err.message
          : (err?.message || "Failed to purchase ticket");
      Swal.fire({ title: "Purchase failed", text: msg, icon: "error" });
    } finally {
      setBuyingId(null);
    }
  };


    if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 ">
        {events.map((event) => {
          const availableTickets = Math.max(
            0,
            event.ticketLimit - event.ticketsSold
          );
          const soldPercentage =
            event.ticketLimit > 0
              ? (event.ticketsSold / event.ticketLimit) * 100
              : 0;

          const now = new Date();
          const isExpired = new Date(event.deadline) < now;
          const isSoldOut = availableTickets <= 0;
          const isPurchased = purchased.has(String(event.id));
          const disabled = isExpired || isSoldOut || isPurchased || buyingId === String(event.id);
          const btnText = isPurchased ? "Purchased" : isSoldOut ? "Sold Out" : isExpired ? "Closed" : buyingId === String(event.id) ? "Buying..." : "Buy Ticket";

          return (
            <div
              key={event.id}
              className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800 mb-6"
            >
              {/* Event Header */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {event.eventTitle}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{event.description}</p>

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

                <button
                  onClick={() => handleBuyTicket(event)}
                  disabled={disabled}
                  className={`bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${disabled ? "opacity-60 cursor-not-allowed hover:scale-100" : ""}`}
                >
                  {btnText}
                </button>
              </div>

              {/* Event ID */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <span className="text-gray-500 text-xs">
                  Event ID: {event.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventCard;
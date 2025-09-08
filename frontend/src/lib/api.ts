/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const session = await getSession();

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  
  if (session?.user) {
    
    const token = (session as any).token; 
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    ...config,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.error || "Request failed");
  }

  return response;
};

// Admin-specific API calls
export const adminApi = {
  // Get events for admin management
  getEvents: () => apiRequest("/events/admin/manage"),

  // Create event
  createEvent: (eventData: any) =>
    apiRequest("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),

  // Update event
  updateEvent: (id: string, eventData: any) =>
    apiRequest(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),

  // Delete event
  deleteEvent: (id: string) =>
    apiRequest(`/events/${id}`, {
      method: "DELETE",
    }),
};

// User ticket APIs
export const ticketApi = {
  purchase: (eventId: string, couponCode?: string) =>
    apiRequest("/tickets/purchase", {
      method: "POST",
      body: JSON.stringify({ eventId, couponCode }),
    }),
  myTickets: () => apiRequest("/tickets/mine"),
};

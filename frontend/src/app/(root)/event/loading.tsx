"use client";
import React from "react";

const Loading = () => {
  console.log("loading called");
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800 mb-6 animate-pulse">
      
      {/* Event Header */}
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>

      {/* Organizer */}
      <div className="flex items-center mb-4">
        <div className="h-4 w-4 bg-gray-700 rounded mr-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>

      {/* Deadline */}
      <div className="flex items-center mb-4">
        <div className="h-4 w-4 bg-gray-700 rounded mr-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>

      {/* Tickets */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-700 rounded w-1/6"></div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 mb-2"></div>

        <div className="flex items-center justify-between text-xs">
          <div className="h-3 bg-gray-700 rounded w-1/6"></div>
          <div className="h-3 bg-gray-700 rounded w-1/6"></div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-6 w-6 bg-gray-700 rounded mr-2"></div>
          <div className="h-6 bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-700 rounded w-6 ml-2"></div>
        </div>

        <div className="h-10 bg-gray-700 rounded w-24"></div>
      </div>

      {/* Event ID */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default Loading;

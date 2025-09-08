import React from "react";
import { Clock } from "lucide-react";

const TimeLogItemSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse">
    {/* Header */}
    <div className="flex justify-between items-start mb-2">
      {/* Description */}
      <div className="flex-1 mr-4">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Duration badge */}
      <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
    </div>

    {/* Footer (date) */}
    <div className="flex items-center text-xs text-gray-500">
      <Clock className="w-3 h-3 mr-1 text-gray-300" />
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default TimeLogItemSkeleton;

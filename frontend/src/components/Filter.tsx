import React from "react";
import type { FiltersProps } from "../types";

const Filters: React.FC<FiltersProps> = ({
  dateFilter,
  onDateFilterChange,
  durationFilter,
  onDurationFilterChange
}) => (
  <div className="flex space-x-3 mb-4">
    <div className="flex-1">
      <label className="block text-xs font-medium text-gray-700 mb-1">Sort by Date</label>
      <select
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value as 'newest' | 'oldest')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      >
        <option value="newest">Most Recent</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    <div className="flex-1">
      <label className="block text-xs font-medium text-gray-700 mb-1">Sort by Duration</label>
      <select
        value={durationFilter}
        onChange={(e) => onDurationFilterChange(e.target.value as 'longest' | 'shortest')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      >
        <option value="longest">Longest First</option>
        <option value="shortest">Shortest First</option>
      </select>
    </div>
  </div>
);

export default Filters;

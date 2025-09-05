import React from 'react';
import type { TimeLogItemProps } from '../types';
import { formatDuration } from '../utils';
import { Clock } from 'lucide-react';


const TimeLogItem: React.FC<TimeLogItemProps> = ({ log }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-4">
        {log.description}
      </h4>
      <div className="flex items-center space-x-2">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {log.duration}
        </span>
      </div>
    </div>
    <div className="flex items-center text-xs text-gray-500">
      <Clock className="w-3 h-3 mr-1" />
      {log.end_date}
    </div>
  </div>
);

export default TimeLogItem;
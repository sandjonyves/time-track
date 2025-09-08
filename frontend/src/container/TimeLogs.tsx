
import type { TimeLogsProps } from '../types';
import { useState, useEffect } from 'react';
import { formatDuration } from '../utils';
import TimeLogItem from '../components/TimeLogItem';
import NewLogModal from '../components/NewLogModal';
import { Plus } from 'lucide-react';
import { useTimeLogStore } from '../store/timeLogStore';
import SearchBar from '../components/Search';
import Filters from '../components/Filter';
import Button from '../components/ui/Button';
import TimeLogItemSkeleton from '../components/ui/TimeLogItemSkeleton';

const TimeLogs: React.FC<TimeLogsProps> = () => {
  const { timeLogs, fetchFilteredLogs,loading } = useTimeLogStore();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<'newest' | 'oldest'>('newest');
  const [durationFilter, setDurationFilter] = useState<'longest' | 'shortest'>('longest');

  // 🔹 Charger les logs filtrés dès que les filtres changent
  useEffect(() => {
    const orderBy =
      dateFilter === 'newest'
        ? 'date_recent'
        : dateFilter === 'oldest'
        ? 'date_old'
        : durationFilter === 'longest'
        ? 'duration_recent'
        : 'duration_old';

    fetchFilteredLogs({
      search: searchTerm || undefined,
      orderBy,
    });
  }, [searchTerm, dateFilter, durationFilter, fetchFilteredLogs]);

  const totalTime = timeLogs.reduce((sum, log) => sum + (log.duration ?? 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     
     {loading? <TimeLogItemSkeleton /> : 
        <>
        <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Time Logs</h2>
          <p className="text-gray-600">View and manage your tracked time</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Time Logs</h3>
          <Button
            onClick={() => setShowModal(true)}
            variant='primary'
          >           
            <Plus className="w-4 h-4 mr-2" />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {timeLogs.length} entries • Total: {formatDuration(totalTime)}
        </p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <Filters
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          durationFilter={durationFilter}
          onDurationFilterChange={setDurationFilter}
        />

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {timeLogs.map((log) => (
            <TimeLogItem key={log.id} log={log} />
          ))}
          {timeLogs.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              No logs found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      <NewLogModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      </>}
    </div>
  );
};

export default TimeLogs;

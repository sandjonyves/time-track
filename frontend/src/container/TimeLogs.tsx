import React, { useState, useEffect } from 'react';
import { useTimeLogStore } from '../store/timeLogStore';
import TimeLogItem from '../components/TimeLogItem';
import NewLogModal from '../components/NewLogModal';
import TimeLogItemSkeleton from '../components/ui/TimeLogItemSkeleton';
import SearchBar from '../components/Search';
import Filters from '../components/Filter';
import Button from '../components/ui/Button';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const TimeLogs: React.FC = () => {
  const { timeLogs, fetchTimeLogs, fetchFilteredLogs, loading, hasMore } = useTimeLogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'newest' | 'oldest'>('newest');
  const [durationFilter, setDurationFilter] = useState<'longest' | 'shortest'>('longest');

  // Nouveau : quel filtre a été modifié en dernier -> détermine la priorité
  const [lastChanged, setLastChanged] = useState<'date' | 'duration'>('duration');

  const { user } = useAuthStore();
  const userId = user?.id || 1;

  // Handlers qui mettent à jour le filtre ET lastChanged
  const handleDateFilterChange = (value: 'newest' | 'oldest') => {
    setDateFilter(value);
    setLastChanged('date');
  };

  const handleDurationFilterChange = (value: 'longest' | 'shortest') => {
    setDurationFilter(value);
    setLastChanged('duration');
  };

  useEffect(() => {
    let orderBy: string;

    if (lastChanged === 'duration') {
     
      orderBy = durationFilter === 'longest' ? 'duration_recent' : 'duration_old';
    } else {
      
      orderBy = dateFilter === 'newest' ? 'date_recent' : 'date_old';
    }

    console.log('Filters applied:', { searchTerm, orderBy, lastChanged });
    setCurrentPage(1);
    fetchFilteredLogs({
      search: searchTerm || undefined,
      orderBy,
    });
  }, [fetchFilteredLogs, searchTerm, dateFilter, durationFilter, lastChanged]);

  const handleNextPage = async () => {
    if (loading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      await fetchTimeLogs(userId, nextPage);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Erreur lors du chargement de la page suivante:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handlePreviousPage = async () => {
    if (loading || isLoadingMore || currentPage <= 1) return;

    setIsLoadingMore(true);
    const prevPage = currentPage - 1;

    try {
      await fetchTimeLogs(userId, prevPage);
      setCurrentPage(prevPage);
    } catch (error) {
      console.error('Erreur lors du chargement de la page précédente:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Time Logs</h3>
        <Button onClick={() => setShowModal(true)} variant="primary">
          <Plus className="w-4 h-4 mr-2" /> New Log
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Filters
        dateFilter={dateFilter}
        onDateFilterChange={handleDateFilterChange}
        durationFilter={durationFilter}
        onDurationFilterChange={handleDurationFilterChange}
      />

      <div className="space-y-3 max-h-96 overflow-y-auto border-t border-gray-200 pt-4">
        {timeLogs.map((log) => (
          <TimeLogItem key={log.id} log={log} />
        ))}

        {(loading || isLoadingMore) && (
          <>
            <TimeLogItemSkeleton />
            <TimeLogItemSkeleton />
            <TimeLogItemSkeleton />
          </>
        )}

        {timeLogs.length === 0 && !loading && !isLoadingMore && (
          <div className="text-center py-8 text-gray-500">Aucun log trouvé</div>
        )}
      </div>

      {timeLogs.length > 0 && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <Button
            onClick={handlePreviousPage}
            variant="secondary"
            disabled={currentPage <= 1 || loading || isLoadingMore}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Précédent
          </Button>

          <span className="text-sm text-gray-600">Page {currentPage}</span>

          <Button
            onClick={handleNextPage}
            variant="secondary"
            disabled={!hasMore || loading || isLoadingMore}
          >
            Suivant <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {!hasMore && !loading && !isLoadingMore && timeLogs.length > 0 && (
        <div className="text-center py-2 text-gray-500 text-sm">
          Aucune page supplémentaire
        </div>
      )}

      <NewLogModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default TimeLogs;

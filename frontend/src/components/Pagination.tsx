import React from 'react';
import Button from './ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  isLoadingMore: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  showNoMoreMessage?: boolean;
  itemsCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasMore,
  loading,
  isLoadingMore,
  onNextPage,
  onPreviousPage,
  showNoMoreMessage = true,
  itemsCount = 0,
}) => {

  if (itemsCount === 0 && !loading && !isLoadingMore) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      
      <div className="flex justify-between items-center">
        <Button
          onClick={onPreviousPage}
          variant="secondary"
          disabled={currentPage <= 1 || loading || isLoadingMore}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Précédent
        </Button>

        <span className="text-sm text-gray-600">Page {currentPage}</span>

        <Button
          onClick={onNextPage}
          variant="secondary"
          disabled={!hasMore || loading || isLoadingMore}
        >
          Suivant <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

     
      {showNoMoreMessage && !hasMore && !loading && !isLoadingMore && itemsCount > 0 && (
        <div className="text-center py-2 text-gray-500 text-sm mt-2">
          Aucune page supplémentaire
        </div>
      )}
    </div>
  );
};

export default Pagination;
// src/store/useTimeLogStore.ts
import { create } from 'zustand';
import { TimeTrackingService } from '../services/timeTrackingService';
import type { TimeLogResponse, CreateTimeLogRequest } from '../types';

interface TimeLogState {
  timeLogs: TimeLogResponse[];
  loading: boolean;
  error: string | null;

  fetchTimeLogs: (userId: number, page: number) => Promise<void>;
  fetchFilteredLogs: (filters: { 
    search?:string,
    date?: string; 
    minDuration?: number; 
    maxDuration?: number; 
    orderBy?: "date_recent" | "date_old" | "duration_recent" | "duration_old";
  }) => Promise<void>;
  addTimeLog: (data: CreateTimeLogRequest) => Promise<void>;
  deleteTimeLog: (id: number) => Promise<void>;
  
  hasMore: boolean; 
}

export const useTimeLogStore = create<TimeLogState>((set, get) => ({
  timeLogs: [],
  loading: false,
  error: null,
  hasMore: true, 

  fetchTimeLogs: async (userId, page) => {
    set({ loading: true, error: null });
    try {
      const logs = await TimeTrackingService.getTimeLogs(userId, page);
      console.log(logs)
      set(state => ({
        timeLogs:  logs.results , 
        loading: false,
        hasMore: logs.results.length > 0, 
      }));
    } catch (err: any) {
         set({
      error: err.message ?? 'Erreur lors du chargement',
      loading: false,
      hasMore: false,
    });
    }
  },

  fetchFilteredLogs: async (filters) => {
    set({ loading: true, error: null });
    try {
      
      const logs = await TimeTrackingService.getFilteredTimeLogs(filters);
      console.log('xzxxz',logs)
      set({ timeLogs: logs.results, loading: false, hasMore: logs.results.length > 0 });
    } catch (err: any) {
      set({ error: err.message ?? 'Erreur de filtre', loading: false });
    }
  },

  addTimeLog: async (data) => {
    set({ loading: true, error: null });
    try {
      const newLog = await TimeTrackingService.createTimeLog(data);
      set({ timeLogs: [...get().timeLogs, newLog], loading: false });
    } catch (err: any) {
      set({ error: err.message ?? 'Erreur création', loading: false });
    }
  },

  deleteTimeLog: async (id) => {
    set({ loading: true, error: null });
    try {
      await TimeTrackingService.deleteTimeLog(id);
      set({
        timeLogs: get().timeLogs.filter((log) => log.id !== id),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message ?? 'Erreur suppression', loading: false });
    }
  },
}));

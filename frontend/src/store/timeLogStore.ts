// src/store/useTimeLogStore.ts
import { create } from 'zustand';
import { TimeTrackingService } from '../services/timeTrackingService';
import type { TimeLogResponse, CreateTimeLogRequest } from '../types';

interface TimeLogState {
  timeLogs: TimeLogResponse[];
  loading: boolean;
  error: string | null;

  fetchTimeLogs: () => Promise<void>;
  fetchFilteredLogs: (filters: { 
    search?:string,
    date?: string; 
    minDuration?: number; 
    maxDuration?: number; 
    orderBy?: "date_recent" | "date_old" | "duration_recent" | "duration_old";
  }) => Promise<void>;
  addTimeLog: (data: CreateTimeLogRequest) => Promise<void>;
  deleteTimeLog: (id: number) => Promise<void>;
}

export const useTimeLogStore = create<TimeLogState>((set, get) => ({
  timeLogs: [],
  loading: false,
  error: null,


  fetchTimeLogs: async () => {
    set({ loading: true, error: null });
    try {
      const logs = await TimeTrackingService.getTimeLogs();
      set({ timeLogs: logs, loading: false });
    } catch (err: any) {
      set({ error: err.message ?? 'Erreur lors du chargement', loading: false });
    }
  },


  fetchFilteredLogs: async (filters) => {
    set({ loading: true, error: null });
    try {
      const logs = await TimeTrackingService.getFilteredTimeLogs(filters);
      set({ timeLogs: logs, loading: false });
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

// services/timeTrackingService.ts
import { ApiService } from './api';
import type { TimeLogResponse, CreateTimeLogRequest } from '../types';

interface FilterParams {
  search?: string; // 🔹 ajout du search
  date?: string;
  minDuration?: number;
  maxDuration?: number;
  orderBy?: "date_recent" | "date_old" | "duration_recent" | "duration_old";
}

export class TimeTrackingService {
  // Récupérer toutes les tâches
  static async getTimeLogs(userId: number, page: number): Promise<TimeLogResponse[]> {
   
    return await ApiService.get<TimeLogResponse[]>(`/tasks/?user_id=${userId}&page=${page}`);
  }

  // Récupérer une tâche par ID
  static async getTimeLog(id: number): Promise<TimeLogResponse> {
    return await ApiService.get<TimeLogResponse>(`/tasks/${id}/`);
  }

  // Créer une nouvelle tâche
  static async createTimeLog(data: CreateTimeLogRequest): Promise<TimeLogResponse> {
    return await ApiService.post<TimeLogResponse>('/tasks/', data);
  }


  static async deleteTimeLog(id: number): Promise<void> {
    await ApiService.delete(`/tasks/${id}/`);
  }

static async getFilteredTimeLogs(filters: FilterParams): Promise<TimeLogResponse[]> {
    const queryParams = new URLSearchParams();

    if (filters.search) queryParams.append('search', filters.search);
    if (filters.date) queryParams.append('date', filters.date);
    if (filters.minDuration) queryParams.append('min_duration', filters.minDuration.toString());
    if (filters.maxDuration) queryParams.append('max_duration', filters.maxDuration.toString());
    if (filters.orderBy) queryParams.append('order_by', filters.orderBy);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/tasks/filter/?${queryString}` : '/tasks/filter/';

    return await ApiService.get<TimeLogResponse[]>(endpoint);
  }
}

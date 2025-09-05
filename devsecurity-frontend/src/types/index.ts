// Types
export interface TimeLog {
  id: number;
  user: number;
  description: string;
  duration?: number;
  start_time: string;
  start_date: string;
  end_date: string;
  end_time: string;
}

export interface TimerProps {
  time: number;
  isRunning: boolean;
  onToggle: () => void;
}

export interface TimeLogsProps {
  logs: TimeLogResponse[];
  // onAddLog: (title: string, duration: string) => void;
}

export interface TimeLogItemProps {
  log: TimeLog;
}

export interface NewLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  startTime?: string;
  endTime?: string;
}



export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
}


export interface AuthResponse {
  user: User;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
}


export interface TimeLogFormData {
  user:number,
  description: string;
  start_time: string;
  start_date: string;
  end_date: string;
  end_time: string;
}


export interface TimeLogResponse {
  id: number;
  user: number;
  description: string;
  duration?: number;
  start_time: string;
  start_date: string;
  end_date: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTimeLogRequest {
  user: number;
  description: string;
  start_time: string;
  start_date: string;
  end_date: string;
  end_time: string;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface FiltersProps {
  dateFilter: 'newest' | 'oldest';
  onDateFilterChange: (value: 'newest' | 'oldest') => void;
  durationFilter: 'longest' | 'shortest';
  onDurationFilterChange: (value: 'longest' | 'shortest') => void;
}
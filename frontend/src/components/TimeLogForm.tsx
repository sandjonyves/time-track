import { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import { useTimeLogStore } from "../store/timeLogStore";
import { useAuthStore } from "../store/authStore";
import type { TimeLogFormData } from "../types";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface TimeLogFormProps {
  startTime?: string;
  endTime?: string;
  onClose: () => void;
}

const TimeLogForm: React.FC<TimeLogFormProps> = ({ startTime = '', endTime = '', onClose }) => {
  const { addTimeLog } = useTimeLogStore();
  const { user } = useAuthStore();

  const [description, setDescription] = useState('');
  const [startTimeInput, setStartTimeInput] = useState(startTime);
  const [endTimeInput, setEndTimeInput] = useState(endTime);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setStartTimeInput(startTime);
    setEndTimeInput(endTime);
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  }, [startTime, endTime]);

  const validateTimeFormat = (time: string) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(time);
  const formatTimeInput = (value: string) => value.replace(/[^0-9:]/g, '');

  const handleSubmit = async () => {
    if (!description.trim() || !startTimeInput || !endTimeInput || !startDate || !endDate) return;
    if (!validateTimeFormat(startTimeInput) || !validateTimeFormat(endTimeInput)) {
      alert('Please enter valid time format (hh:mm:ss)');
      return;
    }

    const timeLogData: TimeLogFormData = {
      user: user?.id,
      description: description.trim(),
      start_time: `${startDate}T${startTimeInput}`,
      start_date: startDate,
      end_date: endDate,
      end_time: `${endDate}T${endTimeInput}`,
    };

    try {
      await addTimeLog(timeLogData);
      setDescription('');
      onClose();
    } catch (error: any) {
      alert(error.message ?? "Error adding time log");
    }
  };

  const isTimerSession = startTime && endTime;

  return (
    <div className="space-y-4">
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you worked on..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          icon={<Calendar className="w-4 h-4" />}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>

      {/* Time Fields */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={startTimeInput}
          onChange={(e) => setStartTimeInput(formatTimeInput(e.target.value))}
          placeholder="hh:mm:ss"
          icon={<Clock className="w-4 h-4" />}
          readOnly={!!isTimerSession}
        />
        <Input
          value={endTimeInput}
          onChange={(e) => setEndTimeInput(formatTimeInput(e.target.value))}
          placeholder="hh:mm:ss"
          icon={<Clock className="w-4 h-4" />}
          readOnly={!!isTimerSession}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        <Button onClick={onClose} variant="secondary">Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={
            !description.trim() || !startTimeInput || !endTimeInput || !startDate || !endDate ||
            !validateTimeFormat(startTimeInput) || !validateTimeFormat(endTimeInput)
          }
          variant="primary"
        >
          {isTimerSession ? 'Save Session' : 'Add Log'}
        </Button>
      </div>
    </div>
  );
};

export default TimeLogForm;

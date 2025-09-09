import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTimeLogStore } from '../store/timeLogStore';
import Header from '../components/Header';
import Timer from '../container/Timer';
import TimeLogs from '../container/TimeLogs';
import NewLogModal from '../components/NewLogModal';

const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { timeLogs, fetchTimeLogs } = useTimeLogStore();
  const navigate = useNavigate();

  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalStartTime, setModalStartTime] = useState<string>('');
  const [modalEndTime, setModalEndTime] = useState<string>('');

  // Fetch logs when component mounts
  useEffect(() => {
    fetchTimeLogs(user?.id!, 1);
  }, [fetchTimeLogs]);

  // Timer effect
  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);


  const handleSaveSession = (startTime: string, endTime: string) => {
    setModalStartTime(startTime);
    setModalEndTime(endTime);
    setShowModal(true);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };


  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!user || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Header totalEntries={timeLogs.length} handleLogout={handleLogout}/>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Timer
            time={time}
            isRunning={isRunning}
            onToggle={toggleTimer}
            onSaveSession={handleSaveSession}
          />
          <TimeLogs logs={timeLogs} />
        </div>
      </div>

      <NewLogModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setModalStartTime('');
          setModalEndTime('');
        }}
        startTime={modalStartTime}
        endTime={modalEndTime}
      />
    </div>
  );
};

export default Dashboard;

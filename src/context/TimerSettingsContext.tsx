import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Session {
  id: string;
  type: 'work' | 'break';
  duration: number;
  completedAt: Date;
}

interface TimerSettingsContextType {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  isBreak: boolean;
  setIsBreak: (isBreak: boolean) => void;
  durations: { work: number; break: number };
  setDurations: (durations: { work: number; break: number }) => void;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  endTime: number | null;
  setEndTime: (time: number | null) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const TimerSettingsContext = createContext<TimerSettingsContextType | undefined>(undefined);

export const TimerSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [durations, setDurations] = useState<{ work: number; break: number }>({ work: 25, break: 5 });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedDurations = localStorage.getItem('pomodoroSettings');
    if (savedDurations) setDurations(JSON.parse(savedDurations));

    const savedSessions = localStorage.getItem('pomodoroHistory');
    if (savedSessions) setSessions(JSON.parse(savedSessions));

    const savedEndTime = localStorage.getItem('pomodoroEndTime');
    if (savedEndTime) setEndTime(Number(savedEndTime));

    const savedTimeLeft = localStorage.getItem('pomodoroTimeLeft');
    if (savedTimeLeft) setTimeLeft(Number(savedTimeLeft));

    const savedIsRunning = localStorage.getItem('pomodoroIsRunning');
    if (savedIsRunning) setIsRunning(savedIsRunning === 'true');

    const savedIsBreak = localStorage.getItem('pomodoroIsBreak');
    if (savedIsBreak) setIsBreak(savedIsBreak === 'true');

    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth) setIsAuthenticated(savedAuth === 'true');
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(durations));
  }, [durations]);

  useEffect(() => {
    localStorage.setItem('pomodoroHistory', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (endTime !== null) {
      localStorage.setItem('pomodoroEndTime', endTime.toString());
    } else {
      localStorage.removeItem('pomodoroEndTime');
    }
  }, [endTime]);

  useEffect(() => {
    localStorage.setItem('pomodoroTimeLeft', timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('pomodoroIsRunning', isRunning.toString());
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('pomodoroIsBreak', isBreak.toString());
  }, [isBreak]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <TimerSettingsContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        isRunning,
        setIsRunning,
        isBreak,
        setIsBreak,
        durations,
        setDurations,
        sessions,
        setSessions,
        endTime,
        setEndTime,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </TimerSettingsContext.Provider>
  );
};

export const useTimerSettings = (): TimerSettingsContextType => {
  const context = useContext(TimerSettingsContext);
  if (!context) {
    throw new Error('useTimerSettings must be used within a TimerSettingsProvider');
  }
  return context;
};

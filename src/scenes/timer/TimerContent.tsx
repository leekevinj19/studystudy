import React, { useState, useEffect, useRef } from 'react';
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useTheme, Typography, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const alarmSound = new Audio('/alarm.mp3');

interface Session {
  id: string;
  type: 'work' | 'break';
  duration: number;
  completedAt: Date;
}

const TimerContent = () => {
  const { palette } = useTheme();

  // Initialize state from localStorage or defaults
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const prevTimeLeft = useRef(timeLeft);
  const [durations, setDurations] = useState(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : { work: 25, break: 5 };
  });
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('pomodoroHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [endTime, setEndTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('pomodoroEndTime');
    return saved ? Number(saved) : null;
  });

  // On mount, calculate timeLeft based on endTime and current time
  useEffect(() => {
    if (endTime) {
      const diff = Math.floor((endTime - Date.now()) / 1000);
      if (diff > 0) {
        setTimeLeft(diff);
        setIsRunning(true);
      } else {
        setTimeLeft(0);
        setIsRunning(false);
      }
    } else {
      setTimeLeft(durations.work * 60);
    }
  }, [endTime, durations.work]);

  // Persist timer state to localStorage on changes
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

  // Watch for settings changes from other tabs/windows
  useEffect(() => {
    const handleStorage = () => {
      const savedSettings = localStorage.getItem('pomodoroSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setDurations(settings);
        if (!isRunning) {
          setTimeLeft(isBreak ? settings.break * 60 : settings.work * 60);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isRunning, isBreak]);

  // Timer logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      timer = setInterval(() => {
        const now = Date.now();
        if (endTime) {
          const diff = Math.floor((endTime - now) / 1000);
          if (diff >= 0) {
            setTimeLeft(diff);
          } else {
            // Session completed
            alarmSound.play().catch(e => console.error("Audio playback failed:", e));
            const newSession: Session = {
              id: Date.now().toString(),
              type: isBreak ? 'break' : 'work',
              duration: isBreak ? durations.break : durations.work,
              completedAt: new Date()
            };
            const updatedSessions = [newSession, ...sessions.slice(0, 19)]; // Keep last 20 sessions
            setSessions(updatedSessions);

            const nextIsBreak = !isBreak;
            setIsBreak(nextIsBreak);
            setTimeLeft(nextIsBreak ? durations.break * 60 : durations.work * 60);
            setIsRunning(true);
            setEndTime(Date.now() + (nextIsBreak ? durations.break * 60 : durations.work * 60) * 1000);
          }
        }
      }, 1000);
    }
    prevTimeLeft.current = timeLeft;
    return () => clearInterval(timer);
  }, [isRunning, isBreak, durations, sessions, endTime]);

  // Update endTime when timer starts or resets
  useEffect(() => {
    if (isRunning) {
      setEndTime(Date.now() + timeLeft * 1000);
    }
    // Do not clear endTime on pause to preserve remaining time
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => {
    setIsRunning(false);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(durations.work * 60);
    setEndTime(null);
  };

  const clearHistory = () => {
    setSessions([]);
    localStorage.removeItem('pomodoroHistory');
  };

  const deleteSession = (id: string) => {
    const updatedSessions = sessions.filter(session => session.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem('pomodoroHistory', JSON.stringify(updatedSessions));
  };

  return (
    <DashboardBox gridArea="a">
      <BoxHeader
        title={`Pomodoro Timer (${isBreak ? 'Break' : 'Work'})`}
        subtitle={isBreak ? 'Take a break!' : 'Focus time!'}
        sideText={`${durations.work}/${durations.break} min`}  // Dynamically shows current settings
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 5,
          px: 6,
          py: 3,
          bgcolor: palette.background.paper,
          borderRadius: 4,
          boxShadow: 3,
          minWidth: 120,
          minHeight: 130,
        }}
      >
        <Typography variant="h2" align="center" sx={{ fontSize: '9rem' }}>
          {formatTime(timeLeft)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleStart} 
          disabled={isRunning}
          sx={{ bgcolor: palette.primary.dark }}
        >
          Start
        </Button>
        <Button 
          variant="outlined" 
          onClick={handlePause} 
          disabled={!isRunning}
          sx={{ color: palette.secondary.main }}
        >
          Pause
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleReset}
          sx={{ color: palette.secondary.main }}
        >
          Reset
        </Button>
      </Box>

      {/* Session History */}
      {sessions.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ p: "0.5rem", mb: 1 }}>
                Recent Sessions
            </Typography>
            <Button 
              variant="text" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={clearHistory}
              size="small"
            >
              Clear All
            </Button>
          </Box>
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {sessions.map((session) => (
              <Box key={session.id} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                bgcolor: session.type === 'work' ? palette.primary.light : palette.secondary.light,
                mb: 1,
                borderRadius: 1
              }}>
                <Box>
                  <Typography fontWeight="bold">
                    {session.type === 'work' ? 'Work' : 'Break'} Session
                  </Typography>
                  <Typography variant="body2">
                    {session.duration} min • {formatDate(session.completedAt)}
                  </Typography>
                </Box>
                <IconButton 
                  size="small" 
                  onClick={() => deleteSession(session.id)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </DashboardBox>
  );
};

export default TimerContent;

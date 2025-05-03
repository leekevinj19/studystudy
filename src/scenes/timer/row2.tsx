import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Slider } from '@mui/material';
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";


const Row2 = () => {
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [isSaved, setIsSaved] = useState(false);

    // Load saved settings
    useEffect(() => {
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            const { work, break: breakTime } = JSON.parse(savedSettings);
            setWorkDuration(work);
            setBreakDuration(breakTime);
        }
    }, []);

    const handleSave = () => {
        const settings = {
            work: workDuration,
            break: breakDuration
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        
        // Notify other components of settings change
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <DashboardBox gridArea="b">
            <BoxHeader
                title="Timer Settings"
                subtitle="Configure work and break durations"
                sideText=""
            />
            
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Work Duration
                </Typography>
                <Slider
                    value={workDuration}
                    onChange={(e, newValue) => setWorkDuration(newValue as number)}
                    min={1}
                    max={120}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{ mb: 4 }}
                />

                <Typography variant="h6" gutterBottom>
                    Break Duration
                </Typography>
                <Slider
                    value={breakDuration}
                    onChange={(e, newValue) => setBreakDuration(newValue as number)}
                    min={1}
                    max={30}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{ mb: 4 }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSave}
                    size="large"
                >
                    Save Settings
                </Button>

                {isSaved && (
                    <Typography color="success.main" textAlign="center" mt={2}>
                        Settings saved!
                    </Typography>
                )}
            </Box>
        </DashboardBox>
    );
};

export default Row2;
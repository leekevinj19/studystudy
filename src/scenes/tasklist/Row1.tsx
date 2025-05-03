import React, { useState, useEffect } from 'react';
import { Typography, Box, useTheme, Checkbox, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";

interface Task {
  title: string;
  description: string;
  completed?: boolean;
}

const Row1 = () => {
    const theme = useTheme();
    const { palette } = theme;
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (newTask: Task) => {
        setTasks([...tasks, newTask]);
    };

    const toggleTaskCompletion = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index],
            completed: !updatedTasks[index].completed
        };
        setTasks(updatedTasks);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const clearAllTasks = () => {
        setTasks([]);
    };

    return (
        <DashboardBox 
          gridArea="a"
          p="1.5rem"
          height="100%"
          sx={{
            gridColumn: "span 2",
            gridRow: "span 2",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflow: "auto",
            minHeight: "600px",
          }}
        >
            {/* Header using BoxHeader */}
            <BoxHeader
                title="Task List"
                subtitle="Manage your tasks efficiently"
                sideText={`${tasks.length} tasks`}
            />

            {/* Clear All Tasks Button */}
            {tasks.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={clearAllTasks}
                    >
                        Clear All Tasks
                    </Button>
                </Box>
            )}

            {/* Task Input Form */}
            <Box 
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newTask.title.trim()) {
                        handleAddTask({
                            title: newTask.title,
                            description: newTask.description,
                            completed: false
                        });
                        setNewTask({ title: '', description: '' });
                    }
                }}
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    pt: 1,
                    pb: 2
                }}
            >
                <TextField
                    label="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                />
                <TextField
                    label="Description (Optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    multiline
                    rows={2}
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ 
                        alignSelf: 'flex-end',
                        bgcolor: palette.primary.main,
                        '&:hover': {
                            bgcolor: palette.primary.dark,
                        }
                    }}
                >
                    Add Task
                </Button>
            </Box>

            {/* Task List Content */}
            <Box
                display="grid"
                gap="1.5rem"
                sx={{
                    gridTemplateColumns: { 
                        xs: "1fr", 
                        sm: "repeat(2, 1fr)", 
                        md: "repeat(3, 1fr)" 
                    },
                    gridAutoRows: "minmax(120px, auto)",
                    pb: 2,
                    flex: 1,
                    overflow: "auto"
                }}
            >
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <Box
                          key={index}
                          display="flex"
                          flexDirection="column"
                          p="1rem"
                          border={`1px solid ${palette.divider}`}
                          borderRadius="4px"
                          sx={{
                            bgcolor: task.completed ? palette.secondary.light : palette.primary.light,
                            opacity: task.completed ? 0.7 : 1
                          }}
                        >
                          <Box display="flex" alignItems="center" gap="1rem" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap="1rem">
                              <Checkbox 
                                checked={task.completed || false}
                                onChange={() => toggleTaskCompletion(index)}
                                sx={{
                                  color: palette.secondary.main,
                                  '&.Mui-checked': {
                                    color: palette.primary.dark,
                                  },
                                }}
                              />
                              <Typography variant="h6" color={palette.text.primary}>
                                {task.title}
                              </Typography>
                            </Box>
                            <IconButton 
                              aria-label="delete task" 
                              onClick={() => deleteTask(index)}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                          <Typography 
                            variant="body2" 
                            color={palette.text.secondary}
                            mt="0.5rem"
                          >
                            {task.description}
                          </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography 
                        variant="h6" 
                        textAlign="center"
                        gridColumn="1 / -1"
                        color={palette.text.secondary}
                    >
                        No tasks yet. Add your first task!
                    </Typography>
                )}
            </Box>
        </DashboardBox>
    );
};

export default Row1;

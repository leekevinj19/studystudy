import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTimerSettings } from '../../context/TimerSettingsContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useTimerSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usersJSON = localStorage.getItem('registeredUsers');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const user = users.find((u: { username: string; password: string }) => u.username === username && u.password === password);

    if (user) {
      setError('');
      login();
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      padding="2rem"
    >
      <Typography variant="h4" mb={3}>
        User Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '300px' }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} width="300px">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
      <Typography mt={2}>
        Don't have an account?{' '}
        <Link to="/register" style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}>
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;

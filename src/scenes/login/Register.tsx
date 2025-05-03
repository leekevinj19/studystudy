import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  password: string;
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }

    const usersJSON = localStorage.getItem('registeredUsers');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      setError('Username already exists');
      setSuccess('');
      return;
    }

    const newUser: User = { username, password };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    setError('');
    setSuccess('Registration successful! You can now login.');
    setUsername('');
    setPassword('');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
        User Registration
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '300px' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2, width: '300px' }}>
          {success}
        </Alert>
      )}
      <Box component="form" onSubmit={handleRegister} width="300px">
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
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;

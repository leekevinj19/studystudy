import { useMemo } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "./scenes/navbar";
import Dashboard from "./scenes/dashboard";
import Tasklist from "./scenes/tasklist";
import Timer from "./scenes/timer";
import { TimerSettingsProvider, useTimerSettings } from "./context/TimerSettingsContext";
import LoginScene from "./scenes/login/LoginScene";
import Register from "./scenes/login/Register";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useTimerSettings();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TimerSettingsProvider>
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/timer"
                  element={
                    <PrivateRoute>
                      <Timer />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tasklist"
                  element={
                    <PrivateRoute>
                      <Tasklist />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<LoginScene />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Box>
          </TimerSettingsProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

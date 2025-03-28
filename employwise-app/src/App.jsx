import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from "@mui/material";

// Lazy Load Pages for Better Performance
const Login = lazy(() => import("./pages/Login"));
const UsersList = lazy(() => import("./pages/UsersList"));
const EditUser = lazy(() => import("./pages/EditUser"));

// Private Route Component
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" replace />;
};

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline /> {/* Ensures consistent light mode */}
      <Router>
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <CircularProgress size={60} />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

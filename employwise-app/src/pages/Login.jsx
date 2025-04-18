import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, CircularProgress, Box } from "@mui/material";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/users");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #2196f3, #4caf50)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 6px 16px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome Back! 👋
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: "10px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;

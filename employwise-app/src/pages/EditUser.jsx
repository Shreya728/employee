import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => {
        if (response.data && response.data.data) {
          setUser(response.data.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user", error);
        toast.error("Failed to fetch user data.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user.first_name.trim() || !user.last_name.trim() || !validateEmail(user.email)) {
      toast.error("Please enter valid details!");
      return;
    }

    try {
      const response = await axios.patch(`https://reqres.in/api/users/${id}`, user);

      if (response.status === 200) {
        toast.success("User updated successfully!");
        setUser({ ...user, ...response.data }); // Simulate the update
        setTimeout(() => navigate("/users"), 1000); 
      } else {
        throw new Error("Failed to update user.");
      }
    } catch (error) {
      toast.error("Error updating user.");
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return loading ? (
    <Typography variant="h6" align="center">Loading...</Typography>
  ) : (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center">Edit User</Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="First Name"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            error={user.email && !validateEmail(user.email)}
            helperText={user.email && !validateEmail(user.email) ? "Enter a valid email" : ""}
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditUser;

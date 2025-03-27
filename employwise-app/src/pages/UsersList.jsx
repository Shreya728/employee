import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Grid, Card, CardContent, Avatar, Typography, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, Pagination, Box
} from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

// ✅ Styled Components
const Background = styled(Box)({
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #f6f8fa, #e0eafc)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "50px",
});

const Navbar = styled(Box)({
  width: "100vw",
  backgroundColor: "#0077cc",
  padding: "15px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  position: "fixed",
  top: 0,
  zIndex: 1000,
});

const SearchContainer = styled(Box)({
  width: "100vw",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "20px 10%",
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
});

const GlassCard = styled(Card)({
  padding: "20px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": { transform: "scale(1.05)", boxShadow: "0px 6px 18px rgba(0,0,0,0.3)" },
});

const StyledButton = styled(Button)({
  textTransform: "none",
  borderRadius: "25px",
  transition: "all 0.3s ease",
  "&:hover": { transform: "translateY(-2px)" },
});

const AnimatedAvatar = styled(Avatar)({
  width: 80,
  height: 80,
  margin: "auto",
  border: "3px solid #00aaff",
  transition: "all 0.3s ease",
  "&:hover": { transform: "scale(1.1)", borderColor: "#0077cc" },
});

// ✅ Main Component
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      toast.success("User deleted successfully!");
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleUpdate = async () => {
    if (!editUser?.first_name.trim() || !editUser?.last_name.trim() || !validateEmail(editUser?.email)) {
      toast.error("Please enter valid details!");
      return;
    }
    try {
      await axios.put(`https://reqres.in/api/users/${editUser.id}`, editUser);
      toast.success("User updated successfully!");
      setUsers(users.map(user => (user.id === editUser.id ? { ...user, ...editUser } : user)));
      setEditUser(null);
    } catch (error) {
      toast.error("Error updating user.");
    }
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully!");
    navigate("/");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Background>
      <Navbar>
        <Typography fontWeight="bold" fontSize="22px" color="#fff">
          EmployWise
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="error">
          Logout
        </Button>
      </Navbar>

      <Box height="80px" />

      <SearchContainer>
        <SearchIcon style={{ color: "#555" }} />
        <TextField
          fullWidth
          label="Search Users..."
          variant="outlined"
          sx={{ marginLeft: 1, borderRadius: "8px", background: "white" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <GlassCard>
                <AnimatedAvatar src={user.avatar} />
                <CardContent>
                  <Typography align="center" fontWeight="bold">
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography align="center" color="textSecondary">
                    {user.email}
                  </Typography>
                  <Grid container spacing={1} justifyContent="center" mt={2}>
                    <Grid item>
                      <StyledButton variant="contained" startIcon={<EditIcon />} onClick={() => setEditUser(user)}>
                        Edit
                      </StyledButton>
                    </Grid>
                    <Grid item>
                      <StyledButton variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(user.id)}>
                        Delete
                      </StyledButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} sx={{ marginTop: "20px" }} />

      {/* ✅ Updated Edit User Modal */}
      <Dialog open={Boolean(editUser)} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="First Name" value={editUser?.first_name || ""} onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Last Name" value={editUser?.last_name || ""} onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" value={editUser?.email || ""} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Background>
  );
};

export default UsersList;

import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle API requests with error handling
const request = async (method, url, data = null, params = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`API Error (${method.toUpperCase()} ${url}):`, error);
    throw error.response?.data || { message: "An error occurred" };
  }
};

// API functions
export const fetchUsers = (page = 1) => request("get", "/users", null, { page });
export const getUserById = (id) => request("get", `/users/${id}`);
export const createUser = (data) => request("post", "/users", data);
export const updateUser = (id, data) => request("put", `/users/${id}`, data);
export const deleteUser = (id) => request("delete", `/users/${id}`);
export const login = (credentials) => request("post", "/login", credentials);

// Export all functions as an object
const apiService = {
  fetchUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};

export default apiService;

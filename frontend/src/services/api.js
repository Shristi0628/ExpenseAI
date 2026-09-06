import axios from "axios";

const api = axios.create({
  baseURL: "https://expenseai-backend-n9g6.onrender.com",
});

export default api;
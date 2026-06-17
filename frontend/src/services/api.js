import axios from "axios";

const API = axios.create({
  baseURL: "https://expensetracker-1-dqim.onrender.com/expenses"
});

export default API;
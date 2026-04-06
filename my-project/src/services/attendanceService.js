import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/attendance",
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// USER
export const checkIn = () => API.post("/checkin");
export const checkOut = () => API.post("/checkout");
export const getMyAttendance = () => API.get("/my");

// ADMIN
export const getAllAttendance = (params) =>
  API.get("/all", { params });

export const getStats = () =>
  API.get("/stats");

export const getMonthlyReport = (month) =>
  API.get(`/monthly-report?month=${month}`);
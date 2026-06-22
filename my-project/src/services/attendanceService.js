import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-api.iatlasstudy.com/api/v1/attendance",
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// USER
export const checkIn = async () => {
   console.log("CHECKIN FUNCTION HIT");
  const ipResponse = await fetch("https://api.ipify.org?format=json");
  const { ip } = await ipResponse.json();
  // console.log("IP:", ip);
  return API.post(
    "/checkin",
    {},
    {
      headers: {
        "x-client-ip": ip,
      },
    }
  );
};
export const checkOut = () => API.post("/checkout");
export const getMyAttendance = () => API.get("/my");

// ADMIN
export const getAllAttendance = (params) =>
  API.get("/all", { params });

export const getStats = () =>
  API.get("/stats");

export const getMonthlyReport = (month) =>
  API.get(`/monthly-report?month=${month}`);
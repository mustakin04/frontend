import axios from "axios";

const API = "https://crm-api.iatlasstudy.com/api/v1/users";

const getToken = () => {
  return localStorage.getItem("token");
};

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});


// ======================
// Get Logged In User
// ======================

export const getMyProfile = async () => {
  const res = await axios.get(
    `${API}/get-me`,
    getConfig()
  );
console.log(res.data)
  return res.data;
};


// ======================
// Update Profile
// ======================

export const updateProfile = async (data) => {
  const res = await axios.patch(
    `${API}/update-profile`,
    data,
    getConfig()
  );

  return res.data;
};
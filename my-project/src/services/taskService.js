import axios from "axios";

const API =
  "https://crm-api.iatlasstudy.com/api/v1/task";

const getAuthConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  };
};
export const getAllTasks = async () => {
  const res = await axios.get(
    API,
    getAuthConfig()
  );

  return res.data;
};
export const createTask = async (
  data
) => {
  const res = await axios.post(
    API,
    data,
    getAuthConfig()
  );

  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axios.get(
    `${API}/${id}`,
    getAuthConfig()
  );

  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await axios.patch(
    `${API}/${id}`,
    data,
    getAuthConfig()
  );

  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    getAuthConfig()
  );

  return res.data;
};
  export const getMyTasks = async () => {
  const res = await axios.get(
    "https://crm-api.iatlasstudy.com/api/v1/task/my-tasks",
    getAuthConfig()
  );

  return res.data;
};

export const getTaskDetails = async (id) => {
  const res = await axios.get(
    `${API}/${id}`,
    getAuthConfig()
  );

  return res.data;
};

  export const getUsers =
  async () => {
    const res =
      await axios.get(
        "https://crm-api.iatlasstudy.com/api/v1/users"
      );

    return res.data;
  };
 export const updateTaskStatus =
  async (
    id,
    status
  ) => {
    const res =
      await axios.patch(
        `${API}/${id}/status`,
        {
          status,
        },
        getAuthConfig()
      );

    return res.data;
  };
export const addComment =
  async (id, comment) => {
    const res =
      await axios.post(
        `${API}/${id}/comment`,
        { comment },
        getAuthConfig()
      );

    return res.data;
  };

export const getComments =
  async (id) => {
    const res =
      await axios.get(
        `${API}/${id}/comments`,
        getAuthConfig()
      );

    return res.data;
  };
  export const getActivityLogs =
  async (id) => {
    const res =
      await axios.get(
        `${API}/${id}/activity`,
        getAuthConfig()
      );

    return res.data;
  };
  export const getDashboardStats =
  async () => {
    const res =
      await axios.get(
        `${API}/dashboard/stats`,
        getAuthConfig()
      );

    return res.data;
  };
  export const getPerformanceReport =
  async () => {
    const res =
      await axios.get(
        `${API}/performance-report`,
        getAuthConfig()
      );

    return res.data;
  };
  export const getAllActivityLogs =
  async () => {

    const res =
      await axios.get(
        "https://crm-api.iatlasstudy.com/api/v1/task/activity",
        getAuthConfig()
      );

    return res.data;
};
export const getTaskHistory =
  async () => {
    const res =
      await axios.get(
        `${API}/history`,
        getAuthConfig()
      );

    return res.data;
  };

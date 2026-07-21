import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts & Pages
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leads from "./pages/Sales/Leads";
import Clients from "./pages/Sales/Clients";
import Transactions from "./pages/Services/Transactions";
import Applications from "./pages/Services/Applications";
import Login from "./pages/Auth/Login";

// Protected Route

import Register from "./pages/Auth/Register";
import PrivateRoute from "./router/PrivateRoute";
import AddLeadModal from "./components/Modals/AddLeadModal";
import AddClientModal from "./components/Modals/AddClientModal";
import ExternalClients from "./pages/Sales/ExternalClients";
import AddExternalClientModal from "./components/Modals/AddExternalClientModal";
import AddTransactionModal from "./components/Modals/AddTransactionModal";
import ApplicationModal from "./components/Modals/ApplicationModal";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UpdateClientModal from "./components/Modals/UpdateClientModal";
import EditTransactionModal from "./components/Modals/EditTransactionModal";
import UpdateApplicationModal from "./components/Modals/UpdateApplicationModal";
import UpdateExternalClientModal from "./components/Modals/UpdateExternalClientModal";
import AddCSVUpload from "./components/Modals/AddCSVUpload";
import AttendancePage from "./pages/Attendance/AttendancePage";
import AdminAttendance from "./pages/Attendance/AdminAttendance";
import { Navigate } from "react-router-dom";
import CampaignLeadsTable from "./components/Tables/CampaignLeadTable";
import TaskDashboard from "./pages/Task/TaskDashboard";
import MyTasks from "./pages/Task/MyTasks";
import AllTasks from "./pages/Task/AllTasks";
import CreateTask from "./pages/Task/CreateTask";
import Reports from "./pages/Task/Reports";
import CompletedTasks from "./pages/Task/CompletedTasks";
import TaskDetails from "./pages/Task/TaskDetails";
import ActivityLogs from "./pages/Task/ActivityLogs";
import EditTask from "./pages/Task/EditTask";
import TaskHistory from "./pages/Task/TaskHistory";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path:"/forgot-password", element: <ForgotPassword/>},
    { path:"/reset-password", element: <ResetPassword/>},
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "/dashboard", element: <DashboardPage /> },

        // Sales
        { path: "/dashboard/sales/leads", element: <Leads /> },
        { path: "/dashboard/sales/leadsUplodad", element: <AddCSVUpload /> },
        { path: "/dashboard/sales/clients", element: <Clients /> },
        {
          path: "/dashboard/sales/clients/addClient",
          element: <AddClientModal />,
        },
        {
          path: "sales/clients/updateClient/:id",
          element: <UpdateClientModal></UpdateClientModal>,
        },
        { path: "/dashboard/sales/external", element: <ExternalClients /> },
        {
          path: "/dashboard/sales/external/addExternalClient",
          element: <AddExternalClientModal />,
        },
        {
          path: "/dashboard/sales/external/updateExternalClient/:id",
          element: <UpdateExternalClientModal />,
        },

        // Services
        { path: "/dashboard/services/transactions", element: <Transactions /> },
        {
          path: "/dashboard/services/transaction/updateTransaction/:id",
          element: <EditTransactionModal></EditTransactionModal>,
        },
        {
          path: "/dashboard/services/transactions/addtransaction",
          element: <AddTransactionModal />,
        },
        { path: "/dashboard/services/applications", element: <Applications /> },
        {
          path: "/dashboard/services/applications/updateAplicaiton/:id",
          element: <UpdateApplicationModal />,
        },
        {
          path: "/dashboard/services/applications/addapplication",
          element: <ApplicationModal />,
        },
        // Attendance
        {
          path: "/dashboard/attendance",
          element:
            user?.role === "admin" ? (
              <Navigate to="/dashboard/admin/attendance" />
            ) : (
              <AttendancePage />
            ),
        },
        {
          path: "/dashboard/admin/attendance",
          element: <AdminAttendance />,
        },

        // Task Management

        {
          path: "/dashboard/task-management",
          element:
            user?.role === "admin" ? (
              <TaskDashboard></TaskDashboard>
            ) : (
              <MyTasks></MyTasks>
            ),
        },

        // Admin Routes

        {
          path: "/dashboard/task-management/all",
          element: <AllTasks />,
        },

        {
          path: "/dashboard/task-management/create",
          element: <CreateTask />,
        },

        {
          path: "/dashboard/task-management/activity",
          element: <ActivityLogs />,
        },

        {
          path: "/dashboard/task-management/reports",
          element: <Reports />,
        },

        // Employee Routes

        {
          path: "/dashboard/task-management/my-tasks",
          element: <MyTasks></MyTasks>,
        },

        {
          path: "/dashboard/task-management/completed",
          element: <CompletedTasks />,
        },
        {
          path: "/dashboard/task-management/edit/:id",
          element: <EditTask />,
        },

        {
          path: "/dashboard/task-management/history",
          element: <TaskHistory />,
        },

        // Common
        {
          path: "/dashboard/task-management/:id",
          element: <TaskDetails></TaskDetails>,
        },
        {
          path: "/dashboard/campaignlead",
          element: <CampaignLeadsTable />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

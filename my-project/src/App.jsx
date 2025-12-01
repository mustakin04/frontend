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

function App() {
  const router = createBrowserRouter([
    {
    path: "/register",
    element: <Register />,
  },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "/", element: <Dashboard /> },

        // Sales
        { path: "/sales/leads", element: <Leads /> },
        { path: "/sales/clients", element: <Clients /> },
        { path: "/sales/clients/addClient", element: <AddClientModal /> },

        // Services
        { path: "/services/transactions", element: <Transactions /> },
        { path: "/services/applications", element: <Applications /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

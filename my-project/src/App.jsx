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
import ApplicationModal from './components/Modals/ApplicationModal';
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UpdateClientModal from './components/Modals/UpdateClientModal';
import EditTransactionModal from "./components/Modals/EditTransactionModal";
import UpdateApplicationModal from "./components/Modals/UpdateApplicationModal";

function App() {
  const router = createBrowserRouter([
    {
    path: "/",
    element: <Register />,
  },
    {
      path: "/login",
      element: <Login />,
    },
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
        { path: "/dashboard/sales/clients", element: <Clients /> },
        { path: "/dashboard/sales/clients/addClient", element: <AddClientModal /> },
        {path:"sales/clients/updateClient/:id",element:<UpdateClientModal></UpdateClientModal>},
        {path:"/dashboard/sales/external" ,element:<ExternalClients/>},
        {path:"/dashboard/sales/external/addExternalClient" ,element:<AddExternalClientModal/>},

        // Services
        { path: "/dashboard/services/transactions", element: <Transactions /> },
        {path:"/dashboard/services/transaction/updateTransaction/:id",element :<EditTransactionModal></EditTransactionModal>},
        { path: "/dashboard/services/transactions/addtransaction", element: <AddTransactionModal /> },
        { path: "/dashboard/services/applications", element: <Applications /> },
        { path:"/dashboard/services/applications/updateAplicaiton/:id",element:<UpdateApplicationModal/>},
        { path:"/dashboard/services/applications/addapplication",element:<ApplicationModal/>},
         
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

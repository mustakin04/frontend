import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  Briefcase,
  CreditCard,
  FileText,
} from "lucide-react";
import LeadCards from "../../components/Dashboard/LeadCards";
import ClientCards from "../../components/Dashboard/ClientCards";
import axios from "axios";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const [lead, setLead] = useState(0);
  const [client, setClient] = useState(0);
  const [externalClient, setExternalClient] = useState(0);
   const [transactions, setTransactions] = useState(0);
   const [applications,setApplications]=useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/lead/getLeadCount",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setLead(res.data.totalLeads);
      } catch (error) {
        console.error("Lead fetch error:", error);
      }
    };

    fetchLead();
  }, []);
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/client/getClientCount",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setClient(res.data.totalClients);
      } catch (error) {
        console.error("Lead fetch error:", error);
      }
    };

    fetchClient();
  }, []);
  useEffect(() => {
    const fetchExternalClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/v1/externalClient/getExternalClients",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );
        setExternalClient(res.data.count);
      } catch (err) {
        console.error("Failed to fetch external clients:", err);
      }
    };
    fetchExternalClients();
  }, []);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/v1/transaction/getTransactions",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        console.log(res.data, "API Response");

        // FIXED
        setTransactions(res.data.count);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, []); // FIXED: added dependency array

   useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/v1/application/getapplications",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        console.log(res.data, "API Response");

        // same as code-1
        setApplications(res.data.count);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchData();
  }, []); // same as code-1

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {/* Total Leads */}
        <div
          className="bg-white p-6 shadow-md rounded-2xl border hover:shadow-xl transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/dashboard/sales/leads")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition">
              <Users className="size-6 text-blue-600" />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Total Leads</h3>
              <p className="text-3xl font-bold mt-1">{lead}</p>
            </div>
          </div>
        </div>

        {/* Total Clients */}
        <div
          className="bg-white p-6 shadow-md rounded-2xl border hover:shadow-xl transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/dashboard/sales/clients")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-50 group-hover:bg-green-100 transition">
              <UserCheck className="size-6 text-green-600" />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Total Clients</h3>
              <p className="text-3xl font-bold mt-1">{client}</p>
            </div>
          </div>
        </div>

        {/* External Clients */}
        <div
          className="bg-white p-6 shadow-md rounded-2xl border hover:shadow-xl transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/dashboard/sales/external")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition">
              <Briefcase className="size-6 text-purple-600" />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">External Clients</h3>
              <p className="text-3xl font-bold mt-1">{externalClient}</p>
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div
          className="bg-white p-6 shadow-md rounded-2xl border hover:shadow-xl transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/dashboard/services/transactions")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-50 group-hover:bg-yellow-100 transition">
              <CreditCard className="size-6 text-yellow-600" />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Total Transactions</h3>
              <p className="text-3xl font-bold mt-1">{transactions}</p>
            </div>
          </div>
        </div>

        {/* Total Applications */}
        <div
          className="bg-white p-6 shadow-md rounded-2xl border hover:shadow-xl transition-all duration-300 group cursor-pointer"
          onClick={() => navigate("/dashboard/services/applications")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-50 group-hover:bg-red-100 transition">
              <FileText className="size-6 text-red-600" />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Total Applications</h3>
              <p className="text-3xl font-bold mt-1">{applications}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-2xl border">
        <div className="flex w-full gap-10">
          <div className="w-[50%] h-[800px] overflow-hidden overflow-y-scroll">
            <h2 className="text-2xl font-semibold mb-4">Recent Leads</h2>
            <LeadCards></LeadCards>
          </div>
          <div className="w-[50%] h-[800px] overflow-hidden overflow-y-scroll">
            <h2 className="text-2xl font-semibold mb-4">Recent Clients</h2>
            <ClientCards></ClientCards>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

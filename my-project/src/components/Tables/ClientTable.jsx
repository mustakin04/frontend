import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import clsx from "clsx";
import { Link } from "react-router";
import axios from "axios";
import ViewClientModal from "../Modals/ViewClientModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";

const ClientTable = ({ clients }) => {
  const [show, setShow] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [getData, setGetData] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deletedID, setDeletedID] = useState(null);
  const [confirmTextValue, setConfirmTextValue] = useState("");

  const handleClick = (id) => {
    setSelectedID(id);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setSelectedID(null);
    setGetData(null);
  };

  useEffect(() => {
    if (!selectedID) return;

    const fetchSingleClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/v1/client/getSingleClient/${selectedID}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        setGetData(res.data?.data || res.data);
      } catch (err) {
        console.log("Error loading single client:", err);
      }
    };

    fetchSingleClient();
  }, [selectedID]);

  const handleDeleted = (id) => {
    setDeletedID(id);
    setDeleteShow(true);
    setConfirmTextValue(""); // input clear
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:3000/api/v1/client/deleted/${deletedID}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      // console.log("Delete success:", res.data);
      setDeleteShow(false);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            <tr>
              {[
                "#", // Row number
                "Full Name",
                "Last Name",
                "Email",
                "Phone",
                "Emergency Contact",
                "Emergency Phone",
                "Nationality",
                "Passport",
                "DOB",
                "Civil Status",
                "Current Location",
                "Address",
                "Police Station",
                "District",
                "Responsible Type",
                "Pref Service",
                "Stage",
                "Type",
                "Responsible",
                "Ref Type",
                "Referred By",
                "Next Action",
                "Next Action Date",
                "Agent Promo",
                "Active",
                "Description",
                "Account",
                "Entity",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {clients.map((client, idx) => (
              <tr
                key={client._id || idx}
                className={clsx(
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                  "hover:bg-indigo-50 transition-colors duration-200"
                )}
              >
                <td className="px-6 py-4">{idx + 1}</td> {/* Row number */}
                <td className="px-6 py-4 truncate">{client.firstName}</td>
                <td className="px-6 py-4 truncate">{client.lastName}</td>
                <td className="px-6 py-4 truncate">{client.email}</td>
                <td className="px-6 py-4 truncate">{client.phone}</td>
                <td className="px-6 py-4 truncate">{client.emergencyContact}</td>
                <td className="px-6 py-4 truncate">{client.emergencyPhone}</td>
                <td className="px-6 py-4 truncate">{client.nationality}</td>
                <td className="px-6 py-4 truncate">{client.passport}</td>
                <td className="px-6 py-4 truncate">{client.dob}</td>
                <td className="px-6 py-4 truncate">{client.civilStatus}</td>
                <td className="px-6 py-4 truncate">{client.currentLocation}</td>
                <td className="px-6 py-4 truncate">{client.address}</td>
                <td className="px-6 py-4 truncate">{client.policeStation}</td>
                <td className="px-6 py-4 truncate">{client.district}</td>
                <td className="px-6 py-4 truncate">{client.responsibleType}</td>
                <td className="px-6 py-4 truncate">{client.prefService}</td>
                <td className="px-6 py-4 truncate">{client.stage}</td>
                <td className="px-6 py-4 truncate">{client.type}</td>
                <td className="px-6 py-4 truncate">{client.responsible}</td>
                <td className="px-6 py-4 truncate">{client.refType}</td>
                <td className="px-6 py-4 truncate">{client.referredBy}</td>
                <td className="px-6 py-4 truncate">{client.nextAction}</td>
                <td className="px-6 py-4 truncate">{client.nextActionDate}</td>
                <td className="px-6 py-4 truncate">{client.agentPromo}</td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                      client.active === "Yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {client.active}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-[220px] break-words">{client.description}</td>
                <td className="px-6 py-4">{client.account}</td>
                <td className="px-6 py-4">{client.entity}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleClick(client._id)}
                  >
                    <FiEye />
                  </button>

                  <Link
                    to={`/dashboard/sales/clients/updateClient/${client._id}`}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FiEdit2 />
                  </Link>

                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 onClick={() => handleDeleted(client._id)} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-3xl w-full shadow-lg">
            <ViewClientModal client={getData} onClose={closeModal} />
          </div>
        </div>
      )}

      {deleteShow && (
        <DeleteConfirmationModal
          title="Only admins can delete this client"
          message="Type"
          confirmText="deleted"
          inputValue={confirmTextValue}
          setInputValue={setConfirmTextValue}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteShow(false)}
        />
      )}
    </div>
  );
};

export default ClientTable;

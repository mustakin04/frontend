import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 ,FiEye} from "react-icons/fi";
import clsx from "clsx";
import axios from "axios";
import ViewLeadModal from "../Modals/ViewLeadModal";
import UpdateLeadModal from "../Modals/UpdateLeadModal";
import DeleteLeadModal from "../Modals/DeleteLeadModal";

const LeadTable = ({ leads }) => {
  const headers = [
    "#", // নতুন column for row number
    "Lead Owner",
    "Account",
    "Entity",
    "First Name",
    "Last Name",
    "DOB",
    "Passport",
    "Nationality",
    "Civil Status",
    "Email",
    "Phone",
    "Emergency Contact",
    "Emergency Phone",
    "Current Location",
    "Address",
    "Police Station",
    "District",
    "Responsible Type",
    "Pref Service",
    "First Service Pref",
    "Second Service Pref",
    "Campaign Code",
    "Stage",
    "Type",
    "Responsible",
    "Referral Type",
    "Referred By",
    "Next Action",
    "Next Action Date",
    "Agent Promo",
    "Active",
    "Description",
    "Actions",
  ];
   const [showEye,setShowEye]=useState(false)
   const [eyeID,setEyeID]=useState(null)
   const [eyeData,setEyeData]=useState(null)
   const [showEdit,setShowEdit]=useState(false)
   const [editId,seteditID]=useState(null)
   const[deleteShow,setDeleteShow]=useState(false)
   const [deleteID,setDeleteID]=useState(null)
   const [confirm,setConfirm]=useState("")
  const closeModal = () => {
    setShowEye(false);
    setEyeID(null);
    setEyeData(null);
  };

   const handleEye=(id)=>{
        // console.log(id,'dsljal')
       setShowEye(true)
       setEyeID(id)
   }
  useEffect(() => {
    if (!eyeID) return;

    const fetchSingleClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/v1/lead/getSingleLead/${eyeID}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );
      //  console.log(res,"lead")
        setEyeData(res.data?.lead || res.data);
      } catch (err) {
        console.log("Error loading single client:", err);
      }
    };

    fetchSingleClient();
  }, [eyeID]);

  const closeEditModal = () => {
  setShowEdit(false);
  seteditID(null);
  
};
  const handleEdit=async(id)=>{
       setShowEdit(true)
       seteditID(id)
  }
  const closeDeleted=()=>{
    setDeleteShow(false)
  }
  const handleDeleted=(id)=>{
        setDeleteShow(true)
        setDeleteID(id)
  }
  // console.log(eyeData,"eyedata")
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {leads && leads.length > 0 ? (
            leads.map((lead, idx) => (
              <tr
                key={lead.id || idx}
                className={clsx(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td> {/* Row number */}
                <td className="px-6 py-4 whitespace-nowrap">{lead.leadOwner}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.account}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.entity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.dob}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.passport}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.civilStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.emergencyContact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.emergencyPhone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.currentLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.policeStation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.district}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.responsibleType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.prefService}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.firstServicePref}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.secondServicePref}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.campaignCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.responsible}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.refType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.referredBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.nextAction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.nextActionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.agentPromo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.active}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.description}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="text-green-500 hover:text-green-700"
                  onClick={()=>handleEye(lead._id)}>
                    <FiEye />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700"
                  onClick={()=>handleEdit(lead._id)}>
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700"
                  onClick={()=>handleDeleted(lead._id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-6 text-center text-gray-500">
                No Leads Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {
        showEye&&( <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-3xl w-full shadow-lg">
            <ViewLeadModal lead={eyeData} onClose={closeModal}></ViewLeadModal>
          </div>
        </div>)
      }
      {
        showEdit&&(<UpdateLeadModal isOpen={showEdit} onClose={closeEditModal} id={editId} ></UpdateLeadModal>)
      }
      {
  deleteShow && (
    <DeleteLeadModal
      deleteID={deleteID}
      onCancel={closeDeleted}
      confirmText="delete"
      inputValue={confirm}
      setInputValue={setConfirm}
    />
  )
}

    </div>
  );
};

export default LeadTable;

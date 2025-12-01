import React from "react";

const ViewClientModal = ({ isOpen, onClose, client }) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Client Details</h2>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">Name: </span>
            {client.name}
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            {client.phone}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {client.email}
          </div>
          <div>
            <span className="font-semibold">Country: </span>
            {client.country}
          </div>
          <div>
            <span className="font-semibold">Visa Type: </span>
            {client.visaType}
          </div>
          <div>
            <span className="font-semibold">Passport Number: </span>
            {client.passportNumber}
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            {client.status}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewClientModal;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

const AddCSVUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://crm-api.iatlasstudy.com/api/v1/lead/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(`Imported ${res.data.totalInserted} leads successfully`);

      setTimeout(() => {
        navigate("/dashboard/sales/leads"); // lead list page
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
           <div>
             <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Upload className="w-8 h-8" />
              CSV Lead Upload
            </h1>
            
            <p className="text-blue-100 mt-2">
              Import your leads quickly and efficiently
            </p>
           </div>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-2 text-white/90 hover:text-white text-sm"
            >
              ← Back
            </button>
          </div>
       
          {/* Content */}
          <div className="p-8">
            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select CSV File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="text-center">
                    {file ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                        <p className="text-sm font-medium text-gray-700">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="w-12 h-12 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to browse or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">CSV files only</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Selected File Info */}
            {file && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-green-700">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload CSV
                </>
              )}
            </button>

            {/* Info Section */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                📋 Upload Instructions
              </h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Ensure your CSV file has the correct format</li>
                <li>• Maximum file size: 10MB</li>
                <li>• Supported format: .csv only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddCSVUpload;

import { useEffect, useState } from "react";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import Papa from "papaparse";

const CampaignLeadsTable = () => {
  const [leads, setLeads] = useState([]);

  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedUniversity, setSelectedUniversity] =useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(
          "https://api.iatlasstudy.com/api/lead/getleads"
        );

        setLeads(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeads();
  }, []);

  // Unique Programs
  const programs = [
    ...new Set(
      leads
        .map((lead) => lead.program)
        .filter(Boolean)
    ),
  ];
  const universities = [
  ...new Set(
    leads
      .map((lead) => lead.university)
      .filter(Boolean)
  ),
];
  // Multi Filter
  const filteredLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.createdAt);

    const matchesProgram =
      !selectedProgram || lead.program === selectedProgram;
    const matchesUniversity =
  !selectedUniversity ||
  lead.university?.trim() === selectedUniversity.trim();
  console.log(
  lead.university,
  selectedUniversity,
  lead.university === selectedUniversity
);
    const matchesDate =
      (!fromDate || leadDate >= new Date(fromDate)) &&
      (!toDate ||
        leadDate <= new Date(`${toDate}T23:59:59`));

    return matchesProgram && matchesDate &&
  matchesUniversity;
  });

  // CSV Download
  const downloadCSV = () => {
    const formattedData = filteredLeads.map((lead) => ({
      "First Name": lead.name,
      Phone: lead.phone,
      Address: lead.location,
      Passport: lead.passport,
      "Highest Education": lead.background,
      Description: lead.gpa,
      Age: lead.age,
      Program: lead.program,
      "Interested Subject": lead.subject,
      Date: new Date(lead.createdAt).toLocaleDateString(),
    }));

    const csv = Papa.unparse(formattedData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "filtered-leads.csv";
    link.click();
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 items-center mb-4">
        <h2 className="text-xl font-bold">
          Campaign Leads ({filteredLeads.length})
        </h2>

        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          <FiDownload />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={selectedProgram}
          onChange={(e) =>
            setSelectedProgram(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">All Programs</option>

          {programs.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>

        <select
  value={selectedUniversity}
  onChange={(e) =>
    setSelectedUniversity(e.target.value)
  }
  className="border p-2 rounded"
>
  <option value="">
    All Universities
  </option>

  {universities.map((university) => (
    <option
      key={university}
      value={university}
    >
      {university}
    </option>
  ))}
</select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        <button
          onClick={() => {
  setSelectedUniversity("");
  setSelectedProgram("");
  setFromDate("");
  setToDate("");
}}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Passport</th>
              <th className="border p-2">
                Highest Education
              </th>
              <th className="border p-2">
                Description
              </th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Program</th>
              <th className="border p-2">
                Interested Subject
              </th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="text-center"
                >
                  <td className="border p-2">
                    {lead.name}
                  </td>
                  <td className="border p-2">
                    {lead.phone}
                  </td>
                  <td className="border p-2">
                    {lead.location}
                  </td>
                  <td className="border p-2">
                    {lead.passport}
                  </td>
                  <td className="border p-2">
                    {lead.background}
                  </td>
                  <td className="border p-2">
                    {lead.gpa}
                  </td>
                  <td className="border p-2">
                    {lead.age}
                  </td>
                  <td className="border p-2">
                    {lead.program}
                  </td>
                  <td className="border p-2">
                    {lead.subject}
                  </td>
                  <td className="border p-2">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center p-4"
                >
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignLeadsTable;
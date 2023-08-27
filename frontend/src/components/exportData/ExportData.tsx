import React, { useState } from "react";
import "./ExportData.css";
import { useData } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ExportRequests = ({ onExport }: { onExport: () => void }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { exportData } = useData();

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleExportClick = async () => {
    try {
      const response = await exportData(fromDate, toDate);

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported_requests.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        Swal.fire({
          icon: "success",
          title: "Request created successfully",
          showConfirmButton: false,
          timer: 1500,
          // willClose: () => {
          //   navigate("/initiatorDashboard");
          // },
        });
        onExport();
      } else {
        console.error("Export request failed:", response.status);
        toast.error("Export request failed");
      }
    } catch (error) {
      console.error("Export request error:", error);
      toast.error("No request within the range");
    }
  };

  return (
    <div className="export-container">
      <div className="rehead">
        <h2>Export Requests</h2>
        <small>Select Date Range</small>
      </div>
      <div className="input-container">
        <label htmlFor="fromDate">From</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="toDate">To</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
      <button className="export-button" onClick={handleExportClick}>
        Fetch and export data
      </button>
      <ToastContainer />
    </div>
  );
};

export default ExportRequests;

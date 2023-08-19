import React, { useState } from "react";
import axios from "axios";
import "./ExportData.css";

const ExportRequests: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleExportClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/requests/export-requests`,
        {
          params: {
            fromDate: fromDate,
            toDate: toDate,
          },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported_requests.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Export request failed:", response.status);
      }
    } catch (error) {
      console.error("Export request error:", error);
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
    </div>
  );
};

export default ExportRequests;

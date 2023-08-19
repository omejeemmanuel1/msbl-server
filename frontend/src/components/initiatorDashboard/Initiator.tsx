import React from "react";
import "./Initiator.css"; // Import your CSS stylesheet here

interface ClientInfo {
  clientName: string;
  requestType: string;
  status: string;
  narration: string;
}

const Initiator: React.FC = () => {
  const clientList: ClientInfo[] = [
    {
      clientName: "OKEKE OBIECHINA CHIEDOZIE",
      requestType: "MERGER OF C...",
      status: "pending",
      narration: "KINDLY PROCESS MERGER",
    },
    {
      clientName: "JOHN DOE",
      requestType: "NEW INVESTMENT",
      status: "started",
      narration: "INVESTMENT OPPORTUNITY",
    },
    {
      clientName: "JANE SMITH",
      requestType: "WITHDRAWAL",
      status: "rejected",
      narration: "URGENT CASH NEED",
    },
    // Add more client info objects as needed
  ];

  return (
    <div className="initiator">
      {clientList.map((client, index) => (
        <div key={index} className="card">
          <p>Client Name{client.clientName}</p>
          <p>Request Type: {client.requestType}</p>
          <p>Status: {client.status}</p>
          <p>Narration: {client.narration}</p>
          <button className="view-button">View</button>
        </div>
      ))}
    </div>
  );
};

export default Initiator;

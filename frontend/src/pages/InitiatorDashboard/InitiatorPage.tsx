import React from "react";
import ExportRequests from "../../components/exportData/ExportData";
import InitiatorNav from "../../components/initiatorDashboard/InitiatorNav";
import Initiator from "../../components/initiatorDashboard/Initiator";

const InitiatorPage: React.FC = () => {
  return (
    <div>
      <InitiatorNav />
      <ExportRequests />
      <Initiator />
    </div>
  );
};

export default InitiatorPage;

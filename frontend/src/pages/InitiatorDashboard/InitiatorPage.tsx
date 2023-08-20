import React from "react";
import ExportRequests from "../../components/exportData/ExportData";
import InitiatorNav from "../../components/initiatorDashboard/InitiatorNav";
import Initiator from "../../components/initiatorDashboard/Initiator";
import SearchBar from "../../components/searchComponent/SearchBar";

const InitiatorPage: React.FC = () => {
  return (
    <div>
      <InitiatorNav />
      <SearchBar />
      <ExportRequests />
      <Initiator />
    </div>
  );
};

export default InitiatorPage;

import React from "react";
import "./Initiator.css"; // Import your CSS stylesheet here
import RequestCard from "../../request/requestCard";

const Initiator: React.FC = () => {
  return (
    <div className="initiator">
      <RequestCard />
    </div>
  );
};

export default Initiator;

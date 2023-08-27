import React, { useState } from "react";
import axios from "axios";
import "./request.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import loader from "../assets/reload.gif";

const CreateRequest = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    type: "",
    docURL: "",
    authURL: "",
    narration: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userToken = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/requests/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Request created successfully",
        showConfirmButton: false,
        timer: 1500,
        // willClose: () => {
        //   navigate("/initiatorDashboard");
        // },
      });
      onSuccess();
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        type: "",
        docURL: "",
        authURL: "",
        narration: "",
      });
    } catch (error: any) {
      console.error("Error creating request:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display the error message from the server
      } else {
        toast.error("An error occurred while processing your request."); // Display a generic error message
      }
    } finally {
      setLoading(false); // Set loading back to false after request completion
    }
  };

  return (
    <div className="form_container">
      <div className="request_form_container">
        {loading && (
          <div className="loader-overlay">
            <img src={loader} alt="Loading..." />
          </div>
        )}
        <form className="request_form" onSubmit={handleSubmit}>
          <h4>Create New Request</h4>
          <div className="form-flex">
            <div className="form-left">
              <label htmlFor="clientName">Client Name:</label>
              <input
                type="text"
                placeholder="Enter Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="clientEmail">Client Email:</label>
              <input
                type="email"
                placeholder="Enter Client Email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="clientPhone">Client Phone Number:</label>
              <input
                type="text"
                placeholder="Enter Client Phone Number"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="type">Request Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="INTER-MEMBER TRANSFER FROM AN ACTIVE HOUSE- INDIVIDUAL">
                  INTER-MEMBER TRANSFER FROM AN ACTIVE HOUSE- INDIVIDUAL
                </option>
                <option value="CSCS STATEMENT">CSCS STATEMENT</option>
                <option value="BOND MIGRATION LETTER">
                  BOND MIGRATION LETTER
                </option>
                <option value="INTER-MEMBER TRANSFER FROM AN ACTIVE HOUSE - CORPORATE">
                  INTER-MEMBER TRANSFER FROM AN ACTIVE HOUSE - CORPORATE
                </option>
                <option value="INTER-MEMBER TRANSFER FROM AN IN-ACTIVE(MORIBOUND) HOUSE- INDIVIDUAL">
                  INTER-MEMBER TRANSFER FROM AN IN-ACTIVE(MORIBOUND) HOUSE-
                  INDIVIDUAL
                </option>
                <option value="INTER-MEMBER TRANSFER FROM AN IN-ACTIVE(MORIBOUND) HOUSE - CORPORATE">
                  INTER-MEMBER TRANSFER FROM AN IN-ACTIVE(MORIBOUND) HOUSE -
                  CORPORATE
                </option>
                <option value="CHANGE OF ADDRESS">CHANGE OF ADDRESS</option>
                <option value="MERGER OF CSCS ACCOUNT">
                  MERGER OF CSCS ACCOUNT
                </option>
                <option value="CHANGE OR CORRECTION OF NAME IN CSCS">
                  CHANGE OR CORRECTION OF NAME IN CSCS
                </option>
                <option value="CHANGE OF CHN">CHANGE OF CHN</option>
                <option value="GLOBAL SEARCH REQUEST">
                  GLOBAL SEARCH REQUEST
                </option>
                <option value="SHARE TRANSFER FORM (ALLOTMENT)">
                  SHARE TRANSFER FORM (ALLOTMENT)
                </option>
                <option value="DEMATERILIZATION OF SHARE CERTIFICATION(INDIVDUAL)">
                  DEMATERILIZATION OF SHARE CERTIFICATION(INDIVDUAL)
                </option>
                <option value="DEMATERILIZATION OF SHARE CERTIFICATION(CORPORATE)">
                  DEMATERILIZATION OF SHARE CERTIFICATION(CORPORATE)
                </option>
                <option value="VERIFICATION OF SHARE CERTIFICATION">
                  VERIFICATION OF SHARE CERTIFICATION
                </option>
                <option value="TRANSMISSION OF ACCOUNT FOR DECEASED CLIENTS">
                  TRANSMISSION OF ACCOUNT FOR DECEASED CLIENTS
                </option>
                <option value="REQUEST FOR OUTSTANDING SHARE CERTIFICATES">
                  REQUEST FOR OUTSTANDING SHARE CERTIFICATES
                </option>
                <option value="OUTSTANDING DIVIDENDS">
                  OUTSTANDING DIVIDENDS
                </option>
                <option value="MERGING OF MULTIPLE ACCOUNTS AT THE REGISTRARS">
                  MERGING OF MULTIPLE ACCOUNTS AT THE REGISTRARS
                </option>
                <option value="DETACHMENT">DETACHMENT</option>
                <option value="DIRECT CASH SETTLEMENT">
                  DIRECT CASH SETTLEMENT
                </option>
                <option value="X-ALERT">X-ALERT</option>
              </select>
            </div>
            <div className="form-right">
              <label htmlFor="docURL">Document URL:</label>
              <input
                type="text"
                placeholder="Paste Document URL"
                name="docURL"
                value={formData.docURL}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="authURL">Debit Authorization URL</label>
              <input
                type="text"
                placeholder="Paste Debit Authorization URL"
                name="authURL"
                value={formData.authURL}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="narration">Narration</label>
              <input
                type="text"
                placeholder="Enter Narration"
                name="narration"
                value={formData.narration}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btnCreate" onClick={handleSubmit}>
            Create Request
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateRequest;

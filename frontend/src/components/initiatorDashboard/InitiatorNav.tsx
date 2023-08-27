import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/meristem-logo.png";
import { HiOutlineMenu } from "react-icons/Hi";
import Modal from "react-modal";
import jwt_decode from "jwt-decode";
import SearchBar from "../searchComponent/SearchBar";
import ExportRequests from "../exportData/ExportData";
import CreateRequest from "../../request/createRequest";

interface DecodedToken {
  id: string;
  firstName: string;
  lastName: string;
}

const InitiatorNav: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCreateRequestModalOpen, setCreateRequestModalOpen] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0)).join("");
  };

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: DecodedToken = jwt_decode(token);
          setUserData(decodedToken);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchLoggedInUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCreateRequestModal = () => {
    setCreateRequestModalOpen(!isCreateRequestModalOpen);
  };

  const handleCreateRequestSuccess = () => {
    setCreateRequestModalOpen(false);
    navigate("/initiatorDashboard");
  };

  const handleExportRequestSuccess = () => {
    setModalOpen(false);
    navigate("/initiatorDashboard");
  };

  return (
    <>
      <header className="top-bar">
        <div className="logo">
          <img src={Logo} alt="Meristem" />
        </div>

        <button
          className={`toggle-menu-button ${showMenu ? "active" : ""}`}
          onClick={handleToggleMenu}
        >
          <HiOutlineMenu />
        </button>

        <nav className={`navbar-mobile ${showMenu ? "show-menu" : ""}`}>
          <ul className="menu-mobile-main-menu">
            <li style={{ borderBottom: "none" }}>
              {userData ? userData.firstName : "Loading..."}
            </li>
            <li onClick={handleLogout} className="link">
              Logout
            </li>
          </ul>
        </nav>

        {/* Desktop nav */}
        <div className="list-init">
          <div className="search-container">
            <SearchBar />
          </div>
          <div>
            <button className="request-link" onClick={handleCreateRequestModal}>
              Make Request
            </button>
            <button className="request-link" onClick={handleToggleModal}>
              Spool data
            </button>
          </div>
        </div>

        <div className="nav">
          <ul className="nav-menu">
            <div className="user-initials">
              {userData
                ? getInitials(userData.firstName + " " + userData.lastName)
                : ""}
            </div>
            <li className="nav-item">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : "Loading..."}
            </li>
            <li className="nav-item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleToggleModal}
          contentLabel="Export Requests Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.97)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              left: "400px",
              border: "none",
              background: "none",
              padding: 0,
              width: "100%",
            },
          }}
        >
          <div className="modal-content">
            <ExportRequests onExport={handleExportRequestSuccess} />
          </div>
        </Modal>
        <Modal
          isOpen={isCreateRequestModalOpen}
          onRequestClose={handleCreateRequestModal}
          contentLabel="Create Requests Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.97)", // Darken the background
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              left: "280px",
              top: "-5px",
              border: "none",
              background: "none",
              padding: 0,
              width: "100%",
            },
          }}
        >
          <div className="modal-request">
            <CreateRequest onSuccess={handleCreateRequestSuccess} />
          </div>
        </Modal>
      </header>
    </>
  );
};

export default InitiatorNav;

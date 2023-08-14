import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/meristem-logo.png";
import { AiOutlineUsergroupAdd } from "react-icons/Ai";
import { FiUsers } from "react-icons/Fi";
import { HiOutlineMenu, HiOutlineOfficeBuilding } from "react-icons/Hi";
import "./adminDashboard.css";
import { useData } from "../../context/authContext";

const NavBar: React.FC = () => {
  const { fetchUserData } = useData();
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    console.log("Before update:", showMenu);
    setShowMenu(!showMenu);
    console.log("After update:", showMenu);
  };

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0)).join("");
  };

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const user = await fetchUserData();
        setUserData(user);
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

  return (
    <>
      <header className="top-bar">
        <div className="logo">
          <img src={Logo} alt="Meristem" />
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={`toggle-menu-button ${showMenu ? "active" : ""}`}
          onClick={handleToggleMenu}
        >
          <HiOutlineMenu />
        </button>
        {/* Mobile Menu */}
        <nav className={`navbar-mobile ${showMenu ? "show-menu" : ""}`}>
          <ul className="menu-mobile-main-menu">
            <li>
              <Link to="/userForm" className="link">
                Create Users
              </Link>
            </li>
            <li>
              <Link to="/users" className="link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/createDepartment" className="link">
                Create Department
              </Link>
            </li>
            <li style={{ borderBottom: "none" }}>
              {userData ? userData.name : ""}
            </li>
            <li onClick={handleLogout} className="link">
              Logout
            </li>
          </ul>
        </nav>

        {/* Desktop Menu */}
        <div className="list-item">
          <p className="para">
            <Link to="/userForm" className="link">
              <AiOutlineUsergroupAdd />
              Create Users
            </Link>
          </p>
          <p className="para">
            <Link to="/users" className="link">
              <FiUsers />
              Users
            </Link>
          </p>
          <p className="para">
            <Link to="/createDepartment" className="link">
              <HiOutlineOfficeBuilding />
              Create Department
            </Link>
          </p>
        </div>
        <div className="nav">
          <ul className="nav-menu">
            <div className="user-initials">
              {userData ? getInitials(userData.name) : ""}
            </div>
            <li className="nav-item">{userData ? userData.name : ""}</li>
            <li className="nav-item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;

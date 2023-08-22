import React, { useState } from "react";
import Logo from "../../assets/meri-logo.png";
import "./changePassword.css";
import { useData } from "../../context/authContext";
import { useParams } from "react-router-dom";

const changePassword: React.FC = () => {
  const { id } = useParams();
  const { changePassword } = useData();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const payload = {
    currentPassword,
    newPassword,
    confirmPassword,
    id,
  };

  const handleCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await changePassword(payload);
  };

  return (
    <div className="changepass_page">
      <div className="changepass_container">
        <div className="changepass_main">
          <div className="logo_container">
            <div></div>
            <img src={Logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit} className="changepass_center" action="">
            <h4>Change Password</h4>

            <label htmlFor="currentPassword">Default Password</label>
            <input
              type="password"
              placeholder="Enter the default password"
              name="currentPassword"
              value={currentPassword}
              onChange={handleCurrentPassword}
              required
            />

            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              placeholder="Enter a new password"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPassword}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />

            <button type="submit" className="btn">
              Change Password
            </button>

            {/* <a href="/login">Proceed to login</a> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default changePassword;

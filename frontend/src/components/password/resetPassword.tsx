import React, { useState } from "react";
import Logo from "../../assets/meri-logo.png";
import "./resetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const changePassword: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ newPassword: "", confirmPassword: "" });

  const handleChange = (e: any) => {
    const {
      target: { value, name },
    } = e;
    setData((details) => ({ ...details, [name]: value }));
  };

  // const token = localStorage.getItem("token");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let response = await axios.post("http://localhost:3000/password/reset", {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      if (response.status === 201) {
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="resetpass_page">
      <div className="changepass_container">
        <div className="changepass_main">
          <div className="logo_container">
            <div></div>
            <img src={Logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit} className="changepass_center" action="">
            <h4>Reset Password</h4>

            <label htmlFor="password">New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              name="password"
              onChange={handleChange}
              required
            />

            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn">
              Reset Password
            </button>

            <a href="/login">Go back to login</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default changePassword;

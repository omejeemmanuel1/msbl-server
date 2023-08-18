import React, { useState } from "react";
import Logo from "../../assets/meri-logo.png";
import "./changePassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const changePassword: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const handleChange = (e: any) => {
    const {
      target: { value, name },
    } = e;
    setData((details) => ({ ...details, [name]: value }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let response = await axios.post(
        `http://localhost:3000/verify/reset?token=${token}`,
        {
          oldPassword: data.password,
          newPassword: data.confirmPassword,
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="changepass_container">
      <div className="changepass_main">
        <div className="logo_container">
          <div></div>
          <img src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className="changepass_center" action="">
          <h4>Change Password</h4>

          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            placeholder="Enter Old Password"
            name="password"
            onChange={handleChange}
            required
          />

          <label htmlFor="password">New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            name="password"
            onChange={handleChange}
            required
          />

          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">
            Change Password
          </button>

          <a href="/login">Go back to login</a>
        </form>
      </div>
    </div>
  );
};

export default changePassword;

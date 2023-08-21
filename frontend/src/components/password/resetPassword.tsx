import React, { useState } from "react";
import Logo from "../../assets/meri-logo.png";
import "./changePassword.css";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';
import { useData } from "../../context/authContext";

const changePassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useData();
  const [data, setData] = useState({ newPassword: "", confirmPassword: "" });

  const payload = {
    data
  };

  const handleChange = (e: any) => {
    const {
      target: { value, name },
    } = e;
    setData((details) => ({ ...details, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // await resetPassword(payload);
    try {
      let response = await axios.post(
        'http://localhost:3000/password/reset',
        {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      navigate("/login");
     
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
          <h4>Reset Password</h4>

          <label htmlFor="password">New Password</label>
          <input
            type="password"
            placeholder="Enter your new password"
            name="newPassword"
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
  );
};

export default changePassword;

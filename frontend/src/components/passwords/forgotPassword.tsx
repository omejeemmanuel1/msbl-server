import React, { useState } from "react";
import Logo from "../../assets/meri-logo.png";
import "./forgotPassword.css";
import { useData } from "../../context/authContext";

const forgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useData();

  const payload = {
    email,
  };

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await forgotPassword(payload);
  };

  return (
    <div className="forgotpass_page">
      <div className="forgotpass_container">
        <div className="forgotpass_main">
          <div className="logo_container">
            <div></div>
            <img src={Logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit} className="center" action="">
            <h4>Forgot Password</h4>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              onChange={handleChange}
              required
              value={email}
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

export default forgotPassword;

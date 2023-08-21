import React, { useState } from "react";
import Logo from "../../assets/meristem-logo.png";
import Image from "../../assets/round.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/authContext";
import swal from "sweetalert";

interface Data {
  message: string;
  token: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmins } = useData();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // Call the login function from authContext
      const response = await loginAdmins({
        email: email,
        password: password,
      });

      if (response) {
        const data: Data = response;
        localStorage.setItem("token", data.token);
        swal("Login", "Successful", "success");

        setTimeout(() => {
          if(email === "superadmin@meristemng.com"){
            navigate("/super-admin");
          }else{
            navigate("/admin");
          }
          
        }, 2000); // Use setTimeout instead of setInterval for navigation
      } else {
        console.log("Error logging in");
      }
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-main">
          <div className="login-logo_container">
            <div></div>
            <img src={Logo} alt="login-logo" />
          </div>

          <div className="login-form_container">
            <div className="login-img_wrapper">
              <h2>
                MSBL <br /> Operations <br />
                Work flow
              </h2>
              <p className="login-text">Request . Process . Notify</p>
              <img src={Image} alt="" />
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <h4>Sign In</h4>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="submit" className="login-btn">
                Sign In
              </button>
              <p className='forgot_password'>
              Forgot your password?
              <a href="/forgot-password">Reset Password</a>
            </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
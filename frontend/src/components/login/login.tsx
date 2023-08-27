import React, { useState } from "react";
import Logo from "../../assets/meristem-logo.png";
import Image from "../../assets/round.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useData } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Data {
  role: string;
  message: string;
  token: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useData();
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

      const user = {
        email,
        password,
      };

      const response = await login(user);

      if (response) {
        const data: Data = response;
        console.log("Role:", data.role);
        console.log("Data:", data);
        localStorage.setItem("token", data.token);
        swal("Login", "Successful", "success");

        if (user.email === "superadmin@meristemng.com") {
          navigate("/super-admin");
        } else if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "initiator") {
          navigate("/initiatorDashboard");
        } else if (data.role === "checkerDashboard") {
          navigate("/checker");
        } else {
          navigate("/requesterDashboard");
        }
      } else {
        console.log("err");
        toast.error("err");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("error", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-main">
          <div className="login-logo_container">
            <img src={Logo} alt="login-logo" />
          </div>

          <div className="login-form_container">
            <div className="login-img_wrapper">
              <h2 className="h2">
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
      <ToastContainer />;
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import Logo from "../../assets/meristem-logo.png";
import Image from "../../assets/round.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

interface Data {
  message: string;
  token: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let [count, setCount] = useState<number>(0);

  // const loginUrl = baseUrl + apiEndpoint;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const headers = {
    "Content-Type": "application/json",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const url = "http://localhost:3000";
      const response = await axios.post(
        `${url}/users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers,
          withCredentials: true,
        }
      );

      if (response.data) {
        const data: Data = response.data;
        console.log(response.data);
        localStorage.setItem("token", data.token);
        swal("Login", "Succesful", "success");

        setInterval(() => {
          count++;
          setCount(count + 1);
          if (count == 2) {
            navigate("/admin");
          }
        }, 1000);
      } else {
        console.log("err");
      }
    } catch (error) {
      console.log(error);
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
              {/* <p className='forgot_password'>
              Forgot your password?
              <a href="/forgot-password">Reset Password</a>
            </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

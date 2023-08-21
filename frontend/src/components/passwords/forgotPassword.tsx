import React, {useState} from 'react';
import Logo from '../../assets/meri-logo.png';
import axios from 'axios';
import './forgotPassword.css';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useData } from "../../context/authContext";

const forgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { forgotPassword } = useData();

  const payload = {
    email
  };

  const handleChange = (e: any) => {
    console.log(e.target.value)
   setEmail(e.target.value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await forgotPassword(payload)
    // let response = await axios.post('http://localhost:3000/password/forgot', {
    //   email: state.email
    // });
    // console.log(response);
    // const token  = response.data.token;
    // localStorage.setItem("token",token)
    // swal("OTP sent successfully. Check your mail for instructions to reset your password")

    // setTimeout(() => {
    //   navigate("/verify-otp");
    // }, 2000); 

  }

  return (
    <div className='forgotpass_container'>
        <div className="forgotpass_main">
         <div className='logo_container'>
          <div></div>
          <img src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className='center' action="">
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
            <button type="submit" className="btn">Reset Password</button>
            <a href="/login">Go back to login</a>
          </form>
          </div>
    </div>
  )
}

export default forgotPassword
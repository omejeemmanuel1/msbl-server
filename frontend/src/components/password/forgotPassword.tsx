import React, {useState} from 'react';
import Logo from '../../assets/meri-logo.png';
import axios from 'axios';
import './forgotPassword.css';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const forgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({email: ''});

  const handleChange = (e: any) => {
    const {target: {value, name}} = e;
    setState((data) => ({...data, [name]: value}))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let response = await axios.post('http://localhost:3000/password/forgot', {
      email: state.email
    });
    console.log(response);
    swal("OTP sent successfully. Check your mail for instructions to reset your password")

    setTimeout(() => {
      navigate("/verify-otp");
    }, 2000); 

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
            />
            <button type="submit" className="btn">Reset Password</button>
          </form>
          </div>
    </div>
  )
}

export default forgotPassword
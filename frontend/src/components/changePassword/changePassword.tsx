import React, {useState} from 'react';
import Logo from '../../assets/meri-logo.png';
import './changePassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const changePassword: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({password: '', confirm_password: ''});

  const handleChange = (e: any) => {
    const {target: {value, name}} = e;
    setData((details) => ({...details, [name]: value}))
  }

  const token = localStorage.getItem("ADMIN_TOKEN");
  
  // /admin-login
  
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      let response = await axios.post(`http://localhost:3000/verify/reset?token=${token}`, {
        oldPassword: data.password,
        newPassword: data.confirm_password
      });
      if(response.status === 201){
         navigate('/admin-login');
     }
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='changepass_container'>
    <div className="changepass_main">
     <div className='logo_container'>
      <div></div>
      <img src={Logo} alt="logo" />
    </div>
    <form onSubmit={handleSubmit} className='changepass_center' action="">
        <h4>Change Password</h4>

        <label htmlFor="password">password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              name="password" 
              onChange={handleChange} 
              required 
              />

            <label htmlFor="confirm_password">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Enter confirm password" 
              name="confirm_password" 
              onChange={handleChange} 
              required 
              />
              
              <a href="/login">Go back to login</a>
           
        <button type="submit" className="btn">Change Password</button>
      </form>
      </div>
</div>
  )
}

export default changePassword
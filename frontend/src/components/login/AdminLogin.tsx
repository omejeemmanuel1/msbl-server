import React, {useState} from 'react';
import Logo from '../../assets/meri-logo.png';
import Image from '../../assets/round.png';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});

    const handleChange = (event: any) => {
        const {target: {value, name}} = event;
        setData((details) => ({...details, [name]: value}))
    }
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
          let response = await axios.post('http://localhost:3000/admin/login', {
            email: data.email,
            password: data.password
        })
        console.log('This is the response',response);
        console.log(response.data.token);
        if(response.status === 201){
           localStorage.setItem("ADMIN_TOKEN",response.data.token);
            navigate('/admin-dashboard');
        }
        } catch (error) {
          console.log(error)
        }
    }
// const url = 'http://localhost:3000/admin/login';
    

  return (
    <div className='container'>
      <div className="main">
        <div className='logo_container'>
          <div></div>
          <img src={Logo} alt="logo" />
        </div>

        <div className="form_container">
          <div className="img_wrapper">
            <h2>MSBL <br/> Operations  <br/>Work flow</h2>
            <p className='text'>Request . Process . Notify</p>
            <img src={Image} alt="" />
          </div>
          
          <form onSubmit={handleSubmit} className='login_form'>
            <h4>Sign In</h4>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              name="email" 
              onChange={handleChange}
            //   value={email} 
            //   onChange={handleEmailChange} 
              required 
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
            //   value={password}
            //   onChange={handlePasswordChange}
              required
            />
            <button type="submit" className="btn">Sign In</button>
            <p className='forgot_password'>
              Forgot your password?
              <a href="/forgot-password">Reset Password</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
  
export default AdminLogin
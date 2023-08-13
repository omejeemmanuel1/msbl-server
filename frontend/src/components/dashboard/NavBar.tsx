import { Link } from 'react-router-dom';
import Logo from '../../assets/meristem-logo.png';
import { AiOutlineUsergroupAdd } from 'react-icons/Ai';
import { FiUsers } from 'react-icons/Fi';
import { HiOutlineOfficeBuilding } from 'react-icons/Hi';
import './adminDashboard.css';


const NavBar = () => {
    const getInitials = (name: string): string => {
        const names = name.split(' ');
        return names.map(name => name.charAt(0)).join('');
      };
    
  return (
    <>
        <header className='top-bar'>
      <div className="logo">
        <img src={Logo} alt="Meristem" />
      </div>
      <div className='list-item'>
        <p className='para'>
          <Link to="/userForm" className='link'>
          <AiOutlineUsergroupAdd />Create Users
          </Link>
          </p>
        <p className='para'>
        <Link to="/users" className='link'>
        <FiUsers />
          Users
        </Link>
        </p>
        <p className='para'>
          <Link to="/createDepartment" className='link'>
         <HiOutlineOfficeBuilding />
          Create Department
          </Link>
        </p>
      </div>
      <div className="nav">
        <ul className='nav-menu'>
        <div className="user-initials">
              {getInitials("Blessing Emmanuel")}
            </div>
          <li className="nav-item">
            Blessing Emmanuel
          </li>
          <li className="nav-item">
            Logout
          </li>
        </ul>
      </div>
    </header>
    </>
  )
}

export default NavBar

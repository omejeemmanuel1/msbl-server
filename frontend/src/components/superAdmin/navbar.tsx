import Logo from '../../assets/meristem-logo.png';

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
      <div className="nav">
        <ul className='nav-menu'>
        <div className="admin-initials">
              {getInitials("Super Admin")}
            </div>
          <li className="nav-item">
            Super Admin
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

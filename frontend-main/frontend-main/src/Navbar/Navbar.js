import React from 'react';
import { Container, Paper, TextField, Button, Typography, IconButton, Tooltip } from '@mui/material';
import './Navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../Images/logo.png';
import { useNavigate, NavLink } from 'react-router-dom';
const Navbar = (props) => {
  const navigate = useNavigate();
  const {
    handleLogout
  } = props;
  return (<>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} height={40} alt="" />Manage your Budgets
        </div>
        {/* <div className="menu-icon" onClick={handleShowNavbar}> */}
          {/* <Hamburger /> */}
        {/* </div> */}
        <div className={`nav-elements`}>
          <ul>
            <li>
              <NavLink to="/dashboard">Home</NavLink>
            </li>
            <li>
              <NavLink to="/addExpense">Add Expense</NavLink>
            </li>
            <li>
              <NavLink to="/cofigureBudget">Add Budget</NavLink>
            </li>
            <li style={{ fontWeight: '600' }}>
              <NavLink to="/signin" onClick={() => handleLogout()}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>)
}

export default Navbar;
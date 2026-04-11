import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';
import { 
  HiPlus,
  HiOutlineChartBar, 
  HiOutlineSearch, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineUser, 
  HiOutlineUsers,
  HiOutlineUserGroup
} from 'react-icons/hi';

const patientLinks = [
  { to: '/patient/dashboard', label: 'Dashboard', icon: <HiOutlineChartBar /> },
  { to: '/doctors', label: 'Find Doctors', icon: <HiOutlineSearch /> },
  { to: '/patient/appointments', label: 'My Appointments', icon: <HiOutlineCalendar /> },
];

const doctorLinks = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: <HiOutlineChartBar /> },
  { to: '/doctor/appointments', label: 'Appointments', icon: <HiOutlineCalendar /> },
  { to: '/doctor/availability', label: 'Availability', icon: <HiOutlineClock /> },
  { to: '/doctor/profile', label: 'Profile', icon: <HiOutlineUser /> },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <HiOutlineChartBar /> },
  { to: '/admin/users', label: 'Users', icon: <HiOutlineUsers /> },
  { to: '/admin/doctors', label: 'Doctors', icon: <HiOutlineUserGroup /> },
  { to: '/admin/appointments', label: 'Appointments', icon: <HiOutlineCalendar /> },
];

const Layout = ({ children }) => {
  const { user } = useAuth();

  const links =
    user?.role === 'doctor' ? doctorLinks :
    user?.role === 'admin' ? adminLinks :
    patientLinks;

  return (
    <>
      <Navbar />
      <div className="layout-wrapper">
        {user && (
          <aside className="sidebar">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon"><HiPlus /></div>
              <span>Smart Care</span>
            </div>
            <ul className="sidebar-menu">
              {links.map((link) => (
                <li key={link.to} className="sidebar-item">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                  >
                    <span className="sidebar-link-icon">{link.icon}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
        )}
        <main className="content-area">{children}</main>
      </div>
    </>
  );
};

export default Layout;

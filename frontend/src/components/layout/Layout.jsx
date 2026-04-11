import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

const patientLinks = [
  { to: '/patient/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/doctors', label: 'Find Doctors', icon: '🔍' },
  { to: '/patient/appointments', label: 'My Appointments', icon: '📅' },
];

const doctorLinks = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/doctor/appointments', label: 'Appointments', icon: '📅' },
  { to: '/doctor/availability', label: 'Availability', icon: '🕐' },
  { to: '/doctor/profile', label: 'Profile', icon: '👤' },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/doctors', label: 'Doctors', icon: '🩺' },
  { to: '/admin/appointments', label: 'Appointments', icon: '📅' },
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

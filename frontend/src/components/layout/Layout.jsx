import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

const patientLinks = [
  { to: '/patient/dashboard', label: '🏠 Dashboard' },
  { to: '/doctors', label: '🔍 Find Doctors' },
  { to: '/patient/appointments', label: '📅 My Appointments' },
];

const doctorLinks = [
  { to: '/doctor/dashboard', label: '🏠 Dashboard' },
  { to: '/doctor/appointments', label: '📅 Appointments' },
  { to: '/doctor/availability', label: '🕐 Availability' },
  { to: '/doctor/profile', label: '👤 Profile' },
];

const adminLinks = [
  { to: '/admin/dashboard', label: '📊 Dashboard' },
  { to: '/admin/users', label: '👥 Users' },
  { to: '/admin/doctors', label: '👨‍⚕️ Doctors' },
  { to: '/admin/appointments', label: '📅 Appointments' },
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

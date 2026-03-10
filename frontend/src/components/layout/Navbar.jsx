import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          🏥 Smart Care
        </Link>

        <ul className="navbar-nav">
          <li><NavLink to="/doctors" className="nav-link">Find Doctors</NavLink></li>

          {!user ? (
            <>
              <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
              <li>
                <NavLink to="/register" className="btn btn-primary btn-sm">Get Started</NavLink>
              </li>
            </>
          ) : (
            <>
              {user.role === 'patient' && (
                <>
                  <li><NavLink to="/patient/dashboard" className="nav-link">Dashboard</NavLink></li>
                  <li><NavLink to="/patient/appointments" className="nav-link">My Appointments</NavLink></li>
                </>
              )}
              {user.role === 'doctor' && (
                <>
                  <li><NavLink to="/doctor/dashboard" className="nav-link">Dashboard</NavLink></li>
                  <li><NavLink to="/doctor/appointments" className="nav-link">Appointments</NavLink></li>
                </>
              )}
              {user.role === 'admin' && (
                <li><NavLink to="/admin/dashboard" className="nav-link">Admin Panel</NavLink></li>
              )}
              <li>
                <span style={{ padding: '8px 14px', fontSize: 14, color: '#64748b' }}>
                  👋 {user.name.split(' ')[0]}
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

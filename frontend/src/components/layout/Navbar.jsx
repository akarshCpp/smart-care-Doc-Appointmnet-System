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
          <span className="navbar-brand-icon">+</span>
          Smart Care
        </Link>

        <ul className="navbar-nav">
          <li><NavLink to="/doctors" className="nav-link">Find Doctors</NavLink></li>

          {!user ? (
            <>
              <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
              <li>
                <NavLink to="/register" className="btn btn-primary btn-sm" style={{ borderRadius: 50 }}>
                  Get Started
                </NavLink>
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
                <span style={{
                  padding: '6px 14px',
                  fontSize: 13,
                  color: 'var(--gray-500)',
                  fontWeight: 600,
                  background: 'var(--gray-100)',
                  borderRadius: 50,
                }}>
                  {user.name.split(' ')[0]}
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ borderRadius: 50 }}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

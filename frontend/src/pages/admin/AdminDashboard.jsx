import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { 
  HiOutlineUsers, 
  HiOutlineHeart, 
  HiOutlineCalendar, 
  HiOutlineClock
} from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => {
      setStats(data.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="spinner" />;

  const statusMap = {};
  stats.appointmentsByStatus?.forEach(s => { statusMap[s._id] = s.count; });

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Smart Care system overview</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <div className="stat-icon blue"><HiOutlineUsers /></div>
          <div><div className="stat-label">Total Patients</div><div className="stat-value">{stats.totalUsers}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><HiOutlineHeart /></div>
          <div><div className="stat-label">Active Doctors</div><div className="stat-value">{stats.totalDoctors}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><HiOutlineCalendar /></div>
          <div><div className="stat-label">Total Appointments</div><div className="stat-value">{stats.totalAppointments}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><HiOutlineClock /></div>
          <div><div className="stat-label">Pending Approvals</div><div className="stat-value">{stats.pendingDoctors}</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--primary-dark)' }}>Appointments by Status</h3>
          {['pending', 'approved', 'completed', 'cancelled', 'rejected'].map(status => (
            <div key={status} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid var(--gray-100)'
            }}>
              <span style={{ textTransform: 'capitalize', color: 'var(--gray-700)', fontSize: 14 }}>{status}</span>
              <span style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{statusMap[status] || 0}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--primary-dark)' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/admin/doctors" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <HiOutlineHeart /> Manage Doctors ({stats.pendingDoctors} pending)
            </Link>
            <Link to="/admin/users" className="btn btn-outline btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <HiOutlineUsers /> Manage Users
            </Link>
            <Link to="/admin/appointments" className="btn btn-ghost btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <HiOutlineCalendar /> View All Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

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
        <h1>Admin Dashboard 📊</h1>
        <p>Smart Care system overview</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div><div className="stat-label">Total Patients</div><div className="stat-value">{stats.totalUsers}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">👨‍⚕️</div>
          <div><div className="stat-label">Active Doctors</div><div className="stat-value">{stats.totalDoctors}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">📅</div>
          <div><div className="stat-label">Total Appointments</div><div className="stat-value">{stats.totalAppointments}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">⏳</div>
          <div><div className="stat-label">Pending Approvals</div><div className="stat-value">{stats.pendingDoctors}</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Appointments by Status</h3>
          {['pending', 'approved', 'completed', 'cancelled', 'rejected'].map(status => (
            <div key={status} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ textTransform: 'capitalize' }}>{status}</span>
              <span style={{ fontWeight: 700 }}>{statusMap[status] || 0}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link to="/admin/doctors" className="btn btn-primary btn-block">
              👨‍⚕️ Manage Doctors ({stats.pendingDoctors} pending)
            </Link>
            <Link to="/admin/users" className="btn btn-outline btn-block">
              👥 Manage Users
            </Link>
            <Link to="/admin/appointments" className="btn btn-ghost btn-block">
              📅 View All Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

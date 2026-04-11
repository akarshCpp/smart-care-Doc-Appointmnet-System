import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { format } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/appointments/my').then(({ data }) => {
      setAppointments(data.data);
      setLoading(false);
    });
  }, []);

  const counts = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
        <p>Here's an overview of your health appointments</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <div className="stat-icon blue">📅</div>
          <div><div className="stat-label">Total</div><div className="stat-value">{counts.total}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div><div className="stat-label">Pending</div><div className="stat-value">{counts.pending}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div><div className="stat-label">Approved</div><div className="stat-value">{counts.approved}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">🏁</div>
          <div><div className="stat-label">Completed</div><div className="stat-value">{counts.completed}</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="flex-between" style={{ marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>Recent Appointments</h3>
            <Link to="/patient/appointments" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          {appointments.slice(0, 4).map(apt => (
            <div key={apt._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div className="flex-between">
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark)' }}>Dr. {apt.doctor?.user?.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                    {format(new Date(apt.date), 'MMM dd, yyyy')} · {apt.timeSlot?.startTime}
                  </p>
                </div>
                <span className={`badge badge-${
                  apt.status === 'approved' ? 'success' :
                  apt.status === 'pending' ? 'warning' :
                  apt.status === 'cancelled' ? 'danger' : 'gray'
                }`}>{apt.status}</span>
              </div>
            </div>
          ))}
          {appointments.length === 0 && <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: 20, fontSize: 14 }}>No appointments yet</p>}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--primary-dark)' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/doctors" className="btn btn-primary btn-block">
              🔍 Find & Book a Doctor
            </Link>
            <Link to="/patient/appointments" className="btn btn-outline btn-block">
              📋 View All Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

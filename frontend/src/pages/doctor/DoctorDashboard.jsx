import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { format } from 'date-fns';
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineExclamation,
  HiOutlineUser,
  HiOutlineBriefcase
} from 'react-icons/hi';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/appointments/doctor'),
      api.get('/doctors/profile/me'),
    ]).then(([aptsRes, profileRes]) => {
      setAppointments(aptsRes.data.data);
      setDoctorProfile(profileRes.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const counts = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    today: appointments.filter(a => format(new Date(a.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length,
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h1>Doctor Dashboard</h1>
        <p>Welcome back, Dr. {user.name}</p>
      </div>

      {doctorProfile && !doctorProfile.isApproved && (
        <div className="alert alert-warning" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <HiOutlineExclamation size={20} /> Your account is pending admin approval. You'll be able to receive appointments once approved.
        </div>
      )}

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <div className="stat-icon blue"><HiOutlineBriefcase /></div>
          <div><div className="stat-label">Total Appointments</div><div className="stat-value">{counts.total}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><HiOutlineClock /></div>
          <div><div className="stat-label">Pending</div><div className="stat-value">{counts.pending}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><HiOutlineCheckCircle /></div>
          <div><div className="stat-label">Approved</div><div className="stat-value">{counts.approved}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><HiOutlineCalendar /></div>
          <div><div className="stat-label">Today</div><div className="stat-value">{counts.today}</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="flex-between" style={{ marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>Recent Appointments</h3>
            <Link to="/doctor/appointments" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          {appointments.slice(0, 5).map(apt => (
            <div key={apt._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div className="flex-between">
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark)' }}>{apt.patient?.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                    {format(new Date(apt.date), 'MMM dd, yyyy')} · {apt.timeSlot?.startTime}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>{apt.reason}</p>
                </div>
                <span className={`badge badge-${
                  apt.status === 'approved' ? 'success' :
                  apt.status === 'pending' ? 'warning' : 'danger'
                }`}>{apt.status}</span>
              </div>
            </div>
          ))}
          {appointments.length === 0 && <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: 20, fontSize: 14 }}>No appointments yet</p>}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 20, color: 'var(--primary-dark)' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/doctor/appointments" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <HiOutlineCalendar /> Manage Appointments
            </Link>
            <Link to="/doctor/availability" className="btn btn-outline btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <HiOutlineClock /> Update Availability
            </Link>
            <Link to="/doctor/profile" className="btn btn-ghost btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <HiOutlineUser /> Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

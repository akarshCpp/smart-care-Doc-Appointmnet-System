import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { format } from 'date-fns';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchAppointments = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/appointments/doctor', { params });
      setAppointments(data.data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAppointments(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch { toast.error('Failed to update'); }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 28 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Patient Appointments</h1>
        </div>
        <select className="form-control" style={{ width: 180 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state"><div style={{ fontSize: 48 }}>📅</div><h3>No appointments found</h3></div>
      ) : (
        appointments.map(apt => (
          <div key={apt._id} className={`appointment-card ${apt.status}`}>
            <div style={{ flex: 1 }}>
              <div className="flex gap-3" style={{ marginBottom: 6, alignItems: 'center' }}>
                <h3 style={{ fontWeight: 700 }}>{apt.patient?.name}</h3>
                <span className={`badge badge-${
                  apt.status === 'approved' ? 'success' :
                  apt.status === 'pending' ? 'warning' :
                  apt.status === 'cancelled' ? 'danger' : 'gray'
                }`}>{apt.status}</span>
              </div>
              <p className="text-sm" style={{ marginBottom: 4 }}>
                📅 {format(new Date(apt.date), 'MMMM dd, yyyy')} at {apt.timeSlot?.startTime} – {apt.timeSlot?.endTime}
              </p>
              <p className="text-sm text-gray">📧 {apt.patient?.email} | 📱 {apt.patient?.phone || 'N/A'}</p>
              <p className="text-sm" style={{ marginTop: 6 }}>📝 <em>{apt.reason}</em></p>
            </div>
            {apt.status === 'pending' && (
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm" onClick={() => updateStatus(apt._id, 'approved')}>
                  ✅ Approve
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(apt._id, 'rejected')}>
                  ❌ Reject
                </button>
              </div>
            )}
            {apt.status === 'approved' && (
              <button className="btn btn-primary btn-sm" onClick={() => updateStatus(apt._id, 'completed')}>
                🏁 Complete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorAppointments;

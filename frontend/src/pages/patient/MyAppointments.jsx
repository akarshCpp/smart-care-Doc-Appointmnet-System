import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { format } from 'date-fns';

const statusColors = {
  pending: 'warning', approved: 'success', cancelled: 'danger', completed: 'info', rejected: 'gray'
};

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchAppointments = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/appointments/my', { params });
      setAppointments(data.data);
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, [filter]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await api.put(`/appointments/${id}/cancel`, { cancelReason: 'Patient cancelled' });
      toast.success('Appointment cancelled');
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 28 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>My Appointments</h1>
          <p>View and manage your appointments</p>
        </div>
        <select className="form-control" style={{ width: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 48 }}>📅</div>
          <h3>No appointments found</h3>
          <p>Book an appointment with one of our doctors</p>
        </div>
      ) : (
        appointments.map((apt) => (
          <div key={apt._id} className={`appointment-card ${apt.status}`}>
            <div style={{ flex: 1 }}>
              <div className="flex gap-3" style={{ marginBottom: 6, alignItems: 'center' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--dark)' }}>
                  Dr. {apt.doctor?.user?.name || 'Doctor'}
                </h3>
                <span className={`badge badge-${statusColors[apt.status]}`}>{apt.status}</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--gray-500)', marginBottom: 4 }}>
                🏥 {apt.doctor?.specialization}
              </p>
              <p className="text-sm" style={{ marginBottom: 4, color: 'var(--gray-700)' }}>
                📅 {format(new Date(apt.date), 'MMMM dd, yyyy')} at {apt.timeSlot?.startTime}
              </p>
              <p className="text-sm" style={{ color: 'var(--gray-500)' }}>📝 {apt.reason}</p>
            </div>
            {['pending', 'approved'].includes(apt.status) && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleCancel(apt._id)}
              >
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;

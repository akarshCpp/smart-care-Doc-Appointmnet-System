import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { format } from 'date-fns';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.get('/appointments/all').then(({ data }) => {
      setAppointments(data.data);
      setLoading(false);
    });
  }, []);

  const filtered = filter ? appointments.filter(a => a.status === filter) : appointments;

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 28 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>All Appointments</h1>
          <p>{appointments.length} total appointments</p>
        </div>
        <select className="form-control" style={{ width: 180 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Booked On</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(apt => (
                <tr key={apt._id}>
                  <td>
                    <p style={{ fontWeight: 600 }}>{apt.patient?.name}</p>
                    <p style={{ fontSize: 12, color: '#64748b' }}>{apt.patient?.email}</p>
                  </td>
                  <td>
                    <p style={{ fontWeight: 600 }}>Dr. {apt.doctor?.user?.name}</p>
                    <p style={{ fontSize: 12, color: '#64748b' }}>{apt.doctor?.specialization}</p>
                  </td>
                  <td>
                    <p>{format(new Date(apt.date), 'MMM dd, yyyy')}</p>
                    <p style={{ fontSize: 12, color: '#64748b' }}>{apt.timeSlot?.startTime} – {apt.timeSlot?.endTime}</p>
                  </td>
                  <td style={{ maxWidth: 200 }}>
                    <p style={{ fontSize: 13, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {apt.reason}
                    </p>
                  </td>
                  <td>
                    <span className={`badge badge-${
                      apt.status === 'approved' ? 'success' :
                      apt.status === 'pending' ? 'warning' :
                      apt.status === 'cancelled' || apt.status === 'rejected' ? 'danger' : 'info'
                    }`}>{apt.status}</span>
                  </td>
                  <td style={{ color: '#64748b', fontSize: 13 }}>
                    {format(new Date(apt.createdAt), 'MMM dd, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>No appointments found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;

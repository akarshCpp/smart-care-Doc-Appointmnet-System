import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { format } from 'date-fns';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    const { data } = await api.get('/admin/doctors');
    setDoctors(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleApprove = async (id, isApproved) => {
    try {
      const { data } = await api.put(`/admin/doctors/${id}/approve`, { isApproved });
      toast.success(data.message);
      fetchDoctors();
    } catch { toast.error('Failed to update'); }
  };

  const filtered = filter === 'all' ? doctors :
    filter === 'pending' ? doctors.filter(d => !d.isApproved) :
    doctors.filter(d => d.isApproved);

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 28 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Manage Doctors</h1>
          <p>{doctors.filter(d => !d.isApproved).length} pending approvals</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => (
                <tr key={doc._id}>
                  <td>
                    <div>
                      <p style={{ fontWeight: 600 }}>{doc.user?.name}</p>
                      <p style={{ fontSize: 12, color: '#64748b' }}>{doc.user?.email}</p>
                    </div>
                  </td>
                  <td>{doc.specialization}</td>
                  <td>{doc.qualification}</td>
                  <td>{doc.experience} yrs</td>
                  <td>${doc.consultationFee}</td>
                  <td>
                    <span className={`badge badge-${doc.isApproved ? 'success' : 'warning'}`}>
                      {doc.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {!doc.isApproved ? (
                        <button className="btn btn-secondary btn-sm" onClick={() => handleApprove(doc._id, true)}>
                          ✅ Approve
                        </button>
                      ) : (
                        <button className="btn btn-danger btn-sm" onClick={() => handleApprove(doc._id, false)}>
                          ❌ Revoke
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>No doctors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;

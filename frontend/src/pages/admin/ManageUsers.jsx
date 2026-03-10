import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { format } from 'date-fns';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data } = await api.get('/admin/users');
    setUsers(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleStatus = async (id, name) => {
    try {
      const { data } = await api.put(`/admin/users/${id}/toggle`);
      toast.success(data.message);
      fetchUsers();
    } catch { toast.error('Failed to update user status'); }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h1>Manage Users</h1>
        <p>{users.length} users registered</p>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={{ fontWeight: 600 }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`badge badge-${user.role === 'doctor' ? 'info' : 'gray'}`}>{user.role}</span></td>
                  <td>{user.phone || '—'}</td>
                  <td>{format(new Date(user.createdAt), 'MMM dd, yyyy')}</td>
                  <td>
                    <span className={`badge badge-${user.isActive ? 'success' : 'danger'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.isActive ? 'btn-danger' : 'btn-secondary'}`}
                      onClick={() => toggleStatus(user._id, user.name)}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

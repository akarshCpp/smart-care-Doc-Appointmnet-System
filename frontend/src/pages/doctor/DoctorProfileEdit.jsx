import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { HiOutlineUser, HiOutlineSave } from 'react-icons/hi';


const DoctorProfileEdit = () => {

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', specialization: '', qualification: '',
    experience: '', bio: '', consultationFee: '', hospital: '', address: '',
  });

  useEffect(() => {
    Promise.all([api.get('/doctors/profile/me')]).then(([profileRes]) => {
      const d = profileRes.data.data;
      setForm({
        name: d.user?.name || '',
        phone: d.user?.phone || '',
        specialization: d.specialization || '',
        qualification: d.qualification || '',
        experience: d.experience || '',
        bio: d.bio || '',
        consultationFee: d.consultationFee || '',
        hospital: d.hospital || '',
        address: d.address || '',
      });
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/doctors/profile', form);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="page-header">
        <h1>Edit Profile</h1>
        <p>Update your professional information</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--primary-dark)' }}>Personal Information</h3>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--gray-200)', margin: '8px 0 24px' }} />
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--primary-dark)' }}>Professional Information</h3>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Specialization</label>
              <input type="text" name="specialization" className="form-control" value={form.specialization} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Qualification</label>
              <input type="text" name="qualification" className="form-control" value={form.qualification} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Experience (years)</label>
              <input type="number" name="experience" className="form-control" value={form.experience} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Consultation Fee ($)</label>
              <input type="number" name="consultationFee" className="form-control" value={form.consultationFee} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Hospital / Clinic</label>
              <input type="text" name="hospital" className="form-control" value={form.hospital} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" name="address" className="form-control" value={form.address} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea name="bio" className="form-control" rows={4} value={form.bio} onChange={handleChange}
              placeholder="Tell patients about yourself..." />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            {saving ? 'Saving...' : <><HiOutlineSave /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileEdit;

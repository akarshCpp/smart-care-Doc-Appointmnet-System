import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'patient', phone: '',
    specialization: '', qualification: '', experience: '', consultationFee: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      const data = await register(form);
      toast.success(data.message || 'Registration successful!');
      if (form.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 560 }}>
        <div className="auth-logo">
          <h1>Smart Care</h1>
          <p>Create your account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control" placeholder="John Doe"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-control" placeholder="+1234567890"
                value={form.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" placeholder="Min 6 chars"
                value={form.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" placeholder="Repeat"
                value={form.confirmPassword} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Register as</label>
            <select name="role" className="form-control" value={form.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {form.role === 'doctor' && (
            <>
              <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />
              <p style={{ fontSize: 14, fontWeight: 600, color: '#64748b', marginBottom: 16 }}>Doctor Information</p>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <input type="text" name="specialization" className="form-control" placeholder="Cardiology"
                    value={form.specialization} onChange={handleChange} required={form.role === 'doctor'} />
                </div>
                <div className="form-group">
                  <label className="form-label">Qualification</label>
                  <input type="text" name="qualification" className="form-control" placeholder="MBBS, MD"
                    value={form.qualification} onChange={handleChange} required={form.role === 'doctor'} />
                </div>
                <div className="form-group">
                  <label className="form-label">Experience (years)</label>
                  <input type="number" name="experience" className="form-control" placeholder="5"
                    value={form.experience} onChange={handleChange} required={form.role === 'doctor'} />
                </div>
                <div className="form-group">
                  <label className="form-label">Consultation Fee ($)</label>
                  <input type="number" name="consultationFee" className="form-control" placeholder="100"
                    value={form.consultationFee} onChange={handleChange} required={form.role === 'doctor'} />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

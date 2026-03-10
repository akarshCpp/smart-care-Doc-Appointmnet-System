import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await api.get(`/doctors/${id}`);
        setDoctor(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <div className="spinner" />;
  if (!doctor) return <div className="empty-state"><h3>Doctor not found</h3></div>;

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'DR';

  const handleBook = () => {
    if (!user) return navigate('/login');
    if (user.role !== 'patient') return alert('Only patients can book appointments');
    navigate(`/book/${doctor._id}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>
        ← Back
      </button>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div
            style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, color: 'white', fontWeight: 700, flexShrink: 0
            }}
          >
            {getInitials(doctor.user?.name)}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800 }}>Dr. {doctor.user?.name}</h1>
            <p style={{ color: '#2563eb', fontWeight: 600, marginBottom: 8 }}>{doctor.specialization}</p>
            <p style={{ color: '#64748b', marginBottom: 12 }}>{doctor.qualification}</p>
            <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-info">⭐ {doctor.rating || 0} Rating</span>
              <span className="badge badge-success">💼 {doctor.experience} Years Exp.</span>
              <span className="badge badge-warning">💲{doctor.consultationFee} / visit</span>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleBook}>
            📅 Book Appointment
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>About</h3>
          <p style={{ color: '#64748b', lineHeight: 1.7 }}>
            {doctor.bio || 'No bio provided yet.'}
          </p>
          {doctor.hospital && <p style={{ marginTop: 12 }}><strong>Hospital:</strong> {doctor.hospital}</p>}
          {doctor.address && <p style={{ marginTop: 8 }}><strong>Address:</strong> {doctor.address}</p>}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Availability</h3>
          {doctor.availability?.length > 0 ? (
            doctor.availability.map((slot, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <span style={{ fontWeight: 600 }}>{slot.day}</span>
                <span style={{ color: '#64748b' }}>{slot.startTime} – {slot.endTime}</span>
              </div>
            ))
          ) : (
            <p style={{ color: '#64748b' }}>No availability set yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { getDoctorAvatar } from '../../utils/avatarHelper';
import { 
  HiArrowLeft, 
  HiStar, 
  HiBriefcase, 
  HiOutlineCurrencyDollar, 
  HiOutlineCalendar 
} from 'react-icons/hi';

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

  const handleBook = () => {
    if (!user) return navigate('/login');
    if (user.role !== 'patient') return alert('Only patients can book appointments');
    navigate(`/book/${doctor._id}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <HiArrowLeft /> Back
      </button>

      <div className="card" style={{ marginBottom: 24, padding: '40px' }}>
        <div className="profile-header" style={{ alignItems: 'center' }}>
          <img 
            src={getDoctorAvatar(doctor.user?.name)} 
            alt={doctor.user?.name}
            className="profile-avatar"
            style={{ 
              width: 120, height: 120, 
              borderRadius: '50%', 
              border: '4px solid var(--primary-light)',
              objectFit: 'cover',
              background: 'var(--white)'
            }} 
          />
          <div className="profile-info" style={{ flex: 1 }}>
            <h1>Dr. {doctor.user?.name}</h1>
            <p className="specialization">{doctor.specialization}</p>
            <p className="qualification">{doctor.qualification}</p>
            <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-info" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <HiStar /> {doctor.rating || 0} Rating
              </span>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <HiBriefcase /> {doctor.experience} Years Exp.
              </span>
              <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <HiOutlineCurrencyDollar />{doctor.consultationFee} / visit
              </span>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleBook} style={{ borderRadius: 50, display: 'flex', alignItems: 'center', gap: 10 }}>
            <HiOutlineCalendar /> Book Appointment
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--primary-dark)' }}>About</h3>
          <p style={{ color: 'var(--gray-500)', lineHeight: 1.7, fontSize: 14 }}>
            {doctor.bio || 'No bio provided yet.'}
          </p>
          {doctor.hospital && (
            <p style={{ marginTop: 14, fontSize: 14 }}>
              <strong style={{ color: 'var(--gray-700)' }}>Hospital:</strong>{' '}
              <span style={{ color: 'var(--gray-500)' }}>{doctor.hospital}</span>
            </p>
          )}
          {doctor.address && (
            <p style={{ marginTop: 8, fontSize: 14 }}>
              <strong style={{ color: 'var(--gray-700)' }}>Address:</strong>{' '}
              <span style={{ color: 'var(--gray-500)' }}>{doctor.address}</span>
            </p>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--primary-dark)' }}>Availability</h3>
          {doctor.availability?.length > 0 ? (
            doctor.availability.map((slot, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                borderBottom: '1px solid var(--gray-100)'
              }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark)' }}>{slot.day}</span>
                <span style={{ color: 'var(--gray-500)', fontSize: 14 }}>{slot.startTime} – {slot.endTime}</span>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>No availability set yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

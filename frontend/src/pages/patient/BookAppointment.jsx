import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';

const TIME_SLOTS = [
  { startTime: '09:00', endTime: '09:30' },
  { startTime: '09:30', endTime: '10:00' },
  { startTime: '10:00', endTime: '10:30' },
  { startTime: '10:30', endTime: '11:00' },
  { startTime: '11:00', endTime: '11:30' },
  { startTime: '11:30', endTime: '12:00' },
  { startTime: '14:00', endTime: '14:30' },
  { startTime: '14:30', endTime: '15:00' },
  { startTime: '15:00', endTime: '15:30' },
  { startTime: '15:30', endTime: '16:00' },
  { startTime: '16:00', endTime: '16:30' },
  { startTime: '16:30', endTime: '17:00' },
];

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ date: '', timeSlot: null, reason: '' });

  useEffect(() => {
    api.get(`/doctors/${doctorId}`).then(({ data }) => setDoctor(data.data));
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.timeSlot) return toast.error('Please select a time slot');
    setLoading(true);
    try {
      await api.post('/appointments', {
        doctorId,
        date: form.date,
        timeSlot: form.timeSlot,
        reason: form.reason,
      });
      toast.success('Appointment booked successfully!');
      navigate('/patient/appointments');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>
        ← Back
      </button>

      <div className="page-header">
        <h1>Book Appointment</h1>
        {doctor && <p>with Dr. {doctor.user?.name} – {doctor.specialization}</p>}
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              min={today}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Time Slot</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
              {TIME_SLOTS.map((slot, i) => (
                <button
                  key={i}
                  type="button"
                  className={`time-slot-btn${form.timeSlot?.startTime === slot.startTime ? ' selected' : ''}`}
                  onClick={() => setForm({ ...form, timeSlot: slot })}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Describe your symptoms or reason for the appointment..."
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              required
            />
          </div>

          {doctor && (
            <div className="alert alert-info" style={{ marginBottom: 20 }}>
              <strong>Consultation Fee:</strong> ${doctor.consultationFee}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? 'Booking...' : '📅 Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;

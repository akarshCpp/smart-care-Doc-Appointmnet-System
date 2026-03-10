import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityManager = () => {
  const [slots, setSlots] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/doctors/profile/me').then(({ data }) => {
      if (data.data.availability?.length) setSlots(data.data.availability);
    });
  }, []);

  const addSlot = () => {
    setSlots([...slots, { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 }]);
  };

  const removeSlot = (idx) => setSlots(slots.filter((_, i) => i !== idx));

  const updateSlot = (idx, field, value) => {
    const updated = [...slots];
    updated[idx] = { ...updated[idx], [field]: value };
    setSlots(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/doctors/availability', { availability: slots });
      toast.success('Availability updated!');
    } catch {
      toast.error('Failed to save availability');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="page-header">
        <h1>Manage Availability</h1>
        <p>Set your working hours for each day of the week</p>
      </div>

      <div className="card">
        {slots.length === 0 && (
          <div className="empty-state" style={{ padding: '40px 20px' }}>
            <p>No availability set. Add your first time slot below.</p>
          </div>
        )}

        {slots.map((slot, idx) => (
          <div key={idx} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px 40px',
            gap: 12, alignItems: 'end', padding: '16px 0',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Day</label>
              <select className="form-control" value={slot.day} onChange={e => updateSlot(idx, 'day', e.target.value)}>
                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Start Time</label>
              <input type="time" className="form-control" value={slot.startTime}
                onChange={e => updateSlot(idx, 'startTime', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">End Time</label>
              <input type="time" className="form-control" value={slot.endTime}
                onChange={e => updateSlot(idx, 'endTime', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Slot (min)</label>
              <input type="number" className="form-control" value={slot.slotDuration}
                onChange={e => updateSlot(idx, 'slotDuration', e.target.value)} min={15} step={15} />
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeSlot(idx)} style={{ marginBottom: 0 }}>✕</button>
          </div>
        ))}

        <div className="flex gap-3" style={{ marginTop: 24 }}>
          <button className="btn btn-outline" onClick={addSlot}>+ Add Time Slot</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Availability'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManager;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
    fetchSpecializations();
  }, [selectedSpec]);

  const fetchDoctors = async () => {
    try {
      const params = {};
      if (selectedSpec) params.specialization = selectedSpec;
      const { data } = await api.get('/doctors', { params });
      setDoctors(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const { data } = await api.get('/doctors/specializations');
      setSpecializations(data.data);
    } catch (err) {}
  };

  const filtered = doctors.filter((d) =>
    d.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'DR';

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h1>Find Doctors</h1>
        <p>Search from our network of qualified healthcare professionals</p>
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search-input"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="form-control" style={{ width: 220 }} value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)}>
          <option value="">All Specializations</option>
          {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 48 }}>🔍</div>
          <h3>No doctors found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((doc) => (
            <div key={doc._id} className="doctor-card" onClick={() => navigate(`/doctors/${doc._id}`)}>
              <div className="doctor-card-header">
                <div className="doctor-avatar">{getInitials(doc.user?.name)}</div>
                <div className="doctor-name">Dr. {doc.user?.name}</div>
                <div className="doctor-spec">{doc.specialization}</div>
              </div>
              <div className="doctor-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="text-sm text-gray">⭐ {doc.rating || 'New'}</span>
                  <span className="text-sm text-gray">💼 {doc.experience} yrs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span className="text-sm text-gray">🎓 {doc.qualification}</span>
                  <span className="text-sm" style={{ color: '#059669', fontWeight: 600 }}>${doc.consultationFee}</span>
                </div>
                {doc.hospital && <p className="text-sm text-gray" style={{ marginBottom: 12 }}>🏥 {doc.hospital}</p>}
                <button className="btn btn-primary btn-block btn-sm">View Profile & Book</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;

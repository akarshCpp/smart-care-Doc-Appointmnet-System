import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const features = [
  { icon: '🔍', title: 'Find Specialists', desc: 'Search and filter doctors by specialization, rating, and availability.' },
  { icon: '📅', title: 'Easy Booking', desc: 'Book appointments with just a few clicks. Choose your preferred time slot.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is protected with industry-grade security measures.' },
  { icon: '📱', title: '24/7 Access', desc: 'Manage your appointments anytime, anywhere from any device.' },
];

const stats = [
  { value: '20+', label: 'Years of Experience' },
  { value: '95%', label: 'Patient Satisfaction' },
  { value: '5,000+', label: 'Patients Served' },
  { value: '10+', label: 'Healthcare Providers' },
];

const Home = () => (
  <>
    <Navbar />

    {/* Hero Section */}
    <section className="hero">
      <div className="hero-content">
        <h1>Compassionate care, exceptional results.</h1>
        <p>
          Our team of experienced doctors and healthcare professionals are committed
          to providing quality care and personalized attention to our patients.
        </p>
        <div className="flex-center gap-3" style={{ flexWrap: 'wrap' }}>
          <Link
            to="/doctors"
            className="btn btn-lg"
            style={{
              background: 'white',
              color: 'var(--primary-dark)',
              fontWeight: 700,
              borderRadius: 50,
            }}
          >
            🔍 Find Doctors
          </Link>
          <Link
            to="/register"
            className="btn btn-lg"
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: 50,
            }}
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats">
        {stats.map((s, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-value">{s.value}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Features Section */}
    <section className="features-section">
      <h2 className="section-title">Why Smart Care?</h2>
      <p className="section-subtitle">Everything you need for seamless healthcare management</p>
      <div className="grid-4">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Section */}
    <section className="cta-section">
      <h2>Ready to get started?</h2>
      <p>Join thousands of patients who trust Smart Care for their healthcare needs.</p>
      <Link
        to="/register"
        className="btn btn-lg"
        style={{
          background: 'white',
          color: 'var(--primary-dark)',
          fontWeight: 700,
          borderRadius: 50,
        }}
      >
        Create Free Account
      </Link>
    </section>

    {/* Footer */}
    <footer className="site-footer">
      <p>© 2024 Smart Care. All rights reserved.</p>
    </footer>
  </>
);

export default Home;

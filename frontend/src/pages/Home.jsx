import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const features = [
  { icon: '🔍', title: 'Find Specialists', desc: 'Search and filter doctors by specialization, rating, and availability.' },
  { icon: '📅', title: 'Easy Booking', desc: 'Book appointments with just a few clicks. Choose your preferred time slot.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is protected with industry-grade security.' },
  { icon: '📱', title: '24/7 Access', desc: 'Manage your appointments anytime, anywhere from any device.' },
];

const Home = () => (
  <>
    <Navbar />
    <section className="hero">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h1>Your Health, Our Priority</h1>
        <p>Connect with top doctors and specialists. Book appointments seamlessly and manage your healthcare journey with Smart Care.</p>
        <div className="flex-center gap-3" style={{ flexWrap: 'wrap' }}>
          <Link to="/doctors" className="btn btn-lg" style={{ background: 'white', color: '#2563eb' }}>
            🔍 Find Doctors
          </Link>
          <Link to="/register" className="btn btn-lg btn-outline" style={{ borderColor: 'white', color: 'white' }}>
            Get Started Free
          </Link>
        </div>
      </div>
    </section>

    <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Why Smart Care?</h2>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 48 }}>Everything you need for seamless healthcare management</p>
      <div className="grid-4">
        {features.map((f, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: '#64748b', fontSize: 14 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section style={{ background: '#f1f5f9', padding: '60px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to get started?</h2>
      <p style={{ color: '#64748b', marginBottom: 28 }}>Join thousands of patients who trust Smart Care for their healthcare needs.</p>
      <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
    </section>

    <footer style={{ background: '#1e293b', color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: '24px' }}>
      <p>© 2024 Smart Care. All rights reserved.</p>
    </footer>
  </>
);

export default Home;

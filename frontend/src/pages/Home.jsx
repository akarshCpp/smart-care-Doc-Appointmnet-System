import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import brandHero from '../assets/brand-hero.png';
import { 
  HiOutlineSearch, 
  HiOutlineCalendar, 
  HiOutlineShieldCheck, 
  HiOutlineDeviceMobile,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail
} from 'react-icons/hi';

const features = [
  { icon: <HiOutlineSearch />, title: 'Find Specialists', desc: 'Search and filter doctors by specialization, rating, and availability.' },
  { icon: <HiOutlineCalendar />, title: 'Easy Booking', desc: 'Book appointments with just a few clicks. Choose your preferred time slot.' },
  { icon: <HiOutlineShieldCheck />, title: 'Secure & Private', desc: 'Your health data is protected with industry-grade security measures.' },
  { icon: <HiOutlineDeviceMobile />, title: '24/7 Access', desc: 'Manage your appointments anytime, anywhere from any device.' },
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
    <section className="hero" style={{ padding: '60px 24px 80px', textAlign: 'left' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
        <div className="hero-content" style={{ textAlign: 'left', margin: 0 }}>
          <h1 style={{ fontSize: 64 }}>Healthcare made simple and accessible.</h1>
          <p style={{ margin: '0 0 40px' }}>
            Book appointments with world-class specialists in minutes. Experience a seamless, 
            digital-first approach to managing your health and wellbeing.
          </p>
          <div className="flex-center gap-3" style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <Link
              to="/doctors"
              className="btn btn-lg"
              style={{
                background: 'var(--primary)',
                color: 'white',
                fontWeight: 700,
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '18px 36px'
              }}
            >
              <HiOutlineSearch size={22} /> Find Doctors
            </Link>
            <Link
              to="/register"
              className="btn btn-lg"
              style={{
                background: 'transparent',
                color: 'var(--primary-dark)',
                border: '2px solid var(--primary-soft)',
                borderRadius: 50,
                fontWeight: 700,
                padding: '18px 36px'
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <img src={brandHero} alt="Smart Care Branding" style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius)' }} />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container">
        <div className="hero-stats" style={{ marginTop: 80 }}>
          {stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section style={{ padding: '60px 24px', background: 'var(--primary-light)' }}>
      <div className="container">
        <div className="grid-4">
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: 40, color: 'var(--primary)', marginBottom: 5 }}>{stat.value}</h2>
              <p style={{ color: 'var(--gray-700)', fontWeight: 600 }}>{stat.label}</p>
            </div>
          ))}
        </div>
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

    {/* How it Works Section */}
    <section style={{ padding: '100px 24px', background: 'white' }}>
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Get professional healthcare in just three simple steps</p>
        <div className="grid-3" style={{ marginTop: 60 }}>
          <div className="text-center" style={{ animation: 'fadeInUp 0.5s ease both' }}>
            <div style={{ 
              width: 80, height: 80, background: 'var(--primary-light)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: 32, margin: '0 auto 24px',
              color: 'var(--primary)'
            }}>1</div>
            <h3 style={{ fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 12 }}>Find your Doctor</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: 15 }}>Browse through our extensive list of certified specialists by name or expertise.</p>
          </div>
          <div className="text-center" style={{ animation: 'fadeInUp 0.5s ease both', animationDelay: '0.1s' }}>
            <div style={{ 
              width: 80, height: 80, background: 'var(--primary-light)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: 32, margin: '0 auto 24px',
              color: 'var(--primary)'
            }}>2</div>
            <h3 style={{ fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 12 }}>Book Appointment</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: 15 }}>Choose a date and time slot that fits your schedule perfectly. Fast and easy.</p>
          </div>
          <div className="text-center" style={{ animation: 'fadeInUp 0.5s ease both', animationDelay: '0.2s' }}>
            <div style={{ 
              width: 80, height: 80, background: 'var(--primary-light)', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: 32, margin: '0 auto 24px',
              color: 'var(--primary)'
            }}>3</div>
            <h3 style={{ fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 12 }}>Get Consultation</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: 15 }}>Meet your doctor at the scheduled time and receive top-tier personalized care.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section style={{ padding: '100px 24px', background: 'var(--gray-50)' }}>
      <div className="container">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">Real feedback from people who trust Smart Care</p>
        <div className="grid-3" style={{ marginTop: 60 }}>
          {[
            { name: "Sarah Johnson", text: "The booking process was incredibly smooth. I found a specialist and had my appointment confirmed within minutes!" },
            { name: "Michael Chen", text: "Smart Care has transformed how I manage my family's health. The doctors are top-notch and the platform is so intuitive." },
            { name: "Emily Rodriguez", text: "Finally, a healthcare platform that values my time. No more waiting on hold—everything is digital and efficient." }
          ].map((t, i) => (
            <div key={i} className="card" style={{ padding: 40, border: 'none', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ color: 'var(--primary)', fontSize: 32, marginBottom: 20 }}>\"</div>
              <p style={{ color: 'var(--gray-700)', fontStyle: 'italic', marginBottom: 24, lineHeight: 1.8 }}>{t.text}</p>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-soft)' }}></div>
                <div style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="cta-section" style={{ padding: '80px 24px' }}>
      <div className="container">
        <h2 style={{ fontSize: 36 }}>Join Smart Care Today</h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 40 }}>Experience the future of healthcare management with our professional platform.</p>
        <div className="flex-center gap-3">
          <Link to="/register" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 800, borderRadius: 50, padding: '18px 40px' }}>
            Create Your Account
          </Link>
          <Link to="/doctors" className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '2px solid white', borderRadius: 50, padding: '18px 40px' }}>
            Browse Doctors
          </Link>
        </div>
      </div>
    </section>

    {/* Expanded Footer */}
    <footer style={{ background: 'var(--primary-dark)', padding: '80px 24px 40px', color: 'white' }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: 60 }}>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>Smart Care</h3>
            <p style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.8 }}>
              Making healthcare accessible and efficient for everyone. Book appointments with qualified professionals within minutes.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 20, fontSize: 16 }}>For Patients</h4>
            <ul style={{ listStyle: 'none', opacity: 0.7, fontSize: 14 }}>
              <li style={{ marginBottom: 10 }}><Link to="/doctors" style={{ color: 'white', textDecoration: 'none' }}>Search Doctors</Link></li>
              <li style={{ marginBottom: 10 }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Book Appointment</Link></li>
              <li style={{ marginBottom: 10 }}><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Patient Join</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 20, fontSize: 16 }}>For Doctors</h4>
            <ul style={{ listStyle: 'none', opacity: 0.7, fontSize: 14 }}>
              <li style={{ marginBottom: 10 }}><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Join as Doctor</Link></li>
              <li style={{ marginBottom: 10 }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Doctor Login</Link></li>
              <li style={{ marginBottom: 10 }}><Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: 20, fontSize: 16 }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', opacity: 0.7, fontSize: 14 }}>
              <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <HiOutlineLocationMarker /> 123 Health Ave, Medical City
              </li>
              <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <HiOutlinePhone /> +1 (555) 000-1234
              </li>
              <li style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <HiOutlineMail /> support@smartcare.com
              </li>
            </ul>
          </div>
        </div>
        <div style={{ pt: 40, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', opacity: 0.5, fontSize: 12 }}>
          © 2024 Smart Care. All rights reserved.
        </div>
      </div>
    </footer>
  </>
);

export default Home;

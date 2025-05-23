import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Learning Experience</h1>
          <p className="hero-subtitle">AI-powered personalized education that adapts to your unique learning style</p>
          <div className="hero-cta">
            <Link to="/courses" className="cta-btn primary">Explore Courses</Link>
            <Link to="/auth" className="cta-btn secondary">Join Now</Link>
          </div>
        </div>
        <div className="hero-image"></div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose EduConnect?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Learning Support</h3>
            <p>Get real-time explanations and answers to all your academic questions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Paths</h3>
            <p>Learning journeys tailored to your strengths and weaknesses.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Progress Tracking</h3>
            <p>Visualize your improvement with detailed analytics and reports.</p>
          </div>
        </div>
      </section>

      <section className="workforce-section">
        <div className="workforce-content">
          <h2>Ready for the Workforce?</h2>
          <p>Bridge the gap between academics and career with our specialized preparation program.</p>
          <Link to="/workforce" className="workforce-cta">Start Workforce Prep</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
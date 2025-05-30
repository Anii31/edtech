import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import AuthPage from './components/auth/auth';
import Profile from './components/Profile/profile';
import WorkforceDashboard from './workforce/dashboard/dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="brand">
              <span className="brand-name">EduConnect</span>
              <span className="brand-tagline">Learn. Grow. Succeed.</span>
            </Link>
            <nav className="main-nav">
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
                </>
              ) : (
                <Link to="/auth" className="nav-link login-btn">Login/Signup</Link>
              )}
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/workforce" element={<WorkforceDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route 
              path="/auth" 
              element={isAuthenticated ? <Navigate to="/profile" /> : <AuthPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p className="copyright">© 2025 EduConnect. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

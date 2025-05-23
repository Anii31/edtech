import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!isLogin && !formData.name) newErrors.name = 'Name is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
      }

      const user = userCredential.user;

      onLogin({
        name: user.displayName || formData.name,
        email: user.email,
        joinDate: user.metadata.creationTime
      });
    } catch (error) {
      setErrors({ auth: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`auth-container ${isLogin ? 'login-mode' : 'signup-mode'}`}>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {errors.auth && <div className="error-message auth-error">{errors.auth}</div>}

            <button type="submit" disabled={isSubmitting} className="auth-btn">
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : isLogin ? (
                'Login'
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? (
              <>
                <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
              </>
            ) : (
              <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
            )}
          </div>
        </div>
      </div>

      <div className="auth-animation-container">
        <div className="animation-circle circle-1"></div>
        <div className="animation-circle circle-2"></div>
        <div className="animation-circle circle-3"></div>
        <div className="animation-content">
          <h2>{isLogin ? 'New Here?' : 'Welcome!'}</h2>
          <p>
            {isLogin 
              ? 'Sign up and discover great features!' 
              : 'Login to access your personalized dashboard'}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="animation-btn"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

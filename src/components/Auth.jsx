import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 1, text: 'Weak' };
    if (score <= 3) return { level: 2, text: 'Medium' };
    if (score <= 4) return { level: 3, text: 'Strong' };
    return { level: 4, text: 'Very Strong' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        }
      } else {
        if (formData.password.length < 6) {
          setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
          setLoading(false);
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({
            type: 'success',
            text: 'Account created! Please check your email to verify your account.',
          });
          setFormData({ fullName: '', email: '', password: '' });
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    }

    setLoading(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage({ type: '', text: '' });
    setFormData({ fullName: '', email: '', password: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-orb" />
      <div className="auth-container">
        <div className="auth-branding">
          <div className="auth-logo">🎯 EAMCET Predictor</div>
          <p>Predict your rank with confidence</p>
        </div>

        <div className="auth-card">
          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setMessage({ type: '', text: '' }); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setMessage({ type: '', text: '' }); }}
            >
              Sign Up
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`auth-message ${message.type}`}>
              <span className="msg-icon">
                {message.type === 'error' ? '⚠️' : '✅'}
              </span>
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name - signup only */}
            {!isLogin && (
              <div className="auth-input-group">
                <label>
                  <span className="label-icon">👤</span>
                  Full Name
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required={!isLogin}
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="auth-input-group">
              <label>
                <span className="label-icon">✉️</span>
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <label>
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                  required
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Password strength - signup only */}
              {!isLogin && formData.password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`strength-bar ${
                          passwordStrength.level >= level ? 'filled' : ''
                        } ${
                          passwordStrength.level >= 3
                            ? 'strong'
                            : passwordStrength.level >= 2
                            ? 'medium'
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="strength-text">{passwordStrength.text}</span>
                </>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
              id="auth-submit-btn"
            >
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? '🚀 Sign In' : '✨ Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <a onClick={switchMode}>Sign up</a>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <a onClick={switchMode}>Sign in</a>
              </p>
            )}
          </div>
        </div>

        <div className="auth-bottom-link">
          <a href="/">← Back to predictor</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;

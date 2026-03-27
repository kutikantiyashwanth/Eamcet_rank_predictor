import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';
import App from './App.jsx';
import Auth from './components/Auth.jsx';

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();

  // If Supabase isn't configured, show the app without auth
  if (!isConfigured) {
    return children;
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e1a',
        color: '#a78bfa',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.1rem',
        gap: '12px',
      }}>
        <span className="loading-spinner" style={{
          display: 'inline-block',
          width: 24, height: 24,
          border: '3px solid rgba(167, 139, 250, 0.2)',
          borderTopColor: '#a78bfa',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// Auth route - redirects to home if already logged in
function AuthRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();

  if (!isConfigured) {
    // Even if not configured, show the auth page so the user sees the UI
    return children;
  }

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

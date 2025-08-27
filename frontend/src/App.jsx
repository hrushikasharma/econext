// CRITICAL: Make sure this line imports useState and useEffect!
import React, { useState, useEffect } from 'react';

// CRITICAL: Make sure this path correctly points to your Dashboard component.
import Dashboard from './components/Dashboard';
import CarbonFootprintForm from './components/CarbonFootprintForm';

// --- THIS IS THE NEW, IMPORTANT PART ---
// Once you deploy your backend, replace this placeholder with your real Railway URL
const API_BASE_URL = "https://your-backend-url.up.railway.app";
// For local testing, you can use: const API_BASE_URL = "http://localhost:8080";


// --- LOGIN PAGE COMPONENT ---
function LoginPage() {
  const handleGoogleLogin = () => {
    // Use the API_BASE_URL variable
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const styles = {
    loginContainer: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0fff4, #568F87)', padding: '1rem', boxSizing: 'border-box',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    loginCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '1rem',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '2.5rem', width: '100%', maxWidth: '400px', textAlign: 'center', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
    },
    logoContainer: {
      width: '5rem', height: '5rem', borderRadius: '50%', background: 'linear-gradient(to bottom right, #a7f3d0, #fef08a)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.5rem',
    },
    logoIcon: { fontSize: '2.5rem', color: '#065f46' },
    welcomeTitle: { fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' },
    welcomeSubtitle: { color: '#4b5563', marginBottom: '2rem' },
    googleBtn: {
      width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', fontWeight: '600',
      border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex',
      alignItems: 'center', justifyContent: 'center', gap: '0.75rem', backgroundColor: '#ffffff',
      color: '#374151', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}><span style={styles.logoIcon}>🌿</span></div>
        <h1 style={styles.welcomeTitle}>Welcome to EcoNext</h1>
        <p style={styles.welcomeSubtitle}>Sign in to track your carbon footprint.</p>
        <button onClick={handleGoogleLogin} style={styles.googleBtn}>
          <svg style={{width: '1.25rem', height: '1.25rem'}} viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.356-11.303-7.918l-6.522,5.023C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,36.623,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Use the API_BASE_URL variable
    fetch(`${API_BASE_URL}/api/userinfo`, {
      method: 'GET',
      credentials: 'include', // Important to send cookies/session
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
      .then((data) => {
          setUser({ name: data.name }); // Use name, not email
      })
      .catch(() => {
        setUser(null);
      });
  }, []);


  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Dashboard name={user.name} onLogout={handleLogout} />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

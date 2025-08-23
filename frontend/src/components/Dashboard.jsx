import CarbonFootprintForm from './CarbonFootprintForm';
import React, { useState } from 'react';

// Inline styles for the dashboard component
const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0fff4, #e6fffa)',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxSizing: 'border-box',
    padding: '2rem',
  },
  header: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#065f46', // Dark Emerald
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: '#34d399', // Emerald 400
    color: '#064e3b', // Emerald 800
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  welcomeMessage: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#047857', // Emerald 600
    marginBottom: '2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  cardText: {
    color: '#4b5563',
    marginBottom: '1.5rem',
  },
  cardButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: '#facc15', // Yellow 400
    color: '#78350f', // Yellow 900
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};


export default function Dashboard({ name, onLogout }) {
    const [showForm, setShowForm] = useState(false);

      if (showForm) {
        return (
          <div style={{ padding: '2rem'}}>
            <button onClick={() => setShowForm(false)} style={{ marginBottom: '1rem' }}>
              ← Back to Dashboard
            </button>
            <CarbonFootprintForm />
          </div>
        );
      }

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <div style={styles.logo}>🌿 EcoNext</div>
        <button style={styles.logoutButton} onClick={onLogout}>
          Log Out
        </button>
      </header>

      <h1 style={styles.welcomeMessage}>Welcome, {name}!</h1>

      <div style={styles.grid}>
        {/* Card 1: Main Action */}
        <div style={styles.card}>
          <div style={styles.cardIcon}>👣</div>
          <h2 style={styles.cardTitle}>Calculate Your Footprint</h2>
          <p style={styles.cardText}>Answer a few simple questions about your lifestyle to calculate your carbon footprint.</p>
          <button style={styles.cardButton}
            onClick={() => setShowForm(true)}>Get Started</button>
        </div>

        {/* Card 2: Score */}
        <div style={styles.card}>
          <div style={styles.cardIcon}>🌍</div>
          <h2 style={styles.cardTitle}>Your Eco-Score</h2>
          <p style={styles.cardText}>Check your current score and track your progress over time. Aim for a greener score!</p>
          <button style={styles.cardButton}>View My Score</button>
        </div>

        {/* Card 3: Tips */}
        <div style={styles.card}>
          <div style={styles.cardIcon}>💡</div>
          <h2 style={styles.cardTitle}>Green Tips</h2>
          <p style={styles.cardText}>Discover personalized tips and challenges to help you reduce your environmental impact.</p>
          <button style={styles.cardButton}>Learn More</button>
        </div>
      </div>
    </div>
  );
}
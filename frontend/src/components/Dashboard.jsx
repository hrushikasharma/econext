import React, { useState, useEffect } from 'react';

// --- CarbonFootprintForm Component (Unaltered as per your request) ---
const CarbonFootprintForm = ({ onBack, onCalculationSuccess }) => {
  const [formData, setFormData] = useState({
    drivingKmPerWeek: '',
    annualFlights: '',
    energyType: '',
    meatMealsPerWeek: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/footprint/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData && responseData.message) {
          throw new Error(responseData.message);
        }
        throw new Error('Something went wrong on the server');
      }

      setResult({
        carbonFootprint: responseData.carbonFootprint.toFixed(2),
        message: 'Your result has been saved to your profile!',
      });
      if (onCalculationSuccess) {
        onCalculationSuccess();
      }
    } catch (error) {
      console.error('Failed to submit footprint data:', error);
      setResult({
        carbonFootprint: 'Error',
        message: error.message || 'Could not connect to the server.',
      });
    }
  };

  const colors = { green: '#047857', yellow: '#facc15', darkGreen: '#064e3b', lightYellow: '#fff9db', grayText: '#374151' };
  const formContainerStyle = { maxWidth: '500px', width: '100%', padding: '2rem', borderRadius: '12px', backgroundColor: colors.lightYellow, boxShadow: '0 8px 24px rgba(4, 120, 87, 0.2)', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: colors.grayText };
  const labelStyle = { display: 'block', marginBottom: '0.25rem', marginTop: '1rem', fontWeight: '600', fontSize: '1rem' };
  const inputStyle = { display: 'block', width: '100%', padding: '0.5rem', backgroundColor: 'white', color: colors.grayText, fontSize: '1rem', borderRadius: '6px', border: `1.5px solid #d1d5db`, outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={onBack} style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>
        ← Back to Dashboard
      </button>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: 'center', color: colors.green, marginBottom: '1.5rem' }}>Calculate Your Carbon Footprint</h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Kilometers driven per week?</label>
          <input style={inputStyle} type="number" name="drivingKmPerWeek" value={formData.drivingKmPerWeek} onChange={handleChange} placeholder="e.g. 100" min="0" required />
          <label style={labelStyle}>Flights per year?</label>
          <input style={inputStyle} type="number" name="annualFlights" value={formData.annualFlights} onChange={handleChange} placeholder="e.g. 2" min="0" required />
          <label style={labelStyle}>Home energy type?</label>
          <select style={inputStyle} name="energyType" value={formData.energyType} onChange={handleChange} required>
            <option value="" disabled>Select energy type</option>
            <option value="renewable">Renewable</option>
            <option value="nonRenewable">Non-renewable</option>
          </select>
          <label style={labelStyle}>Meat-based meals per week?</label>
          <input style={inputStyle} type="number" name="meatMealsPerWeek" value={formData.meatMealsPerWeek} onChange={handleChange} placeholder="e.g. 5" min="0" max="21" required />
          <button type="submit" style={{ display: 'block', width: '100%', padding: '0.75rem', marginTop: '1.5rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', color: colors.green, backgroundColor: colors.yellow, border: 'none', cursor: 'pointer' }}>
            Calculate
          </button>
        </form>
        {result && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: result.carbonFootprint === 'Error' ? '#991b1b' : colors.darkGreen,
            color: colors.yellow,
            borderRadius: '10px',
            textAlign: 'center',
            border: `2px solid ${colors.yellow}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {result.carbonFootprint !== 'Error' && (
              <>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Your Estimated Carbon Footprint:</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>{result.carbonFootprint} tons CO₂/year</p>
              </>
            )}
            <p style={{ margin: 0, fontStyle: 'italic', color: 'white' }}>{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};


// --- Main Dashboard Component (Only this part is modified) ---
const styles = {
  dashboardContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0fff4, #e6fffa)', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", boxSizing: 'border-box', padding: '2rem' },
  header: { width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '1rem' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#065f46' },
  scoreDisplay: { backgroundColor: '#064e3b', color: '#facc15', padding: '0.5rem 1rem', borderRadius: '1.5rem', fontSize: '1rem', fontWeight: 'bold', border: '2px solid #facc15', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' },
  logoutButton: { padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', backgroundColor: '#34d399', color: '#064e3b', fontWeight: '600', cursor: 'pointer' },
  welcomeMessage: { fontSize: '2.5rem', fontWeight: 'bold', color: '#047857', marginBottom: '2rem', textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '2rem', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', textAlign: 'center' },
  cardIcon: { fontSize: '3rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' },
  cardText: { color: '#4b5563', marginBottom: '1.5rem' },
  cardButton: { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '0.5rem', backgroundColor: '#facc15', color: '#78350f', fontWeight: 'bold', cursor: 'pointer' },
  // --- NEW STYLE FOR THE MESSAGE BOX ---
  limitMessageBox: { position: 'fixed', top: '20px', right: '20px', padding: '1rem 1.5rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1000, transition: 'opacity 0.5s ease' },
};

export default function Dashboard({ name, onLogout }) {
    const [showForm, setShowForm] = useState(false);
    // --- MODIFIED STATE: Store the whole log object now ---
    const [latestLog, setLatestLog] = useState(null);
    const [showLimitMessage, setShowLimitMessage] = useState(false);

    const fetchLatestScore = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/footprint/latest', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                if (data.latestScore) {
                    // Store the entire object { latestScore, logDate }
                    setLatestLog(data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch latest score:", error);
        }
    };

    useEffect(() => {
        fetchLatestScore();
    }, []);

    const handleNewCalculation = () => {
        fetchLatestScore();
        setShowForm(false); // Go back to the dashboard after successful calculation
    };

    // --- NEW FUNCTION TO HANDLE THE BUTTON CLICK ---
    const handleGetStartedClick = () => {
        if (latestLog && latestLog.logDate) {
            const lastLogDate = new Date(latestLog.logDate);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            if (lastLogDate > oneWeekAgo) {
                // If it's too soon, show the message and stop
                setShowLimitMessage(true);
                setTimeout(() => setShowLimitMessage(false), 4000); // Hide after 4 seconds
                return;
            }
        }
        // If the check passes, show the form
        setShowForm(true);
    };

    if (showForm) {
        return <CarbonFootprintForm onBack={() => setShowForm(false)} onCalculationSuccess={handleNewCalculation} />;
    }

  return (
    <div style={styles.dashboardContainer}>
      {/* --- NEW JSX FOR THE MESSAGE BOX --- */}
      {showLimitMessage && (
        <div style={styles.limitMessageBox}>
            You can only calculate once a week. <br />
            Your latest score was {latestLog.latestScore.toFixed(2)} tCO₂/year.
        </div>
      )}

      <header style={styles.header}>
        <div style={styles.logoContainer}>
            <div style={styles.logo}>🌿 EcoNext</div>
            {/* --- MODIFIED TO READ FROM LATESTLOG OBJECT --- */}
            {latestLog && (
                <div style={styles.scoreDisplay}>
                    Latest Footprint: {latestLog.latestScore.toFixed(2)} tCO₂/year
                </div>
            )}
        </div>
        <button style={styles.logoutButton} onClick={onLogout}>
          Log Out
        </button>
      </header>

      <h1 style={styles.welcomeMessage}>Welcome, {name}!</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>👣</div>
          <h2 style={styles.cardTitle}>Calculate Your Footprint</h2>
          <p style={styles.cardText}>Answer a few simple questions about your lifestyle to calculate your carbon footprint.</p>
          {/* --- MODIFIED ONCLICK HANDLER --- */}
          <button style={styles.cardButton} onClick={handleGetStartedClick}>Get Started</button>
        </div>
        <div style={styles.card}>
          <div style={styles.cardIcon}>🌍</div>
          <h2 style={styles.cardTitle}>Your Eco-Score</h2>
          <p style={styles.cardText}>Check your current score and track your progress over time. Aim for a greener score!</p>
          <button style={styles.cardButton}>View My Score</button>
        </div>
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

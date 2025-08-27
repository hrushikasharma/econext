import React, { useState } from 'react';

const API_BASE_URL = "https://your-backend-url.up.railway.app";

const colors = {
  green: '#047857',
  yellow: '#facc15',
  darkGreen: '#035d4f',
  lightYellow: '#fff9db',
  grayText: '#374151',
  borderGray: '#d1d5db',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.25rem',
  marginTop: '1rem',
  fontWeight: '600',
  fontSize: '1rem',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '0.5rem',
  backgroundColor: 'white',
  color: colors.grayText,
  fontSize: '1rem',
  borderRadius: '6px',
  border: `1.5px solid #d1d5db`,
  outline: 'none',
  boxSizing: 'border-box'
};

const CarbonFootprintForm = () => {
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
    e.preventDefault(); // Prevent the form from reloading the page
    try {
      // --- THIS IS THE MODIFIED LINE ---
      const response = await fetch(`${API_BASE_URL}/api/footprint/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include Authorization header if you are using token-based auth
          // 'Authorization': 'Bearer ' + yourAuthToken,
        },
        body: JSON.stringify(formData), // Convert the data to a JSON string
        credentials: 'include', // Important: include cookies/session in requests
      });
      if (!response.ok) {
        throw new Error('Something went wrong on the server');
      }
      const responseData = await response.json();
      setResult({
        carbonFootprint: responseData.carbonFootprint.toFixed(2),
        message: 'Your result has been saved to your profile!',
      });
    } catch (error) {
      console.error('Failed to submit footprint data:', error);
      setResult({
        carbonFootprint: 'Error',
        message: 'Could not connect to the server. Please try again later.',
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
        borderRadius: '12px',
        backgroundColor: colors.lightYellow,
        boxShadow: '0 8px 24px rgba(4, 120, 87, 0.2)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: colors.grayText,
      }}
    >
      <h2 style={{ textAlign: 'center', color: colors.green, marginBottom: '1.5rem' }}>
        Calculate Your Carbon Footprint
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>How many kilometers do you drive per week?</label>
        <input
          style={inputStyle}
          type="number"
          name="drivingKmPerWeek"
          value={formData.drivingKmPerWeek}
          onChange={handleChange}
          placeholder="e.g. 100"
          min="0"
          required
        />
        <label style={labelStyle}>How many flights do you take per year?</label>
        <input
          style={inputStyle}
          type="number"
          name="annualFlights"
          value={formData.annualFlights}
          onChange={handleChange}
          placeholder="e.g. 2"
          min="0"
          required
        />
        <label style={labelStyle}>What type of energy do you use at home?</label>
        <select
          style={inputStyle}
          name="energyType"
          value={formData.energyType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select energy type
          </option>
          <option value="renewable">Renewable (solar, wind, hydro)</option>
          <option value="nonRenewable">Non-renewable (coal, gas, oil)</option>
        </select>
        <label style={labelStyle}>How many meat-based meals do you eat per week?</label>
        <input
          style={inputStyle}
          type="number"
          name="meatMealsPerWeek"
          value={formData.meatMealsPerWeek}
          onChange={handleChange}
          placeholder="e.g. 5"
          min="0"
          max="21"
          required
        />
        <button
          type="submit"
          style={{
            display: 'block',
            width: '100%',
            padding: '0.75rem',
            marginTop: '1.5rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: colors.green,
            backgroundColor: colors.yellow,
            border: 'none',
            cursor: 'pointer',
            boxShadow: `0 4px 15px ${colors.green}77`,
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.lightYellow)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.yellow)}
        >
          Calculate
        </button>
      </form>
      {result && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: colors.green,
            color: 'white',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <h3>Your Estimated Carbon Footprint: {result.carbonFootprint} tons CO₂/year</h3>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintForm;

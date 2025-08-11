import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import { useTheme } from './context/ThemeContext.jsx';

/**
 * Main App component - A beautiful glassmorphism weather application
 * Features: Real-time weather data, dark/light theme toggle, local time display
 */
function App() {
  // Theme context for dark/light mode switching
  const { darkMode, toggleTheme } = useTheme();
  
  // Weather data state - stores the API response
  const [weather, setWeather] = useState(null);
  
  // Error handling state for API failures or invalid cities
  const [error, setError] = useState('');

  /**
   * Fetches weather data from OpenWeatherMap API
   * @param {string} city - The city name to search for
   */
  const fetchWeather = async (city) => {
    // OpenWeatherMap API configuration
    const apiKey = '915bce0e7658b8f41f5aa015b0ffca17'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // Handle API error responses (e.g., city not found)
      if (data.cod === '404') {
        throw new Error('City not found');
      }

      // Update state with successful weather data
      setWeather(data);
      setError('');
    } catch (err) {
      // Clear weather data and show error message
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    // Main container with dynamic gradient background
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8
        ${darkMode ? 'from-gray-900 via-gray-800 to-gray-700' : ''}`}
    >
      {/* Glassmorphism weather card container */}
      <div
        className={`weather-card backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-sm w-full border transition-all duration-300 hover:shadow-3xl
          ${darkMode 
            ? 'bg-black/20 border-white/10 text-white' 
            : 'bg-white/20 border-white/20 text-gray-800'
          }`}
      >
        {/* Header with app title and theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light tracking-wide">Weather</h1>
          {/* Theme toggle button with emoji icons */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110
              ${darkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-black/10 hover:bg-black/20 text-gray-800'
              }`}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <SearchBar onSearch={fetchWeather} />

        {/* Error message display with styled background */}
        {error && <p className="text-red-400 mb-4 text-center p-3 bg-red-100/20 rounded-xl">{error}</p>}

        {/* Weather data display - only show when data is available */}
        {weather && (
          <>
            <WeatherCard data={weather} />
            <Clock timezoneOffset={weather.timezone} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

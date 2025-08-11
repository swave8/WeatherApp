import React, { useState } from 'react';

/**
 * SearchBar Component - Glassmorphism search input with integrated search button
 * @param {Function} onSearch - Callback function to handle city search
 */
function SearchBar({ onSearch }) {
  // Local state for city input value
  const [city, setCity] = useState('');

  /**
   * Handles form submission and triggers search
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only search if city name is not empty after trimming whitespace
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        {/* Search input with glassmorphism styling */}
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-lg 
            placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent
            transition-all duration-200 hover:bg-white/25"
        />
        {/* Search button positioned absolutely inside input */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-white/20 
            hover:bg-white/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🔍
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

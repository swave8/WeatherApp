import React from 'react';

/**
 * WeatherCard Component - Displays weather information in a clean, minimal layout
 * @param {Object} data - Weather data object from OpenWeatherMap API
 */
const WeatherCard = ({ data }) => {
  // Validate that all required data properties exist
  if (!data || !data.sys || !data.main || !data.weather || !data.wind) {
    return <p className="text-red-600 mt-4">Invalid weather data.</p>;
  }

  return (
    <div className="space-y-6 text-center animate-fade-in">
      {/* City name and country */}
      <div className="space-y-2">
        <h2 className="text-3xl font-light">
          {data.name}
        </h2>
        <p className="text-sm opacity-75">{data.sys.country}</p>
      </div>
      
      <div className="space-y-4">
        {/* Main temperature and weather description */}
        <div className="text-center">
          <div className="text-6xl font-thin mb-2">
            {Math.round(data.main.temp)}°
          </div>
          <p className="text-xl font-light capitalize">
            {data.weather[0].description}
          </p>
        </div>
        
        {/* Additional weather metrics in a grid layout */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
          <div className="space-y-1">
            <p className="text-sm opacity-75">Humidity</p>
            <p className="text-lg font-light">{data.main.humidity}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-75">Wind</p>
            <p className="text-lg font-light">{data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

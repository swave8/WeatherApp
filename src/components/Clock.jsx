import React, { useEffect, useState } from 'react';

/**
 * Clock Component - Displays local time for the searched city
 * @param {number} timezoneOffset - Timezone offset in seconds from UTC
 */
const Clock = ({ timezoneOffset }) => {
  // State to store the formatted local time string
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    // Don't update clock if timezone offset is not provided
    if (timezoneOffset === undefined) return;

    /**
     * Updates the clock display with current local time for the city
     */
    const updateClock = () => {
      // Calculate current UTC time in milliseconds
      const nowUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
      // Add timezone offset to get local time for the city
      const local = new Date(nowUTC + timezoneOffset * 1000);
      // Format time as readable string
      setLocalTime(local.toLocaleTimeString());
    };

    // Initial clock update
    updateClock();
    // Set up interval to update clock every second
    const interval = setInterval(updateClock, 1000);
    
    // Cleanup interval on component unmount or timezone change
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return (
    <div className="pt-6 border-t border-white/20 text-center">
      {/* Local time label */}
      <p className="text-sm opacity-75 mb-1">Local Time</p>
      {/* Current time display with enhanced typography */}
      <p className="text-lg font-light tracking-wide">{localTime}</p>
    </div>
  );
};

export default Clock;

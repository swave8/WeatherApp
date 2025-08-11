import { createContext, useState, useEffect, useContext } from 'react';

/**
 * Theme Context - Manages dark/light mode state across the application
 * Persists theme preference in localStorage
 */
const ThemeContext = createContext();

/**
 * ThemeProvider Component - Provides theme context to child components
 * @param {ReactNode} children - Child components that need access to theme
 */
export const ThemeProvider = ({ children }) => {
  // Initialize dark mode state from localStorage, default to false (light mode)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  // Effect to apply theme changes to DOM and localStorage
  useEffect(() => {
    if (darkMode) {
      // Add dark class to html element for Tailwind dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Remove dark class for light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  /**
   * Toggle between dark and light mode
   */
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 * @returns {Object} Object containing darkMode state and toggleTheme function
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

import React, { useState, useEffect } from 'react';
import './Preloader.css';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep the preloader visible for 1.8 seconds on initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader-container ${!loading ? 'hidden' : ''}`}>
      <div className="preloader-logo">
        <img src="/ams-icon.png" alt="Loading..." />
      </div>
    </div>
  );
};

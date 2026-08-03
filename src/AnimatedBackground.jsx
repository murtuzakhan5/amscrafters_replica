import React from 'react';
import './animated-bg.css';

export const AnimatedBackground = () => {
  return (
    <div className="animated-bg-container">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-grid"></div>
      
      {/* Vertical Running Lines */}
      <div className="animated-line-vertical" style={{ left: '15%', animationDelay: '0s', animationDuration: '6s' }}></div>
      <div className="animated-line-vertical" style={{ left: '45%', animationDelay: '2s', animationDuration: '8s' }}></div>
      <div className="animated-line-vertical" style={{ left: '85%', animationDelay: '1s', animationDuration: '5s' }}></div>
      
      {/* Horizontal Running Lines */}
      <div className="animated-line-horizontal" style={{ top: '25%', animationDelay: '1.5s', animationDuration: '9s' }}></div>
      <div className="animated-line-horizontal" style={{ top: '65%', animationDelay: '3s', animationDuration: '7s' }}></div>
    </div>
  );
};

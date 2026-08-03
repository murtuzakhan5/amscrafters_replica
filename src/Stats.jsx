import React from 'react';
import './components.css';

export const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card border-right">
          <span className="stat-number">50+</span>
          <span className="stat-label">Happy Clients</span>
        </div>
        <div className="stat-card border-right">
          <span className="stat-number">120+</span>
          <span className="stat-label">Projects Delivered</span>
        </div>
        <div className="stat-card border-right">
          <span className="stat-number">5+</span>
          <span className="stat-label">Years of Experience</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">98%</span>
          <span className="stat-label">Client Satisfaction</span>
        </div>
      </div>
    </section>
  );
};

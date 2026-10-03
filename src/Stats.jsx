import React from 'react';
import './components.css';
import { CountUp } from './CountUp';

export const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card border-right">
          <span className="stat-number"><CountUp end={50} suffix="+" /></span>
          <span className="stat-label">Happy Clients</span>
        </div>
        <div className="stat-card border-right">
          <span className="stat-number"><CountUp end={120} suffix="+" /></span>
          <span className="stat-label">Projects Delivered</span>
        </div>
        <div className="stat-card border-right">
          <span className="stat-number"><CountUp end={5} suffix="+" /></span>
          <span className="stat-label">Years of Experience</span>
        </div>
        <div className="stat-card">
          <span className="stat-number"><CountUp end={98} suffix="%" /></span>
          <span className="stat-label">Client Satisfaction</span>
        </div>
      </div>
    </section>
  );
};

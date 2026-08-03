import React from 'react';
import './components.css';

export const Process = () => {
  return (
    <section className="process-section">
      <div className="process-container">
        <div className="process-left">
          <span className="section-badge">
            <span className="badge-dot"></span>
            Our Process
          </span>
          <h2 className="process-title">
            How we bring your <span className="text-gradient">brand</span> to life,<br/>step by step
          </h2>
          <p className="process-desc">
            A proven four-step process built to deliver results — on time, every time.
          </p>
          <a href="/consultation" className="btn-primary" style={{marginTop: '16px'}}>
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </a>
        </div>
        
        <div className="process-right">
          <div className="process-line"></div>
          
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <span className="step-name">Discover</span>
              <p className="step-title">Deep-dive discovery</p>
              <p className="step-desc">We research your brand, goals, audience, and competitors to build a bulletproof strategy foundation.</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <span className="step-name">Design</span>
              <p className="step-title">Pixel-perfect design</p>
              <p className="step-desc">Our designers craft visuals that align with your brand identity and conversion goals.</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <span className="step-name">Build</span>
              <p className="step-title">Clean, scalable code</p>
              <p className="step-desc">Developers bring every design to life with fast, maintainable code and seamless integrations.</p>
            </div>
          </div>
          
          <div className="process-step border-none">
            <div className="step-number">04</div>
            <div className="step-content">
              <span className="step-name">Launch</span>
              <p className="step-title">Ship &amp; monitor</p>
              <p className="step-desc">We deploy, test, and watch closely — ensuring everything performs flawlessly from day one.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

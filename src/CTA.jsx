import React from 'react';
import './components.css';

export const CTA = () => {
  return (
    <section className="cta-section">
      <div className="hero-grid cta-grid-bg"></div>
      
      <div className="cta-content-wrapper">
        <div className="cta-left">
          <span className="section-badge">
            <span className="badge-dot"></span>
            Ready to grow?
          </span>
          <h2 className="cta-title">
            Let's build <span className="text-gradient">something</span><br/>great together.
          </h2>
          <p className="cta-desc">
            Book a free strategy call and see how AMS Crafters can take your brand to the next level.
          </p>
        </div>
        
        <div className="cta-right">
          <div className="cta-stats">
            <div className="cta-stat">
              <p className="cta-stat-num">50+</p>
              <p className="cta-stat-label">Brands Launched</p>
            </div>
            <div className="cta-stat-divider"></div>
            <div className="cta-stat">
              <p className="cta-stat-num">98%</p>
              <p className="cta-stat-label">Client Retention</p>
            </div>
          </div>
          
          <div className="cta-actions">
            <a href="/consultation" className="btn-primary btn-large">
              Book a Free Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </a>
            <a href="/portfolio" className="btn-outline">
              View Portfolio
            </a>
          </div>
        </div>
      </div>
      
      <div className="cta-tags-container">
        <span className="cta-tags-label">We work with</span>
        <div className="cta-tags">
          <span className="cta-tag">
            <span className="tag-dot" style={{background: 'linear-gradient(90deg,#3180b2,#1d5375)'}}></span>
            <span className="tag-text" style={{backgroundImage: 'linear-gradient(90deg,#3180b2,#1d5375)'}}>Startups</span>
          </span>
          <span className="cta-tag">
            <span className="tag-dot" style={{background: 'linear-gradient(90deg,#4fa3d8,#2b6c96)'}}></span>
            <span className="tag-text" style={{backgroundImage: 'linear-gradient(90deg,#4fa3d8,#2b6c96)'}}>Scale-ups</span>
          </span>
          <span className="cta-tag">
            <span className="tag-dot" style={{background: 'linear-gradient(90deg,#276994,#133a54)'}}></span>
            <span className="tag-text" style={{backgroundImage: 'linear-gradient(90deg,#276994,#133a54)'}}>D2C Brands</span>
          </span>
          <span className="cta-tag">
            <span className="tag-dot" style={{background: 'linear-gradient(90deg,#1d5375,#3180b2)'}}></span>
            <span className="tag-text" style={{backgroundImage: 'linear-gradient(90deg,#1d5375,#3180b2)'}}>SaaS</span>
          </span>
          <span className="cta-tag">
            <span className="tag-dot" style={{background: 'linear-gradient(90deg,#EF7B16,#276994)'}}></span>
            <span className="tag-text" style={{backgroundImage: 'linear-gradient(90deg,#EF7B16,#276994)'}}>Agencies</span>
          </span>
          <span className="cta-tag">
            <span className="tag-dot" style={{background: 'linear-gradient(90deg,#4fa3d8,#1d5375)'}}></span>
            <span className="tag-text" style={{backgroundImage: 'linear-gradient(90deg,#4fa3d8,#1d5375)'}}>Founders</span>
          </span>
        </div>
      </div>
    </section>
  );
};

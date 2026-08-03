import React from 'react';
import { Stats } from './Stats';
import { About } from './About';
import { Process } from './Process';
import { Clients } from './Clients';
import { Reviews } from './Reviews';
import { CTA } from './CTA';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-glow"></div>
      
      {/* Animated Grid Lines */}
      <div className="animated-line-h" style={{ top: '132px', animation: 'moveRight 7s linear infinite' }}></div>
      <div className="animated-line-h" style={{ top: '352px', animation: 'moveRight 9s linear infinite 3s' }}></div>
      <div className="animated-line-h" style={{ top: '264px', animation: 'moveLeft 8s linear infinite 1.5s' }}></div>
      
      <div className="animated-line-v" style={{ left: '308px', animation: 'moveDown 6s linear infinite 0.5s' }}></div>
      <div className="animated-line-v" style={{ left: '616px', animation: 'moveDown 10s linear infinite 4s' }}></div>
      <div className="animated-line-v" style={{ left: '484px', animation: 'moveUp 8s linear infinite 2s' }}></div>
      
      <div className="hero-content">
        <div className="badge">
          <span className="badge-dot"></span>
          <span className="badge-text">The Future of Design</span>
        </div>
        
        <h1 className="hero-title">
          Building Brands That 
          <span className="word-carousel">
            <span className="word-carousel-inner">
              <span className="word-slide" style={{ backgroundImage: 'linear-gradient(135deg, #3180b2, #1d5375)' }}>Stand Out</span>
              <span className="word-slide" style={{ backgroundImage: 'linear-gradient(135deg, #4fa3d8, #2b6c96)' }}>Win Big</span>
              <span className="word-slide" style={{ backgroundImage: 'linear-gradient(135deg, #276994, #133a54)' }}>Scale Fast</span>
              <span className="word-slide" style={{ backgroundImage: 'linear-gradient(135deg, #3180b2, #1d5375)' }}>Stand Out</span>
            </span>
          </span>
        </h1>
        
        <p className="hero-subtitle">
          To become a trusted partner for businesses worldwide, helping them build a lasting digital presence and strong brand identities.
        </p>
        
        <div className="hero-actions">
          <Link to="/consultation" className="btn-primary btn-large" style={{ textDecoration: 'none' }}>
            Get Consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </Link>
          <Link to="/portfolio" className="btn-secondary btn-large" style={{ textDecoration: 'none' }}>
            <span className="btn-secondary-inner">
              <span className="btn-secondary-text">View Portfolio</span>
              <span className="btn-secondary-text-hover">View Portfolio</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.6}}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Marquee = () => {
  const items1 = [
    { text: 'Poor Brand Identity', color: '#3180b2' },
    { text: 'Slow Websites', color: '#4fa3d8' },
    { text: 'Weak Digital Presence', color: '#276994' },
    { text: 'Generic Designs', color: '#EF7B16' },
  ];
  
  const items2 = [
    { text: 'Missed Deadlines', color: '#EF7B16' },
    { text: 'Low Conversion Rates', color: '#1d5375' },
    { text: 'Unclear Strategy', color: '#276994' },
    { text: 'Mediocre Marketing', color: '#4fa3d8' },
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-header">
        <h2 className="marquee-title" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          Say goodbye to
          {/* Curved Arrow SVG */}
          <img src="/arrow.png" alt="Arrow" style={{ width: '100px', height: 'auto', transform: 'rotate(15deg) translateY(10px)' }} />
        </h2>
      
      </div>
      
      <div className="marquee-container">
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div className="marquee-row marquee-left">
            {[...items1, ...items1, ...items1].map((item, idx) => (
              <div key={idx} className="marquee-pill">
                <span className="pill-dot" style={{ background: item.color }}></span>
                <span className="pill-text text-gradient" style={{ backgroundImage: `linear-gradient(90deg, ${item.color}, #fff)` }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div className="marquee-row marquee-right">
            {[...items2, ...items2, ...items2].map((item, idx) => (
              <div key={idx} className="marquee-pill">
                <span className="pill-dot" style={{ background: item.color }}></span>
                <span className="pill-text text-gradient" style={{ backgroundImage: `linear-gradient(90deg, ${item.color}, #fff)` }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { id: '01', name: '360 Marketing' },
    { id: '02', name: 'Website Design' },
    { id: '03', name: 'App Development' },
    { id: '04', name: 'Software Development' },
    { id: '05', name: 'SEO' },
    { id: '06', name: 'Branding' },
  ];

  return (
    <section className="services-section">
      <div className="services-header">
        <div className="services-title-wrapper">
          <span className="section-badge">
            <span className="badge-dot"></span>
            Our Services
          </span>
          <h2 className="services-title">
            What we <span className="text-gradient">do best</span>
          </h2>
        </div>
        <p className="services-desc">
          Five disciplines. One studio. All built to move your brand forward.
        </p>
      </div>
      
      <div className="services-list">
        {services.map(service => (
          <div key={service.id} className="service-item">
            <div className="service-hover-bg"></div>
            <span className="service-number">{service.id}</span>
            <div className="service-name-wrapper">
              <h3 className="service-name default">{service.name}</h3>
              <h3 className="service-name hover">{service.name}</h3>
            </div>
            <div style={{ marginLeft: 'auto', opacity: 0.5 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Stats />
      <Process />
      <Clients />
      <Reviews />
      <CTA />
    </>
  );
};

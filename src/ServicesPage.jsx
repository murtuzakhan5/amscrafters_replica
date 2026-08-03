import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './services.css';

const servicesList = [
  { id: '01', title: '360 Marketing', tags: ['Campaign Strategy', 'Brand Storytelling'] },
  { id: '02', title: 'Website Design', tags: ['UI/UX Design', 'Web Development'] },
  { id: '03', title: 'App Development', tags: ['iOS', 'Android', 'React Native'] },
  { id: '04', title: 'Software Development', tags: ['Custom SaaS', 'Enterprise Platforms'] },
  { id: '05', title: 'SEO', tags: ['On-Page', 'Off-Page', 'Technical'] },
  { id: '06', title: 'Branding', tags: ['Brand Identity', 'Logo Design'] },
  { id: '07', title: 'Graphic Design', tags: ['Social Media Posts', 'Print Media'] },
  { id: '08', title: 'Product Photography', tags: ['E-commerce', 'Lifestyle'] },
];

export const ServicesPage = () => {
  const introScrollRef = useRef(null);
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      if (introScrollRef.current) {
        const rect = introScrollRef.current.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          const totalScrollable = rect.height - windowHeight;
          const scrolled = -rect.top;
          const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
          setIntroProgress(progress);
        } else if (rect.top > 0) {
          setIntroProgress(0);
        } else {
          setIntroProgress(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIntroOpacity = (index) => {
    const totalElements = 25; 
    const threshold = index / totalElements;
    return introProgress > threshold ? 1 : 0.12;
  };

  return (
    <div className="sp-wrapper">
      
      {/* Hero Section */}
      <div className="sp-hero">
        <div className="sp-hero-light" style={{top: '-100px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(49,128,178,0.14) 0%, rgba(79,163,216,0.06) 45%, transparent 70%)'}}></div>
        <div className="sp-hero-light" style={{bottom: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(49,128,178,0.09) 0%, transparent 70%)'}}></div>
        <div className="sp-hero-light" style={{top: '40%', left: '10%', width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(49,128,178,0.06) 0%, transparent 70%)'}}></div>
        
        <div className="sp-line-h" style={{top: '120px', animation: 'spMoveRight 7s linear infinite'}}></div>
        <div className="sp-line-h" style={{top: '340px', animation: 'spMoveRight 9.5s linear infinite 3.2s'}}></div>
        <div className="sp-line-h" style={{top: '250px', animation: 'spMoveLeft 8.5s linear infinite 1.5s'}}></div>
        <div className="sp-line-v" style={{left: '280px', animation: 'spMoveDown 6.5s linear infinite 0.5s'}}></div>
        <div className="sp-line-v" style={{left: '580px', animation: 'spMoveDown 10s linear infinite 4s'}}></div>
        <div className="sp-line-v" style={{left: '460px', animation: 'spMoveUp 8s linear infinite 2s'}}></div>
        
        <div className="sp-hero-content">
          <div className="sp-badge-pill" style={{animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both'}}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">What We Do</span>
          </div>
          
          <div className="sp-hero-title-wrapper">
            <div>Brands that win</div>
            <div className="sp-hero-title-flex">
              <span>need</span>
              <span className="sp-hero-highlight-box">
                <span className="sp-text-gradient">360 Marketing</span>
              </span>
            </div>
          </div>
          
          <p className="sp-hero-subtitle">
            From strategy and identity to code and campaigns — we handle every moving part so you can focus on building what matters.
          </p>
          
          <div className="sp-hero-actions">
            <a className="sp-btn-primary" href="/consultation">
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </a>
            <a className="sp-btn-secondary sp-group" href="/portfolio">
              <span className="sp-btn-secondary-text">
                <span className="sp-btn-secondary-text-inner sp-default">Explore Services</span>
                <span className="sp-btn-secondary-text-inner sp-hover">Explore Services</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sp-icon-opacity" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Intro Scroll Section */}
      <section ref={introScrollRef} className="sp-intro-section">
        <div className="sp-sticky-intro">
          <div className="sp-badge-pill-center">
            <span className="sp-dot"></span>
            <span className="sp-badge-text">Our Services</span>
          </div>
          
          <p className="sp-intro-text">
            <span style={{opacity:getIntroOpacity(0)}}>From </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(1)}}>
              <span className="sp-inline-thumb">
                <img src="/services/360-marketing.webp" alt="360 Marketing" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">360 Marketing</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(2)}}> and </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(3)}}>
              <span className="sp-inline-thumb">
                <img src="/services/branding.webp" alt="Branding" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">Branding</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(4)}}> to </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(5)}}>
              <span className="sp-inline-thumb">
                <img src="/services/website-design.webp" alt="Website Design" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">Website Design</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(6)}}> and </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(7)}}>
              <span className="sp-inline-thumb">
                <img src="/services/app-development.webp" alt="App Development" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">App Development</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(8)}}> — </span>
            <span style={{opacity:getIntroOpacity(9)}}> plus </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(10)}}>
              <span className="sp-inline-thumb">
                <img src="/services/seo.webp" alt="SEO" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">SEO</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(11)}}> , </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(12)}}>
              <span className="sp-inline-thumb">
                <img src="/services/graphic-design.webp" alt="Graphic Design" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">Graphic Design</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(13)}}> , </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(14)}}>
              <span className="sp-inline-thumb">
                <img src="/services/software-development.webp" alt="Software Development" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">Software Development</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(15)}}> and </span>
            
            <span className="sp-inline-service" style={{opacity:getIntroOpacity(16)}}>
              <span className="sp-inline-thumb">
                <img src="/services/product-photography.webp" alt="Product Photography" onError={(e) => { e.target.style.display = 'none'; }} />
              </span>
              <span className="sp-text-gradient-sm">Product Photography</span>
            </span>
            
            <span style={{opacity:getIntroOpacity(17)}}> — </span>
            <span style={{opacity:getIntroOpacity(18)}}> every </span>
            <span style={{opacity:getIntroOpacity(19)}}> service </span>
            <span style={{opacity:getIntroOpacity(20)}}> your </span>
            <span style={{opacity:getIntroOpacity(21)}}> brand </span>
            <span style={{opacity:getIntroOpacity(22)}}> needs, </span>
            <span style={{opacity:getIntroOpacity(23)}}> all </span>
            <span style={{opacity:getIntroOpacity(24)}}> under </span>
            <span style={{opacity:getIntroOpacity(25)}}> one </span>
            <span style={{opacity:getIntroOpacity(26)}}> roof. </span>
          </p>
          
          <div className="sp-scroll-indicator" style={{opacity: introProgress < 0.9 ? 1 : 0}}>
            <span>Scroll</span>
            <div className="sp-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Services Showcase Sticky Stack */}
      <div className="sp-stack-container" style={{ paddingBottom: '100px' }}>
        {servicesList.map((service, idx) => (
          <section 
            key={idx}
            className="sp-stack-card"
            style={{
              position: 'sticky',
              top: `${idx * 54}px`, // Each topbar is 54px tall
              height: '100vh',
              zIndex: idx + 1,
              overflow: 'hidden',
              background: 'var(--bg)',
              boxShadow: idx > 0 ? '0 -10px 40px rgba(0,0,0,0.5)' : 'none', // Shadow above cards
              borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* Topbar */}
            <div className="sp-showcase-topbar" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
              <div className="sp-topbar-left">
                <span className="sp-topbar-id">{service.id}</span>
                <span className="sp-topbar-title">{service.title}</span>
              </div>
              
              <div className="sp-topbar-center">
                {service.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="sp-tag-pill">
                    <span className="sp-tag-text">{tag}</span>
                  </span>
                ))}
              </div>
              
              <div className="sp-topbar-right">
                <Link to={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`} className="sp-btn-learn">
                  Learn More
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </Link>
              </div>
            </div>

            {/* Image Layer */}
            <div className="sp-stack-image-wrapper" style={{ position: 'absolute', top: '54px', left: 0, right: 0, bottom: 0, zIndex: 10 }}>
              <img 
                src={`/services/${service.title.toLowerCase().replace(/ /g, '-')}.webp`}
                alt={service.title}
                className="sp-image-actual"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#0e0f1a' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="sp-image-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', pointerEvents: 'none' }}></div>
            </div>
          </section>
        ))}
      </div>

    </div>
  );
};

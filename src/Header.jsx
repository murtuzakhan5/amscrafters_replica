import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (location.pathname === '/services') {
          setHeaderVisible(false); // scrolling down, only hide on services page
        }
      } else {
        setHeaderVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, location.pathname]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
  }, [location]);

  const serviceItems = [
    { title: 'Mobile App', slug: 'mobile-app', desc: 'iOS & Android apps', color: '#3180b2' },
    { title: 'CRM Solutions', slug: 'crm-solutions', desc: 'Streamline operations', color: '#1d5375' },
    { title: 'Social Media', slug: 'social-media-marketing', desc: 'Marketing & engagement', color: '#4fa3d8' },
    { title: 'Shopify', slug: 'shopify', desc: 'Shopify Development', color: '#276994' },
    { title: 'E-Commerce', slug: 'ecommerce', desc: 'Custom storefronts', color: '#133a54' },
    { title: 'SEO', slug: 'seo', desc: 'Rank higher, grow faster', color: '#3180b2' }
  ];

  return (
    <div 
      className={`header-wrapper ${scrolled ? 'scrolled' : ''}`}
      style={{ 
        transform: headerVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-150%)', 
        opacity: headerVisible ? 1 : 0,
        pointerEvents: headerVisible ? 'auto' : 'none'
      }}
    >
      <header className="header">
        <Link to="/" className="header-logo" style={{ paddingLeft: '8px', textDecoration: 'none' }}>
          <Logo />
        </Link>
        <div className="header-divider desktop-only"></div>
        
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : 'desktop-only'}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/story" className={`nav-link ${location.pathname === '/story' ? 'active' : ''}`}>Story</Link>
          
          <div 
            className="nav-item-dropdown" 
            onMouseEnter={() => window.innerWidth > 768 && setServicesMenuOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setServicesMenuOpen(false)}
          >
            <button 
              className={`nav-link ${location.pathname === '/services' || servicesMenuOpen ? 'active' : ''}`}
              onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Services
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s', transform: servicesMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            
            {servicesMenuOpen && (
              <div className="mega-menu-overlay">
                <div className="mega-menu-grid">
                  {serviceItems.map((item, idx) => (
                    <Link to={`/services/${item.slug}`} key={idx} className="mega-menu-item" onClick={() => { setServicesMenuOpen(false); setMobileMenuOpen(false); }}>
                      <div className="mega-menu-thumb">
                        <img src={`/services/${item.slug}.webp`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.style.backgroundColor = item.color; e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; }} />
                      </div>
                      <div className="mega-menu-text">
                        <h4 className="mega-menu-title">{item.title}</h4>
                        <p className="mega-menu-desc">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <Link to="/services" onClick={() => { setServicesMenuOpen(false); setMobileMenuOpen(false); }} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    View All Services <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/team" className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}>Our Team</Link>
          <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>Portfolio</Link>
          <Link to="/careers" className={`nav-link ${location.pathname === '/careers' ? 'active' : ''}`}>Careers</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </nav>
        
        <div className="header-actions">
          <Link to="/consultation" className="btn-primary desktop-only" style={{ textDecoration: 'none' }}>
            Get Consultation
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </Link>
          
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </>
              ) : (
                <>
                  <path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    { title: '360 Marketing', slug: '360-marketing', desc: 'Campaign Strategy & Growth', color: '#3180b2' },
    { title: 'Website Design', slug: 'website-design', desc: 'UI/UX & Web Development', color: '#1d5375' },
    { title: 'App Development', slug: 'mobile-app', desc: 'iOS & Android Mobile Apps', color: '#4fa3d8' },
    { title: 'Software Development', slug: 'software-development', desc: 'Custom SaaS & Platforms', color: '#276994' },
    { title: 'SEO', slug: 'seo', desc: 'Rank higher, grow organic traffic', color: '#3180b2' },
    { title: 'Branding', slug: 'branding', desc: 'Brand Identity & Logo Design', color: '#1d5375' },
    { title: 'Graphic Design', slug: 'graphic-design', desc: 'Social & Print Media', color: '#4fa3d8' },
    { title: 'Product Photography', slug: 'product-photography', desc: 'E-commerce & Lifestyle', color: '#276994' },
    { title: 'CRM Solutions', slug: 'crm-solutions', desc: 'Streamline operations', color: '#133a54' },
    { title: 'Shopify Development', slug: 'shopify', desc: 'Shopify Storefronts', color: '#3180b2' },
    { title: 'E-Commerce', slug: 'ecommerce', desc: 'Custom Online Stores', color: '#1d5375' },
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
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/story" className={`nav-link ${location.pathname === '/story' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Story</Link>
          
          <div 
            className="nav-item-dropdown" 
            onMouseEnter={() => window.innerWidth > 900 && setServicesMenuOpen(true)}
            onMouseLeave={() => window.innerWidth > 900 && setServicesMenuOpen(false)}
          >
            <button 
              className={`nav-link ${location.pathname.startsWith('/services') || servicesMenuOpen ? 'active' : ''}`}
              onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '6px' }}
            >
              <span>Services</span>
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
                <div style={{ padding: '14px 16px 4px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', marginTop: '8px' }}>
                  <Link to="/services" onClick={() => { setServicesMenuOpen(false); setMobileMenuOpen(false); }} style={{ color: '#4fa3d8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    View All Services <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/team" className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Our Team</Link>
          <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
          <Link to="/packages" className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Packages</Link>
          <Link to="/careers" className={`nav-link ${location.pathname === '/careers' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Careers</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>

          {/* Mobile CTA Button inside Menu (Hidden on Desktop) */}
          <div className="mobile-cta-wrapper mobile-only" style={{ marginTop: '12px', width: '100%' }}>
            <Link to="/consultation" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', height: '42px', fontSize: '14px' }}>
              Get Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </Link>
          </div>
        </nav>
        
        <div className="header-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>

          <Link to="/consultation" className="btn-primary header-btn desktop-only" style={{ textDecoration: 'none' }}>
            Get Consultation
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
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

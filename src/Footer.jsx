import './components.css';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-huge-text">
          <span>A</span><span>M</span><span>S</span><span></span><span></span><span> </span><span>C</span><span>r</span><span>a</span><span>f</span><span>t</span><span>e</span><span>r</span><span>s</span>
        </div>
      </div>
      <div className="footer-divider"></div>
      
      <div className="footer-links-grid">
        <div className="footer-col">
          <div className="footer-logo" style={{ marginLeft: '-8px' }}><Logo /></div>
          <p className="footer-desc">A full-service creative agency building bold brands and digital experiences that drive real growth.</p>
          <div className="footer-socials">
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path><circle cx="12" cy="13" r="3"></circle></svg>
            </a>
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
            </a>
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <p className="footer-heading">Services</p>
          <a href="/services" className="footer-link">Marketing</a>
          <a href="/services" className="footer-link">Website Design</a>
          <a href="/services" className="footer-link">App Development</a>
          <a href="/services" className="footer-link">Software Dev</a>
          <a href="/services" className="footer-link">Graphic Design</a>
        </div>
        
        <div className="footer-col">
          <p className="footer-heading">Company</p>
          <a href="/story" className="footer-link">About Us</a>
          <a href="/portfolio" className="footer-link">Our Work</a>
          <a href="/packages" className="footer-link">Packages</a>
          <a href="/careers" className="footer-link">Careers</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/team" className="footer-link">Our Team</a>
        </div>
        
        <div className="footer-col">
          <p className="footer-heading">Contact</p>
          <div className="footer-contact-info">
            <div>
              <p className="font-semibold text-fg">Available Mon–Sat</p>
              <p className="text-muted">10am – 12pm PKT</p>
            </div>
            <a href="mailto:contact@amscrafters.io" className="footer-link">contact@amscrafters.io</a>
            <a href="mailto:support@amscrafters.io" className="footer-link">support@amscrafters.io</a>
            <a href="tel:+923 281838852" className="footer-link">+923 281838852</a>
            <a href="tel:+923 198637634" className="footer-link">+923 198637634</a>
            <p className="text-muted mt-2">Sector 10 House:R-65 North Karachi, Pakistan</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 AMS Crafters. All rights reserved.</p>
        <p>Crafted with care — built to perform.</p>
      </div>
    </footer>
  );
};

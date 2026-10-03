import React, { useEffect, useState } from 'react';
import './contact.css';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { usePopup } from './PopupContext';

export const Contact = () => {
  const { showAlert } = usePopup();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeMapTab, setActiveMapTab] = useState('karachi');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      setCategories(snapshot.docs.map(doc => doc.data().name));
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        isRead: false,
        createdAt: serverTimestamp()
      });
      showAlert('Thank you! Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form: ", error);
      showAlert('Failed to send message. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1 className="contact-title">
          Let's Create <span className="text-gradient">Together</span>
        </h1>
        <p className="contact-subtitle">
          Ready to Transform Your Digital Presence? Get in touch and let's discuss your project.
        </p>
      </div>

      <div className="contact-content max-width">
        
        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          <a href="tel:+923281838852" className="contact-card">
            <div className="contact-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3>Call Us</h3>
            <p>Mon-Sat from 10am to 12pm PKT</p>
            <strong>+92 328 1838852</strong>
          </a>
          <a href="mailto:contact@amscrafters.io" className="contact-card">
            <div className="contact-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h3>Email Us</h3>
            <p>Send us your queries anytime</p>
            <strong>contact@amscrafters.io</strong>
          </a>
          <a href="https://wa.me/923281838852" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
            </div>
            <h3>WhatsApp</h3>
            <p>Quick responses guaranteed</p>
            <strong>+92 328 1838852</strong>
          </a>
        </div>

        {/* Office Locations Section */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="sp-badge-pill-center" style={{ margin: '0 auto 16px' }}>
              <span className="sp-badge-dot"></span>
              Global Presence
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-1px' }}>
              Our Office <span className="text-gradient">Locations</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
              Visit our headquarters in Karachi or our regional office in Islamabad.
            </p>
          </div>

          {/* Interactive Map Embed */}
          <div style={{ marginBottom: '32px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)', position: 'relative' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginRight: '8px' }}>
                Interactive Map:
              </span>
              <button 
                type="button"
                onClick={() => setActiveMapTab('karachi')}
                style={{
                  background: activeMapTab === 'karachi' ? '#3180b2' : 'transparent',
                  color: activeMapTab === 'karachi' ? '#fff' : 'var(--muted)',
                  border: '1px solid ' + (activeMapTab === 'karachi' ? '#3180b2' : 'var(--border)'),
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Karachi HQ Map
              </button>
              <button 
                type="button"
                onClick={() => setActiveMapTab('islamabad')}
                style={{
                  background: activeMapTab === 'islamabad' ? '#3180b2' : 'transparent',
                  color: activeMapTab === 'islamabad' ? '#fff' : 'var(--muted)',
                  border: '1px solid ' + (activeMapTab === 'islamabad' ? '#3180b2' : 'var(--border)'),
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Islamabad Office Map
              </button>
            </div>
            <div style={{ height: '360px', width: '100%', position: 'relative' }}>
              <iframe
                title="Office Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.6) invert(0.92) contrast(1.2)' }}
                loading="lazy"
                allowFullScreen
                src={
                  activeMapTab === 'karachi'
                    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14467.534281313936!2d67.06016335!3d24.9700305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb340e4f2010db7%3A0xb35a0d33e5ef264a!2sNorth%20Karachi%20Twp%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13276.108422119934!2d73.0551!3d33.7182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sBlue%20Area%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                }
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Karachi Head Office */}
            <div className="contact-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '36px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
                <div className="contact-icon" style={{ margin: 0 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span style={{ background: 'rgba(49, 128, 178, 0.15)', color: '#3180b2', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>
                  HEADQUARTERS
                </span>
              </div>
              <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Karachi Office</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px', minHeight: '48px' }}>
                Sector 10 House: R-65 North Karachi, Pakistan
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <span style={{ fontSize: '14px', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +92 328 1838852
                </span>
                <span style={{ fontSize: '14px', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +92 319 8637634
                </span>
              </div>
              <a href="https://maps.google.com/?q=North+Karachi+Pakistan" target="_blank" rel="noreferrer" className="btn-secondary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center', textDecoration: 'none', padding: '12px' }}>
                Open Map Location &rarr;
              </a>
            </div>

            {/* Islamabad Branch Office */}
            <div className="contact-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '36px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
                <div className="contact-icon" style={{ margin: 0 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span style={{ background: 'rgba(79, 163, 216, 0.15)', color: '#4fa3d8', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>
                  REGIONAL OFFICE
                </span>
              </div>
              <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Islamabad Office</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px', minHeight: '48px' }}>
                Executive Heights, Blue Area, Islamabad, Pakistan
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <span style={{ fontSize: '14px', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +92 319 8637634
                </span>
                <span style={{ fontSize: '14px', color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  islamabad@amscrafters.io
                </span>
              </div>
              <a href="https://maps.google.com/?q=Blue+Area+Islamabad+Pakistan" target="_blank" rel="noreferrer" className="btn-secondary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center', textDecoration: 'none', padding: '12px' }}>
                Open Map Location &rarr;
              </a>
            </div>

          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <div className="form-wrapper">
            <h2>Start Your <span className="text-gradient">Project</span></h2>
            <p className="form-description">
              Fill out the form and we'll get back to you within 24 hours with a customized proposal tailored to your needs.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+92 328 1838852" />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" />
                </div>
              </div>

              <div className="form-group">
                <label>Service Required *</label>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="" disabled>Select a service</option>
                  {categories.length > 0 ? (
                    categories.map(c => <option key={c} value={c}>{c}</option>)
                  ) : (
                    <option value="Web Design">Web Design</option>
                  )}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Details *</label>
                <textarea rows="5" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project, goals, and timeline..." required></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

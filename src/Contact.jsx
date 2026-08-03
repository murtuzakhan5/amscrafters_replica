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
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>Mon-Fri from 9am to 6pm</p>
            <strong>+92 328 1838852</strong>
          </a>
          <a href="mailto:contact@amscrafters.io" className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Email Us</h3>
            <p>Send us your queries anytime</p>
            <strong>contact@amscrafters.io</strong>
          </a>
          <a href="https://wa.me/923281838852" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>Quick responses guaranteed</p>
            <strong>+92 328 1838852</strong>
          </a>
          <a href="https://maps.app.goo.gl/isaJMf5QtnDFebjo6" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Visit Us</h3>
            <p>Come say hello at our office</p>
            <strong>Karachi, Pakistan</strong>
          </a>
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

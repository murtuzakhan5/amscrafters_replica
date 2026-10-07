import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { usePopup } from './PopupContext';
import { AnimatedBackground } from './AnimatedBackground';

export const Consultation = () => {
  const { showAlert } = usePopup();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Branding',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'consultations'), {
        ...formData,
        status: 'New',
        createdAt: serverTimestamp()
      });
      showAlert('Your consultation request has been sent! We will contact you soon.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Branding',
        date: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting consultation: ', error);
      showAlert('Failed to submit request. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="sp-wrapper" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
        
        {/* Hero Section */}
        <div className="consultation-hero-pad" style={{ textAlign: 'center', padding: '120px 40px 60px 40px' }}>
          <div className="sp-badge-pill-center" style={{ margin: '0 auto 24px' }}>
            <span className="sp-badge-dot"></span>
            Book a Meeting
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 800, margin: '0 0 24px 0', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Let's discuss your <span className="text-gradient">next project</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Ready to elevate your brand? Fill out the form below to schedule a free consultation with our experts.
          </p>
        </div>

        {/* Form Section */}
        <div className="careers-mobile-pad" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px' }}>
          <div className="sp-hover-surface consultation-form-box" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div className="consultation-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Full Name *</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px' }} 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Email Address *</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px' }} 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="consultation-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Phone Number *</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px' }} 
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Company / Brand Name</label>
                  <input 
                    type="text" name="company" value={formData.company} onChange={handleChange}
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px' }} 
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="consultation-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Service Required</label>
                  <select 
                    name="service" value={formData.service} onChange={handleChange}
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px', appearance: 'none' }}
                  >
                    <option value="Branding">Branding</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Preferred Meeting Date/Time *</label>
                  <input 
                    type="datetime-local" name="date" value={formData.date} onChange={handleChange} required
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>Project Details / Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} rows="4"
                  style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px', color: 'var(--fg)', borderRadius: '12px', fontSize: '15px', resize: 'vertical' }} 
                  placeholder="Tell us a little bit about what you're looking for..."
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="btn-primary" 
                style={{ width: 'auto', minWidth: '220px', maxWidth: '340px', alignSelf: 'center', justifyContent: 'center', padding: '16px 36px', fontSize: '15px', marginTop: '16px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Submitting Request...' : 'Schedule Consultation'}
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>

            </form>
          </div>
        </div>

      </div>
    </>
  );
};

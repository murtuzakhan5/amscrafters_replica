import React, { useEffect } from 'react';
import './services.css';
import { Link } from 'react-router-dom';
import { MarqueeCrossing } from './MarqueeCrossing';

export const StoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sp-wrapper">
      {/* Hero Section */}
      <div className="sp-hero" style={{ paddingBottom: '100px' }}>
        <div className="sp-hero-light" style={{top: '-100px', left: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(49,128,178,0.12) 0%, rgba(79,163,216,0.05) 45%, transparent 70%)'}}></div>
        <div className="sp-hero-light" style={{bottom: '-50px', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(49,128,178,0.08) 0%, transparent 70%)'}}></div>
        
        <div className="sp-line-h" style={{top: '120px', animation: 'spMoveRight 7s linear infinite'}}></div>
        <div className="sp-line-h" style={{top: '340px', animation: 'spMoveRight 9.5s linear infinite 3.2s'}}></div>
        <div className="sp-line-v" style={{left: '280px', animation: 'spMoveDown 6.5s linear infinite 0.5s'}}></div>
        
        <div className="sp-hero-content">
          <div className="sp-badge-pill" style={{animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both'}}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">About AMSCrafters</span>
          </div>
          
          <div className="sp-hero-title-wrapper" style={{ animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <div>Your Trusted</div>
            <div><span className="sp-text-gradient">Digital Partner</span></div>
          </div>
          
          <p className="sp-hero-subtitle" style={{ animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both', maxWidth: '640px' }}>
            With years of experience and a passion for innovation, we help businesses thrive in the digital landscape through tailored solutions and expert guidance.
          </p>
        </div>
      </div>
      
      <MarqueeCrossing />

      {/* Core Principles - Premium Sticky Layout */}
      <section style={{ borderBottom: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%' }}>
          
          {/* Sidebar - Sticky on Desktop */}
          <div className="story-sidebar-mobile" style={{ flex: '1 1 400px', minWidth: '300px', padding: '80px 48px', borderRight: '1px solid var(--border)', position: 'sticky', top: '0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="sp-badge-pill" style={{ marginBottom: '24px', alignSelf: 'flex-start' }}>
              <span className="sp-dot"></span>
              <span className="sp-badge-text">Foundation</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '24px' }}>
              Our <span className="sp-text-gradient">Core Principles</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, maxWidth: '400px' }}>
              The foundation of everything we do at AMSCrafters. It dictates how we work, who we hire, and what we deliver.
            </p>
          </div>
          
          {/* Content Cards - Scrolling */}
          <div style={{ flex: '2 1 600px', minWidth: '300px', padding: '80px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { id: '01', icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>, title: 'Our Mission', desc: 'To empower businesses with innovative digital solutions that drive growth and success in the online world.' },
              { id: '02', icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>, title: 'Our Vision', desc: 'To be the leading digital agency recognized for transforming businesses through cutting-edge technology.' },
              { id: '03', icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, title: 'Our Values', desc: 'Integrity, innovation, and client success are at the core of everything we do.' }
            ].map((item, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 'clamp(32px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(255,106,0,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '42px', filter: 'grayscale(0.5)' }}>{item.icon}</div>
                  <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.18em', color: 'var(--muted)' }}>{item.id}</span>
                </div>
                
                <div style={{ height: '1px', background: 'var(--border)' }}></div>
                
                <div>
                  <h3 style={{ fontSize: '28px', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6, fontSize: '16px', maxWidth: '500px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Journey & Excellence */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '100px 40px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 500px' }}>
            <div className="sp-badge-pill" style={{ marginBottom: '24px' }}>
              <span className="sp-dot"></span>
              <span className="sp-badge-text">Our Story</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-1.5px', marginBottom: '24px', lineHeight: 1.1 }}>
              Our <span className="sp-text-gradient">Journey</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              <p style={{ margin: 0 }}>
                Founded with a vision to bridge the gap between businesses and digital excellence, AMSCrafters has been at the forefront of digital transformation for years.
              </p>
              <p style={{ margin: 0 }}>
                Our team of passionate professionals combines technical expertise with creative thinking to deliver solutions that not only meet but exceed client expectations.
              </p>
              <p style={{ margin: 0 }}>
                We believe in building long-term partnerships and are committed to helping our clients achieve sustainable growth in the ever-evolving digital landscape.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
              {['Digital Excellence', 'Client Success', 'Innovation'].map((tag, i) => (
                <span key={i} style={{ padding: '8px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '99px', fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="story-sidebar-mobile" style={{ flex: '1 1 400px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '50px', position: 'relative', overflow: 'hidden', borderRadius: '0' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--gradient-primary)' }}></div>
            <h3 style={{ fontSize: '28px', marginBottom: '20px', letterSpacing: '-0.5px' }}>
              Digital Excellence Since 2020
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              Transforming businesses through innovative digital solutions and strategic partnerships. We've helped 50+ clients achieve their digital goals and continue to push the boundaries of what's possible in the digital space.
            </p>
            <Link to="/portfolio" className="sp-btn-secondary" style={{ display: 'inline-flex' }}>
              View Our Work
            </Link>
          </div>
          
        </div>
      </section>

      {/* Why Choose Us - Premium Grid */}
      <section style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(49,128,178,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', marginBottom: '80px' }}>
             <div className="sp-badge-pill">
              <span className="sp-dot"></span>
              <span className="sp-badge-text">The Advantages</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px', margin: 0, lineHeight: 1 }}>
              Why Choose <span className="sp-text-gradient">AMSCrafters?</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '17px', maxWidth: '500px', margin: 0 }}>
              We stand out from the competition with our unique approach and unwavering commitment to quality.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>, title: 'Innovative Solutions', desc: 'We leverage cutting-edge technology to deliver forward-thinking digital solutions.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, title: 'Expert Team', desc: 'Our skilled professionals bring years of experience and diverse expertise.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>, title: '24/7 Support', desc: 'We provide round-the-clock support to ensure your business runs smoothly.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>, title: 'Fast Delivery', desc: 'Quick turnaround times without compromising on quality.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.82 2.16 2.36 2.36-11 11-2.36-2.36 11-11Z"></path><path d="m4.9 14.1 4.9 4.9"></path><path d="M16.54 8.46a3.3 3.3 0 0 1 4.6 4.6L20 14l-4.6-4.6 1.14-1.14Z"></path></svg>, title: 'Creative Design', desc: 'Unique and engaging designs that capture your brand essence.' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3180b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>, title: 'Proven Results', desc: 'Track record of delivering measurable business growth.' }
            ].map((feature, idx) => (
              <div key={idx} style={{ padding: '48px 40px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'background 0.3s ease' }} className="sp-hover-surface">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '32px', filter: 'grayscale(0.3)' }}>
                    {feature.icon}
                  </div>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '22px', letterSpacing: '-0.5px' }}>{feature.title}</h4>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

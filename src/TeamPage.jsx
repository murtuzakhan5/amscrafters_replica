import React, { useEffect, useState, useRef } from 'react';
import './services.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const CountUp = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        let startTime = null;
        const duration = 2000;
        const endVal = parseInt(end, 10);
        
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * endVal));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    });
    if(ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

export const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, 'team_members'));
        const querySnapshot = await getDocs(q);
        const membersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        membersData.sort((a, b) => (a.order || 999) - (b.order || 999));
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="sp-wrapper">
      {/* Hero Section */}
      <div className="sp-hero">
        <div className="sp-hero-light" style={{top: '-100px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(49,128,178,0.14) 0%, rgba(79,163,216,0.06) 45%, transparent 70%)'}}></div>
        
        <div className="sp-line-h" style={{top: '120px', animation: 'spMoveRight 7s linear infinite'}}></div>
        <div className="sp-line-h" style={{top: '340px', animation: 'spMoveRight 9.5s linear infinite 3.2s'}}></div>
        <div className="sp-line-h" style={{top: '250px', animation: 'spMoveLeft 8.5s linear infinite 1.5s'}}></div>
        <div className="sp-line-v" style={{left: '280px', animation: 'spMoveDown 6.5s linear infinite 0.5s'}}></div>
        <div className="sp-line-v" style={{left: '580px', animation: 'spMoveDown 10s linear infinite 4s'}}></div>
        <div className="sp-line-v" style={{left: '460px', animation: 'spMoveUp 8s linear infinite 2s'}}></div>
        
        <div className="sp-hero-content">
          <div className="sp-badge-pill" style={{animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both'}}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">Meet the Team</span>
          </div>
          
          <div className="sp-hero-title-wrapper" style={{ animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <div>The <span className="sp-text-gradient">Designers</span></div>
            <div>Behind the Brand</div>
          </div>
          
          <p className="sp-hero-subtitle" style={{ animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>
            A tight-knit crew of creatives and engineers who obsess over craft, sweat the details, and build things that actually move the needle.
          </p>
          
          <div className="sp-hero-actions" style={{ animation: 'spFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both' }}>
            <Link to="/consultation" className="sp-btn-primary">
              Get Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { value: '10', suffix: '+', label: 'Team Members' },
            { value: '5', suffix: '+', label: 'Years Together' },
            { value: '200', suffix: '+', label: 'Projects Shipped' },
            { value: '99', suffix: '%', label: 'Client Satisfaction' }
          ].map((stat, i) => (
            <div key={i} style={{ padding: '40px 32px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: 'clamp(38px,4.5vw,62px)', fontWeight: 800, color: 'var(--muted)', letterSpacing: '-2px' }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section style={{ borderBottom: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%' }}>
          
          {/* Sidebar - Sticky on Desktop */}
          <div className="story-sidebar-mobile" style={{ flex: '1 1 400px', minWidth: '300px', padding: '80px 48px', borderRight: '1px solid var(--border)', position: 'sticky', top: '0', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="sp-badge-pill" style={{ marginBottom: '24px', alignSelf: 'flex-start' }}>
              <span className="sp-dot"></span>
              <span className="sp-badge-text">Collective Skills</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '24px' }}>
              What our team<br/><span className="sp-text-gradient">brings to the table.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, maxWidth: '400px' }}>
              13 specialists across four disciplines — everything under one roof so nothing gets lost in handoffs.
            </p>
          </div>
          
          {/* Content Cards - Scrolling */}
          <div style={{ flex: '2 1 600px', minWidth: '300px', padding: '80px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { id: '01', title: 'Design & Creative', skills: ['Brand Identity', 'UI / UX Design', 'Motion Graphics', 'Product Design', 'Figma', 'Illustration', 'Typography', 'Art Direction'] },
              { id: '02', title: 'Development', skills: ['Next.js', 'React', 'Node.js', 'React Native', 'Swift', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'TypeScript'] },
              { id: '03', title: 'Marketing & Growth', skills: ['SEO', 'Paid Media', 'Email Marketing', 'Content Strategy', 'Analytics', 'Social Media', 'Conversion Rate Optimisation'] },
              { id: '04', title: 'Strategy & Production', skills: ['Brand Strategy', 'Market Research', 'Product Photography', 'Video Production', 'Copywriting', 'Campaign Planning'] }
            ].map((cat, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 'clamp(24px,3vw,36px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.18em', color: 'var(--muted)' }}>{cat.id}</span>
                  <h3 style={{ fontSize: '24px', margin: 0 }}>{cat.title}</h3>
                </div>
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '20px' }}></div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} style={{ fontSize: '12px', fontWeight: 600, padding: '6px 12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--muted)', borderRadius: '4px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Team Members */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
             <div className="sp-badge-pill" style={{ alignSelf: 'flex-start' }}>
              <span className="sp-dot"></span>
              <span className="sp-badge-text">The People</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-2px', lineHeight: 1.05 }}>
              Faces behind <span className="sp-text-gradient">the work</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Small team. Massive output. Every person owns their craft end-to-end.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {loading ? (
              <div style={{ color: 'var(--muted)' }}>Loading team members...</div>
            ) : teamMembers.length === 0 ? (
              <div style={{ color: 'var(--muted)', padding: '20px' }}>No team members found.</div>
            ) : teamMembers.map((member, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '280px', position: 'relative', background: '#111' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"><rect width="100" height="100" fill="%23222"/></svg>' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>
                    0{idx + 1}
                  </span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{member.name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', flexGrow: 1 }}>{member.role}</p>
                  
                  {member.linkedIn && (
                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" style={{ marginTop: '16px', fontSize: '12px', fontWeight: 600, color: '#3180b2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      LinkedIn <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

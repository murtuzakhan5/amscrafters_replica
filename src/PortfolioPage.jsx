import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { AnimatedBackground } from './AnimatedBackground';
import './components.css';

export const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);

        const catSnapshot = await getDocs(collection(db, 'categories'));
        const catData = catSnapshot.docs.map(doc => doc.data().name);
        setCategories(['All', ...catData]);

        const clientQ = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
        const clientSnapshot = await getDocs(clientQ);
        setClients(clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <>
      <AnimatedBackground />
      <div className="sp-wrapper" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <div style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', height: '600px', background: 'radial-gradient(circle, rgba(49,128,178,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
        <div className="sp-badge-pill" style={{ margin: '0 auto 24px' }}>
          <span className="sp-dot"></span>
          <span className="sp-badge-text">Our Projects</span>
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '0 0 24px 0', letterSpacing: '-2px' }}>
          Work we're <span className="sp-text-gradient">proud of</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6, padding: '0 20px' }}>
          We've had the privilege of partnering with ambitious businesses across industries — helping them build brands, launch digital products, and grow their presence online. Each project here represents real collaboration, real challenges, and real results. These are just a few of the stories we've been part of.
        </p>
      </div>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          {[
            { value: '50+', label: 'Projects' },
            { value: '8', label: 'Services' },
            { value: '98%', label: 'Satisfaction' },
            { value: '3x', label: 'Avg. Growth' }
          ].map((stat, i) => (
            <div key={i} style={{ padding: '32px 20px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-2px' }}>{stat.value}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Marquee Tags */}
      <div style={{ overflow: 'hidden', padding: '24px 0', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'spMoveLeft 20s linear infinite' }}>
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {['Branding', 'Web Design', 'E-Commerce', 'UI/UX', 'Identity', 'Digital Marketing', 'Development', 'Strategy'].map((tag, idx) => (
                <span key={idx} style={{ fontSize: '20px', fontWeight: 700, margin: '0 24px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {tag} <span style={{ color: '#3180b2', marginLeft: '24px' }}>•</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Clients 3D Carousel Section */}
      <div style={{ padding: '60px 0', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 20px' }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 12px 0' }}>Trusted by</h2>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Brands that chose us to bring their vision to life.</p>
        </div>
        
        {clients.length > 0 ? (
          <div className="carousel-container" style={{ flexDirection: 'column', gap: '24px' }}>
            <div className="carousel-badge">
              <h3>50+</h3>
              <p>Successful Brand Projects</p>
            </div>
            
            {/* Top Row (Scrolls Left) */}
            <div className="carousel-track">
              {/* Duplicate array for infinite scroll effect */}
              {[...clients, ...clients, ...clients, ...clients].map((client, idx) => (
                <div key={`top-${client.id}-${idx}`} className="carousel-item">
                  <img src={client.logo} alt={client.name} />
                </div>
              ))}
            </div>

            {/* Bottom Row (Scrolls Right) */}
            <div className="carousel-track reverse" style={{ marginLeft: '-150px' }}>
              {[...clients, ...clients, ...clients, ...clients].map((client, idx) => (
                <div key={`bottom-${client.id}-${idx}`} className="carousel-item">
                  <img src={client.logo} alt={client.name} />
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '40px' }}>No clients to display. Add them from the admin panel.</div>
        )}
      </div>

      {/* Tabs */}
      <div className="careers-mobile-pad" style={{ maxWidth: '1200px', margin: '60px auto 32px', padding: '0 40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--fg)' : 'rgba(255,255,255,0.03)',
                color: activeTab === cat ? 'var(--bg)' : 'var(--muted)',
                border: `1px solid ${activeTab === cat ? 'transparent' : 'var(--border)'}`,
                padding: '8px 20px',
                borderRadius: '99px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="careers-mobile-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>No projects found in this category.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="sp-hover-surface" 
                onClick={() => navigate(`/portfolio/${project.id}`)}
                style={{ 
                  position: 'relative', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  cursor: 'pointer', 
                  background: 'var(--surface)', 
                  border: '1px solid var(--border)',
                  height: '420px', 
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                
                {/* Background Image Area */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                  {project.type === 'photography' && project.thumbnail === 'collage' && project.images ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px', height: '100%' }}>
                      {project.images.slice(0,4).map((img, i) => (
                        <img key={i} src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ))}
                    </div>
                  ) : project.type === 'marketing' ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <img src={project.thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '12px', textAlign: 'center', width: '80%' }}>
                          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3180b2', marginBottom: '6px' }}>Campaign Stats</div>
                          <div style={{ fontSize: '22px', fontWeight: 800 }}>{project.metrics?.roas} ROAS</div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} 
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  )}
                </div>

                {/* Dark Gradient Overlay for Text Readability */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
                
                {/* Content Area (Floating at bottom) */}
                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  
                  {/* Top row: Category + Live Link */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#3180b2' }}>
                      {project.category} • {project.client}
                    </span>
                    
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ 
                          background: 'rgba(255,255,255,0.1)', 
                          backdropFilter: 'blur(10px)', 
                          padding: '6px 16px', 
                          borderRadius: '99px', 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: 'white', 
                          textDecoration: 'none', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          transition: 'background 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></span>
                        Live Demo
                      </a>
                    )}
                  </div>
                  
                  {/* Title & Desc */}
                  <h3 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: 'white', lineHeight: 1.2 }}>{project.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                  
                  {/* Footer link */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '13px', fontWeight: 600, marginTop: '8px' }}>
                    View Case Study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

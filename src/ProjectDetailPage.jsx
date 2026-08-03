import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="sp-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading Project...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="sp-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Project Not Found</h2>
        <Link to="/portfolio" className="sp-btn-secondary" style={{ marginLeft: '20px' }}>Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="sp-wrapper" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Dynamic Header Banner */}
      <div style={{ width: '100%', height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={project.banner || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)' }}></div>
        
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="sp-badge-pill" style={{ marginBottom: '16px' }}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">{project.category}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '0 0 16px 0', letterSpacing: '-2px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            {project.title}
          </h1>
        </div>
      </div>

      {/* Project Brief Section */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 40px', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
        <div style={{ flex: '2', minWidth: '300px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Project Overview</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '60px' }}>
            {project.description}
          </p>

          {project.challenge && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>The Challenge</h2>
              <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {project.challenge}
              </p>
            </div>
          )}

          {project.solution && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>The Solution</h2>
              <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {project.solution}
              </p>
            </div>
          )}
          
          {project.clientFeedback && (
            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid #ff6a00', borderRadius: '0 12px 12px 0', marginTop: '60px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
              <p style={{ fontSize: '22px', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 24px 0' }}>
                "{project.clientFeedback}"
              </p>
              <div style={{ fontWeight: 700, letterSpacing: '0.05em' }}>— {project.client}</div>
            </div>
          )}

        </div>
        
        <div style={{ flex: '1', minWidth: '300px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', borderRadius: '12px', alignSelf: 'flex-start' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Project Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.1em' }}>Client</span>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{project.client}</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.1em' }}>Timeline</span>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{project.timeTaken}</div>
            </div>
            
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="sp-btn-secondary" style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}>
                View Live Project
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Category Sections */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* MARKETING LAYOUT */}
        {project.type === 'marketing' && project.metrics && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '32px', textAlign: 'center' }}>Campaign Results</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {Object.entries(project.metrics).map(([key, val]) => (
                <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: 800, color: '#ff6a00', marginBottom: '12px' }}>{val}</div>
                  <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>{key}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTOGRAPHY LAYOUT (Masonry Gallery) */}
        {project.type === 'photography' && project.images && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {project.images.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i}`} style={{ width: '100%', borderRadius: '8px', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = 0.8} onMouseLeave={(e) => e.target.style.opacity = 1} />
              ))}
            </div>
          </div>
        )}

        {/* WEB DESIGN LAYOUT (Mockups) */}
        {project.type === 'web' && project.banner && (
          <div style={{ marginBottom: '80px' }}>
             <h2 style={{ fontSize: '32px', marginBottom: '32px', textAlign: 'center' }}>Final Solution</h2>
             <div style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px', borderRadius: '16px' }}>
                <div style={{ width: '100%', height: '40px', background: 'var(--bg)', borderRadius: '8px 8px 0 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></span>
                </div>
                <img src={project.banner} style={{ width: '100%', borderRadius: '0 0 8px 8px' }} />
             </div>
          </div>
        )}

      </div>

      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Link to="/portfolio" className="sp-btn-secondary" style={{ display: 'inline-flex' }}>
          Back to Projects
        </Link>
      </div>

    </div>
  );
};

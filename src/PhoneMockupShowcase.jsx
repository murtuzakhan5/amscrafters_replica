import React from 'react';

export const PhoneMockupShowcase = ({ project }) => {
  if (!project) return null;

  const displayUrl = project.liveLink || 'https://elvenwear.pk/';
  const mainImage = project.banner || project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070';
  const hasLiveLink = Boolean(project.liveLink);

  return (
    <div className="mona-portfolio">
      <div className="eyebrow">DIGITAL EXPERIENCE SHOWCASE</div>
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '10px 0 14px', letterSpacing: '-1.5px', fontWeight: 800 }}>
        {project.title}
      </h2>
      <p className="intro" style={{ maxWidth: '680px', margin: '0 auto 32px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
        An interactive digital experience designed for <strong style={{ color: 'var(--fg)' }}>{project.client || 'our client'}</strong>.
      </p>

      {/* 3D Master Auto-Scrolling Showcase Stage */}
      <div className="master-3d-stage">
        <div className="web-browser-frame">
          {/* Browser Top Navigation Chrome */}
          <div className="browser-header-bar">
            <div className="browser-dots">
              <span className="browser-dot red"></span>
              <span className="browser-dot yellow"></span>
              <span className="browser-dot green"></span>
            </div>

            {/* Live Address Bar */}
            <div className="browser-address-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{displayUrl}</span>
            </div>

            <div className="auto-scroll-badge">
              <span className="pulse-dot"></span>
              <span>LIVE PREVIEW</span>
            </div>
          </div>

          {/* Web Viewport with Smooth Auto-Scroll */}
          <div className="web-viewport" title="Hover to pause preview">
            {hasLiveLink ? (
              <div className="auto-scroll-iframe-wrapper">
                <iframe
                  src={displayUrl}
                  title={project.title}
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            ) : (
              <div className="auto-scroll-content">
                <img src={mainImage} alt={project.title} />
              </div>
            )}
          </div>
        </div>
      </div>

      {project.liveLink && (
        <div style={{ marginTop: '24px' }}>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sp-btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', fontSize: '15px', borderRadius: '99px' }}
          >
            <span>Visit Live Website</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

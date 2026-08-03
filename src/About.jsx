import React, { useEffect, useRef, useState } from 'react';
import './about.css';

export const About = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const text = "We are AMS Crafters - a full-service creative agency built by designers, strategists, and engineers obsessed with results. We don't just build brands, we build businesses that grow faster and last longer.";
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // The section is 280vh tall. We want to track progress while it's scrolling.
      // rect.top goes from 0 down to negative values as we scroll.
      const windowHeight = window.innerHeight;
      
      // Calculate progress between 0 and 1 while the sticky element is pinned
      // Pinned means rect.top <= 0 and rect.bottom >= windowHeight
      if (rect.top <= 0) {
        const totalScrollable = rect.height - windowHeight;
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-section" ref={containerRef}>
      <div className="about-sticky">
        <div className="about-badge-container">
          <span className="section-badge">
            <span className="badge-dot"></span>
            About Us
          </span>
        </div>
        
        <p className="about-text-reveal">
          {words.map((word, i) => {
            // Calculate when this word should light up
            const startReveal = i / words.length;
            // 0.12 is base opacity, 1 is fully revealed
            const isActive = scrollProgress > startReveal;
            const opacity = isActive ? 1 : 0.12;
            
            // Check if the word is part of "AMS Crafters" to apply gradient
            const isAMSCrafters = (word.includes("AMS") || word.includes("Crafters"));
            
            return (
              <span 
                key={i} 
                className={isAMSCrafters ? "text-gradient" : ""}
                style={{
                  display: 'inline',
                  transition: 'opacity 0.15s ease',
                  opacity: opacity,
                  color: isAMSCrafters ? 'transparent' : 'var(--fg)',
                  ...(isAMSCrafters ? { backgroundImage: 'linear-gradient(135deg, #3180b2, #4fa3d8)' } : {})
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>

        <div className="about-scroll-indicator" style={{ opacity: scrollProgress > 0.95 ? 0 : 1 }}>
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
};

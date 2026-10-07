import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import './components.css';

export const Reviews = ({ compact = false }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reviewsRow1, setReviewsRow1] = useState([]);
  const [reviewsRow2, setReviewsRow2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const allReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Split reviews into two rows for the marquee
        const half = Math.ceil(allReviews.length / 2);
        setReviewsRow1(allReviews.slice(0, half));
        setReviewsRow2(allReviews.slice(half));
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (compact) return;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [compact]);

  const transformRow1 = compact ? 'none' : `translateX(-${scrollProgress * 50}vw)`;
  const transformRow2 = compact ? 'none' : `translateX(${(scrollProgress * 50) - 30}vw)`;

  return (
    <section 
      className={`reviews-section ${compact ? 'compact-reviews' : ''}`} 
      ref={containerRef} 
      style={{ height: compact ? 'auto' : '130vh', padding: compact ? '80px 0' : undefined }}
    >
      <div className="reviews-sticky" style={{ position: compact ? 'relative' : undefined, top: compact ? 0 : undefined, height: compact ? 'auto' : undefined }}>
        <div className="reviews-header">
          <span className="section-badge">
            <span className="badge-dot"></span>
            Client Reviews
          </span>
          <h2 className="reviews-title">
            What our clients say <span className="text-gradient">about us</span>
          </h2>
        </div>
        
        <div className="reviews-mask">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Loading reviews...</div>
          ) : (
            <>
              <div className="reviews-track" style={{ animation: 'none', transform: transformRow1, transition: 'transform 0.1s ease-out', width: '200vw' }}>
                {[...reviewsRow1, ...reviewsRow1].map((review, idx) => (
                  <div key={`r1-${idx}`} className="review-card">
                    <div className="review-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--border)'}}>
                        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                        <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                      </svg>
                      <p className="review-text">{review.text}</p>
                    </div>
                    <div className="review-author">
                      {review.image ? (
                        <div className="author-avatar" style={{ background: 'transparent', padding: 0, overflow: 'hidden' }}>
                          <img src={review.image} alt={review.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div className="author-avatar">{review.initial}</div>
                      )}
                      <div>
                        <p className="author-name">{review.author}</p>
                        <p className="author-role">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reviews-track" style={{ animation: 'none', transform: transformRow2, transition: 'transform 0.1s ease-out', width: '200vw', marginTop: '16px' }}>
                {[...reviewsRow2, ...reviewsRow2].map((review, idx) => (
                  <div key={`r2-${idx}`} className="review-card">
                    <div className="review-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--border)'}}>
                        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                        <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                      </svg>
                      <p className="review-text">{review.text}</p>
                    </div>
                    <div className="review-author">
                      {review.image ? (
                        <div className="author-avatar" style={{ background: 'transparent', padding: 0, overflow: 'hidden' }}>
                          <img src={review.image} alt={review.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div className="author-avatar">{review.initial}</div>
                      )}
                      <div>
                        <p className="author-name">{review.author}</p>
                        <p className="author-role">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

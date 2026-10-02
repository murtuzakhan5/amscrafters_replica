import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { usePopup } from './PopupContext';
import { AnimatedBackground } from './AnimatedBackground';

export const Careers = () => {
  const { showAlert } = usePopup();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '', fatherName: '', age: '', gender: 'Male', location: '', portfolio: '', resumeLink: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        setJobs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <AnimatedBackground />
      <div className="sp-wrapper" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '120px 40px 80px 40px' }}>
        <div className="sp-badge-pill-center" style={{ margin: '0 auto 24px' }}>
          <span className="sp-dot"></span>
          <span className="sp-badge-text">Careers</span>
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '0 0 24px 0', letterSpacing: '-2px' }}>
          Join Our Team
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          We are always looking for passionate, talented individuals to join us in crafting exceptional digital experiences.
        </p>
      </div>

      {/* Why Join Us Section - Sticky Scroll */}
      <div className="careers-mobile-pad" style={{ maxWidth: '1200px', margin: '0 auto 100px auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', position: 'relative', alignItems: 'flex-start' }}>
          
          {/* Sticky Left Column */}
          <div className="sticky-desktop" style={{ flex: '1', minWidth: '280px' }}>
            <div className="sp-badge-pill" style={{ marginBottom: '24px' }}>
              <span className="sp-dot"></span>
              <span className="sp-badge-text">Life at AMS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1px', margin: '0 0 24px 0', lineHeight: 1.1 }}>
              Why Build <br />With Us?
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '400px', margin: 0, lineHeight: 1.6 }}>
              We don’t just offer jobs, we offer careers. Build the future with a team that values creativity, autonomy, and continuous growth.
            </p>
          </div>

          {/* Scrolling Right Column */}
          <div style={{ flex: '1.5', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { num: '01', title: 'Fast-Paced Growth', desc: 'Work on cutting-edge projects for global clients. We push boundaries, which means your skills will accelerate faster than anywhere else.' },
              { num: '02', title: 'Output Over Hours', desc: 'We care about the quality of your work, not how many hours you sit at a desk. Enjoy a flexible culture built on trust and autonomy.' },
              { num: '03', title: 'Collaborative Culture', desc: 'No egos. Just a team of passionate makers, designers, and developers supporting each other to build extraordinary digital experiences.' },
              { num: '04', title: 'Health & Wellness', desc: 'We believe you do your best work when you feel your best. We provide comprehensive benefits and genuine respect for your work-life balance.' }
            ].map((perk, i) => (
              <div key={i} className="careers-card-pad" style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--border)', 
                padding: '48px 40px', 
                borderRadius: '24px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(49,128,178,0.4)';
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}>
                <div style={{ color: '#3180b2', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.1em' }}>{perk.num}</div>
                <h3 style={{ fontSize: '28px', marginBottom: '16px', fontWeight: 600, color: 'var(--fg)' }}>{perk.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, margin: 0 }}>{perk.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Jobs List (Grid of Cards) */}
      <div className="careers-mobile-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', textAlign: 'center' }}>
          Open Positions
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '40px 0' }}>Loading open positions...</div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '80px 0', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '24px', margin: '0 0 12px 0' }}>No Openings Right Now</h3>
            <p style={{ margin: 0 }}>Check back later or send us your resume at hr@brandedgecreations.io</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="careers-card-pad"
                onClick={() => { setSelectedJob(job); setIsApplying(false); }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border)', 
                  padding: '32px', 
                  borderRadius: '20px', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(49,128,178,0.4)';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(49,128,178,0.1)', color: '#3180b2', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {job.type}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </div>
                </div>
                <h3 style={{ fontSize: '24px', margin: '0 0 16px 0', lineHeight: 1.3 }}>{job.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {job.description}
                </p>
                <div style={{ color: '#00ff88', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  View Details &rarr;
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Details & Application Modal */}
      {selectedJob && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, padding: '20px'
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            animation: 'spFadeUp 0.3s ease'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>{isApplying ? 'Apply for Position' : selectedJob.title}</h3>
                {isApplying && <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>{selectedJob.title}</p>}
              </div>
              <button 
                onClick={() => { setSelectedJob(null); setIsApplying(false); }}
                style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '24px', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px', overflowY: 'auto' }}>
              {!isApplying ? (
                // Job Details View
                <>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      {selectedJob.type}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {selectedJob.location}
                    </span>
                  </div>
                  
                  <h4 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--fg)' }}>Job Description</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
                    {selectedJob.description}
                  </p>

                  {selectedJob.requirements && (
                    <>
                      <h4 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--fg)' }}>Requirements</h4>
                      <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0, background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', borderLeft: '2px solid var(--border)' }}>
                        {selectedJob.requirements}
                      </p>
                    </>
                  )}
                </>
              ) : (
                // Application Form View
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    try {
                      await addDoc(collection(db, 'applications'), {
                        ...formData,
                        jobId: selectedJob.id,
                        jobTitle: selectedJob.title,
                        createdAt: serverTimestamp(),
                        status: 'New'
                      });
                      showAlert('Application submitted successfully!', 'success');
                      setSelectedJob(null);
                      setIsApplying(false);
                      setFormData({ name: '', fatherName: '', age: '', gender: 'Male', location: '', portfolio: '', resumeLink: '' });
                    } catch (error) {
                      console.error('Error submitting application', error);
                      showAlert('Failed to submit application. Please try again.', 'error');
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Full Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Father's Name</label>
                      <input type="text" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Age</label>
                      <input type="number" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Gender</label>
                      <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>City / Location</label>
                    <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Portfolio Link (Optional)</label>
                    <input type="url" placeholder="https://..." value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Resume / CV Link (Google Drive / Dropbox)</label>
                    <input type="url" required placeholder="Make sure the link is public" value={formData.resumeLink} onChange={e => setFormData({...formData, resumeLink: e.target.value})} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} />
                  </div>
                  
                  {/* Hidden submit button to trigger form validation on Enter */}
                  <button type="submit" id="submitApp" style={{ display: 'none' }}></button>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 24px 24px' }}>
              <button 
                onClick={() => {
                  if (isApplying) setIsApplying(false);
                  else setSelectedJob(null);
                }}
                style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                {isApplying ? 'Back' : 'Close'}
              </button>
              
              {!isApplying ? (
                <button 
                  onClick={() => setIsApplying(true)}
                  style={{ background: '#3180b2', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Apply Now
                </button>
              ) : (
                <button 
                  onClick={() => document.getElementById('submitApp').click()}
                  disabled={submitting}
                  style={{ background: '#3180b2', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

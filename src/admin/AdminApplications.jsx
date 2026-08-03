import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminApplications = () => {
  const { showAlert, showConfirm } = usePopup();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setApplications(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching applications: ", error);
      showAlert("Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = (id) => {
    showConfirm('Delete this application permanently?', async () => {
      try {
        await deleteDoc(doc(db, 'applications', id));
        fetchApplications();
      } catch (error) {
        console.error("Error deleting application: ", error);
        showAlert("Failed to delete", "error");
      }
    });
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status: newStatus });
      fetchApplications();
    } catch (error) {
      console.error("Error updating status: ", error);
      showAlert("Failed to update status", "error");
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Job Applications</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Review candidates who have applied for open positions.</p>

      {loading ? (
        <div style={{ color: 'var(--muted)' }}>Loading applications...</div>
      ) : applications.length === 0 ? (
        <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', margin: 0 }}>No applications received yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {applications.map((app) => (
            <div key={app.id} style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', margin: '0 0 8px 0', color: 'var(--fg)' }}>{app.name}</h3>
                  <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '4px' }}>Applied for: <span style={{ color: '#fff', fontWeight: 600 }}>{app.jobTitle}</span></div>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>
                    Date: {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleString() : 'Just now'}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <select 
                    value={app.status || 'New'}
                    onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                    style={{
                      background: app.status === 'Shortlisted' ? 'rgba(0,255,136,0.1)' : app.status === 'Rejected' ? 'rgba(255,50,50,0.1)' : 'rgba(255,106,0,0.1)',
                      color: app.status === 'Shortlisted' ? '#00ff88' : app.status === 'Rejected' ? '#ff3232' : '#ff6a00',
                      border: '1px solid currentColor',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      outline: 'none',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <option style={{ color: '#000' }} value="New">New</option>
                    <option style={{ color: '#000' }} value="Under Review">Under Review</option>
                    <option style={{ color: '#000' }} value="Shortlisted">Shortlisted</option>
                    <option style={{ color: '#000' }} value="Rejected">Rejected</option>
                  </select>

                  <button 
                    onClick={() => handleDelete(app.id)}
                    style={{ background: 'rgba(255,50,50,0.1)', color: '#ff3232', border: '1px solid rgba(255,50,50,0.2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Father's Name</div>
                  <div style={{ fontSize: '15px' }}>{app.fatherName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age & Gender</div>
                  <div style={{ fontSize: '15px' }}>{app.age} years, {app.gender}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>City/Location</div>
                  <div style={{ fontSize: '15px' }}>{app.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a 
                  href={app.resumeLink} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ background: 'var(--fg)', color: 'var(--bg)', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', flex: 1, textAlign: 'center' }}
                >
                  View Resume (Google Drive)
                </a>
                {app.portfolio && (
                  <a 
                    href={app.portfolio} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border)', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', flex: 1, textAlign: 'center' }}
                  >
                    View Portfolio
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

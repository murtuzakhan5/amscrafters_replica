import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminConsultations = () => {
  const { showAlert, showConfirm } = usePopup();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    try {
      const q = query(collection(db, 'consultations'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setConsultations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching consultations: ", error);
      showAlert("Failed to load consultations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleDelete = (id) => {
    showConfirm('Delete this consultation request?', async () => {
      try {
        await deleteDoc(doc(db, 'consultations', id));
        fetchConsultations();
        showAlert('Request deleted successfully', 'success');
      } catch (error) {
        console.error("Error deleting request: ", error);
        showAlert("Failed to delete request", "error");
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'consultations', id), { status: newStatus });
      fetchConsultations();
      showAlert(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error("Error updating status: ", error);
      showAlert("Failed to update status", "error");
    }
  };

  return (
    <div style={{ padding: '0', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Consultation Requests</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Review and manage client meeting requests.</p>

      {loading ? (
        <div style={{ color: 'var(--muted)' }}>Loading requests...</div>
      ) : consultations.length === 0 ? (
        <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', margin: 0 }}>No consultation requests yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {consultations.map((req) => (
            <div key={req.id} style={{ 
              background: 'var(--surface)', 
              border: `1px solid ${req.status === 'New' ? '#ff6a00' : 'var(--border)'}`, 
              borderRadius: '16px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '20px', margin: '0 0 4px 0' }}>{req.name} {req.company ? `(${req.company})` : ''}</h3>
                  <p style={{ color: 'var(--muted)', margin: 0, fontSize: '14px' }}>
                    <a href={`mailto:${req.email}`} style={{ color: '#4fa3d8', textDecoration: 'none' }}>{req.email}</a> • {req.phone}
                  </p>
                </div>
                <div>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '99px', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    background: req.status === 'New' ? 'rgba(255, 106, 0, 0.1)' : 'rgba(255,255,255,0.05)',
                    color: req.status === 'New' ? '#ff6a00' : 'var(--muted)'
                  }}>
                    {req.status || 'New'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Required</p>
                  <p style={{ margin: 0, fontWeight: 600 }}>{req.service}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Date/Time</p>
                  <p style={{ margin: 0, fontWeight: 600, color: '#ff6a00' }}>
                    {req.date ? new Date(req.date).toLocaleString() : 'Not provided'}
                  </p>
                </div>
              </div>

              {req.message && (
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message / Project Details</p>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>{req.message}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: 'auto' }}>
                {req.status === 'New' && (
                  <button 
                    onClick={() => handleStatusChange(req.id, 'Reviewed')}
                    style={{ background: 'var(--fg)', color: 'var(--bg)', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                  >
                    Mark as Reviewed
                  </button>
                )}
                {req.status === 'Reviewed' && (
                  <button 
                    onClick={() => handleStatusChange(req.id, 'New')}
                    style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                  >
                    Mark as New
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(req.id)}
                  style={{ background: 'rgba(255,50,50,0.1)', color: '#ff3232', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginLeft: 'auto' }}
                >
                  Delete Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminInbox = () => {
  const { showAlert, showConfirm } = usePopup();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching inquiries: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    showConfirm('Delete this inquiry permanently?', async () => {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
        fetchInquiries();
      } catch (error) {
        console.error("Error deleting inquiry: ", error);
        showAlert("Failed to delete", "error");
      }
    });
  };

  const handleMarkRead = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { isRead: !currentStatus });
      fetchInquiries();
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '1000px' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0' }}>Inbox</h1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>View inquiries from the Contact Us form.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
             <div style={{ padding: '32px', color: 'var(--muted)' }}>Loading messages...</div>
          ) : inquiries.length === 0 ? (
             <div style={{ padding: '32px', color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>No inquiries yet.</div>
          ) : (
            inquiries.map(inq => (
              <div key={inq.id} style={{ background: 'var(--surface)', border: `1px solid ${inq.isRead ? 'var(--border)' : '#ff6a00'}`, borderRadius: '12px', padding: '24px', display: 'flex', gap: '24px', opacity: inq.isRead ? 0.7 : 1 }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', color: '#ff6a00' }}>
                      {inq.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '16px' }}>{inq.name}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '12px' }}>{inq.email} • {new Date(inq.createdAt?.toDate()).toLocaleString()}</div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px dashed var(--border)' }}>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: '8px' }}>Service Needed: {inq.service}</div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{inq.message}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '120px' }}>
                  <button 
                    onClick={() => handleMarkRead(inq.id, inq.isRead)}
                    style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--fg)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                  >
                    {inq.isRead ? 'Mark Unread' : 'Mark as Read'}
                  </button>
                  <button 
                    onClick={() => handleDelete(inq.id)}
                    style={{ padding: '8px 16px', background: 'rgba(255,95,86,0.1)', border: '1px solid rgba(255,95,86,0.2)', color: '#ff5f56', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                  >
                    Delete
                  </button>
                  <a 
                    href={`mailto:${inq.email}`}
                    style={{ padding: '8px 16px', background: '#3180b2', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
                  >
                    Reply via Email
                  </a>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

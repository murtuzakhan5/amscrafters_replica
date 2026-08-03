import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminClients = () => {
  const { showAlert, showConfirm } = usePopup();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', logoBase64: '' });

  const fetchClients = async () => {
    try {
      const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setClients(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching clients: ", error);
      showAlert("Failed to load clients", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        showAlert("File size must be less than 2MB", "error");
        e.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logoBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.logoBase64) {
      showAlert("Please provide both name and logo.", "error");
      return;
    }
    setAdding(true);
    try {
      await addDoc(collection(db, 'clients'), {
        name: formData.name,
        logo: formData.logoBase64,
        createdAt: serverTimestamp()
      });
      showAlert("Client added successfully!", "success");
      setFormData({ name: '', logoBase64: '' });
      document.getElementById('client-logo-upload').value = null;
      fetchClients();
    } catch (error) {
      console.error("Error adding client: ", error);
      showAlert("Failed to add client", "error");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = (id) => {
    showConfirm('Delete this client?', async () => {
      try {
        await deleteDoc(doc(db, 'clients', id));
        fetchClients();
        showAlert('Client deleted successfully', 'success');
      } catch (error) {
        console.error("Error deleting client: ", error);
        showAlert("Failed to delete client", "error");
      }
    });
  };

  return (
    <div style={{ padding: '0', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Client Logos</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Manage the client logos shown in the Portfolio carousel.</p>

      {/* Add Client Form */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Add New Client</h3>
        <form onSubmit={handleAddClient} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 250px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Client Name</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} 
              placeholder="e.g. Aman Transport"
            />
          </div>
          <div style={{ flex: '1 1 250px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Client Logo (Image, max 2MB)</label>
            <input 
              type="file" 
              accept="image/*"
              id="client-logo-upload"
              required
              onChange={handleFileChange} 
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px', color: 'var(--fg)', borderRadius: '8px' }} 
            />
          </div>
          <button 
            type="submit" 
            disabled={adding}
            style={{ flex: '0 0 auto', background: '#ff6a00', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: 600, cursor: adding ? 'not-allowed' : 'pointer', opacity: adding ? 0.7 : 1 }}
          >
            {adding ? 'Uploading...' : 'Add Client'}
          </button>
        </form>

        {formData.logoBase64 && (
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', display: 'inline-block' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--muted)' }}>Logo Preview:</p>
            <img src={formData.logoBase64} alt="Preview" style={{ height: '60px', objectFit: 'contain' }} />
          </div>
        )}
      </div>

      {/* Clients Grid */}
      {loading ? (
        <div style={{ color: 'var(--muted)' }}>Loading clients...</div>
      ) : clients.length === 0 ? (
        <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', margin: 0 }}>No clients added yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {clients.map((client) => (
            <div key={client.id} style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '12px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              position: 'relative'
            }}>
              <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                <img src={client.logo} alt={client.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--fg)' }}>{client.name}</h4>
                <button 
                  onClick={() => handleDelete(client.id)}
                  style={{ width: '100%', background: 'rgba(255,50,50,0.1)', color: '#ff3232', border: '1px solid rgba(255,50,50,0.2)', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

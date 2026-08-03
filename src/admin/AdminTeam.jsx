import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminTeam = () => {
  const { showAlert, showConfirm } = usePopup();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    linkedIn: '',
    order: 1
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'team_members'));
      const snapshot = await getDocs(q);
      const fetchedMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort client-side so documents without 'order' aren't hidden
      fetchedMembers.sort((a, b) => (a.order || 999) - (b.order || 999));
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching team: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600; // Smaller width for team members
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // 70% quality JPEG Base64
        };
      };
    });
  };

  const handleAddOrUpdateMember = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile) return showAlert('Please select a photo', 'error');
    
    setUploading(true);
    try {
      let base64Image = null;
      if (imageFile) {
        base64Image = await compressImage(imageFile);
      }

      const memberData = {
        name: formData.name,
        role: formData.role,
        linkedIn: formData.linkedIn,
        order: Number(formData.order)
      };

      if (base64Image) {
        memberData.image = base64Image;
      }

      if (editingId) {
        await updateDoc(doc(db, 'team_members', editingId), memberData);
        showAlert('Team member updated', 'success');
      } else {
        memberData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'team_members'), memberData);
        showAlert('Team member added', 'success');
      }
      
      setFormData({ name: '', role: '', linkedIn: '', order: 1 });
      setImageFile(null);
      setEditingId(null);
      if (e.target) e.target.reset(); // Reset file input
      fetchMembers();
    } catch (error) {
      console.error("Error saving team member: ", error);
      showAlert("Failed to save member", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      linkedIn: member.linkedIn || '',
      order: member.order || 1
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMember = async (id) => {
    showConfirm('Remove this team member?', async () => {
      try {
        await deleteDoc(doc(db, 'team_members', id));
        fetchMembers();
      } catch (error) {
        console.error("Error deleting member: ", error);
        showAlert("Failed to delete member", "error");
      }
    });
  };

  const inputStyle = { background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', color: 'var(--fg)', borderRadius: '6px', outline: 'none', width: '100%', marginTop: '6px' };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '800px' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0' }}>Manage Team</h1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Upload and manage team members displayed on the Team page.</p>
        </div>

        <form onSubmit={handleAddOrUpdateMember} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Role</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>LinkedIn URL (Optional)</label>
              <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleChange} style={inputStyle} min="1" required />
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Photo {editingId && '(Leave empty to keep current)'}</label>
              <input type="file" onChange={e => setImageFile(e.target.files[0])} style={inputStyle} required={!editingId} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '10px', display: 'flex', gap: '12px' }}>
            <button type="submit" className="sp-btn-primary" disabled={uploading}>
              {uploading ? 'Saving...' : (editingId ? 'Update Team Member' : 'Add Team Member')}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', role: '', linkedIn: '', order: 1 });
                }} 
                style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {loading ? (
             <div style={{ padding: '32px', color: 'var(--muted)' }}>Loading...</div>
          ) : members.length === 0 ? (
             <div style={{ padding: '32px', color: 'var(--muted)' }}>No team members found.</div>
          ) : (
            members.map(member => (
              <div key={member.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '16px' }}>{member.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '16px' }}>{member.role}</div>
                  <div style={{ color: '#ff6a00', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>Order: {member.order || 'N/A'}</div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEdit(member)}
                      style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--fg)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', flex: 1 }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      style={{ background: 'rgba(255,95,86,0.1)', color: '#ff5f56', border: '1px solid rgba(255,95,86,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', flex: 1 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminReviews = () => {
  const { showAlert, showConfirm } = usePopup();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [formData, setFormData] = useState({ text: '', author: '', role: '', imageBase64: '' });

  const fetchReviews = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setReviews(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching reviews: ", error);
      showAlert("Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
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
        setFormData({ ...formData, imageBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!formData.text || !formData.author) {
      showAlert("Review text and author are required.", "error");
      return;
    }
    setAdding(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        text: formData.text,
        author: formData.author,
        role: formData.role,
        image: formData.imageBase64,
        initial: formData.author.charAt(0).toUpperCase(),
        createdAt: serverTimestamp()
      });
      showAlert("Review added successfully!", "success");
      setFormData({ text: '', author: '', role: '', imageBase64: '' });
      document.getElementById('review-image-upload').value = null;
      fetchReviews();
    } catch (error) {
      console.error("Error adding review: ", error);
      showAlert("Failed to add review", "error");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = (id) => {
    showConfirm('Delete this review?', async () => {
      try {
        await deleteDoc(doc(db, 'reviews', id));
        fetchReviews();
        showAlert('Review deleted successfully', 'success');
      } catch (error) {
        console.error("Error deleting review: ", error);
        showAlert("Failed to delete review", "error");
      }
    });
  };

  return (
    <div style={{ padding: '0', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Client Reviews</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Manage the testimonials shown on the Homepage.</p>

      {/* Add Review Form */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Add New Review</h3>
        <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Review Text</label>
            <textarea 
              required
              rows="4"
              value={formData.text} 
              onChange={e => setFormData({...formData, text: e.target.value})} 
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px', resize: 'vertical' }} 
              placeholder="What did the client say?"
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Author Name</label>
              <input 
                type="text" 
                required
                value={formData.author} 
                onChange={e => setFormData({...formData, author: e.target.value})} 
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} 
                placeholder="e.g. Adnan"
              />
            </div>
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Role / Designation</label>
              <input 
                type="text" 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})} 
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', color: 'var(--fg)', borderRadius: '8px' }} 
                placeholder="e.g. Founder, Jesup Wireless"
              />
            </div>
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Author Image (Optional, max 2MB)</label>
              <input 
                type="file" 
                accept="image/*"
                id="review-image-upload"
                onChange={handleFileChange} 
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px', color: 'var(--fg)', borderRadius: '8px' }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={adding}
            style={{ alignSelf: 'flex-start', background: '#ff6a00', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: 600, cursor: adding ? 'not-allowed' : 'pointer', opacity: adding ? 0.7 : 1 }}
          >
            {adding ? 'Adding...' : 'Add Review'}
          </button>
        </form>

        {formData.imageBase64 && (
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', display: 'inline-block' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--muted)' }}>Image Preview:</p>
            <img src={formData.imageBase64} alt="Preview" style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        )}
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div style={{ color: 'var(--muted)' }}>Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', margin: 0 }}>No reviews added yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '12px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, flex: 1, fontStyle: 'italic', margin: 0 }}>"{review.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                {review.image ? (
                  <img src={review.image} alt={review.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ff6a00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {review.initial}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--fg)', fontSize: '15px', fontWeight: 600 }}>{review.author}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>{review.role}</div>
                </div>
                <button 
                  onClick={() => handleDelete(review.id)}
                  style={{ background: 'rgba(255,50,50,0.1)', color: '#ff3232', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
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

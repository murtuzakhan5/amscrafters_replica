import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminCategories = () => {
  const { showAlert, showConfirm } = usePopup();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching categories: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    setAdding(true);
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategory.trim(),
        createdAt: serverTimestamp()
      });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error("Error adding category: ", error);
      showAlert("Failed to add category", "error");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    showConfirm('Are you sure you want to delete this category? Note: Projects using this category might not display correctly on the frontend.', async () => {
      try {
        await deleteDoc(doc(db, 'categories', id));
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category: ", error);
        showAlert("Failed to delete category", "error");
      }
    });
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '800px' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0' }}>Manage Categories</h1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Add or remove service categories used in the portfolio.</p>
        </div>

        <form onSubmit={handleAddCategory} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>New Category Name</label>
            <input 
              type="text" 
              value={newCategory} 
              onChange={e => setNewCategory(e.target.value)} 
              placeholder="e.g. 3D Animation" 
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', color: 'var(--fg)', borderRadius: '6px', outline: 'none', width: '100%' }} 
              required 
            />
          </div>
          <button type="submit" className="sp-btn-primary" disabled={adding}>
            {adding ? 'Adding...' : 'Add Category'}
          </button>
        </form>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>
          ) : categories.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No categories found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Category Name</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, width: '100px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{cat.name}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ff5f56', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

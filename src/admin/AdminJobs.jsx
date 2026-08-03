import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminJobs = () => {
  const { showAlert, showConfirm } = usePopup();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-Time', // Full-Time, Part-Time, Contract
    location: '', // Remote, Dubai, etc.
    description: '',
    requirements: '' // Multiline text for bullet points
  });

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setJobs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        title: formData.title,
        type: formData.type,
        location: formData.location,
        description: formData.description,
        requirements: formData.requirements,
        createdAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, 'jobs', editingId), jobData);
        showAlert('Job updated successfully!', 'success');
      } else {
        await addDoc(collection(db, 'jobs'), jobData);
        showAlert('Job posted successfully!', 'success');
      }

      setFormData({ title: '', type: 'Full-Time', location: '', description: '', requirements: '' });
      setEditingId(null);
      fetchData();

    } catch (error) {
      console.error(error);
      showAlert('Error saving job: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job.id);
    setFormData({
      title: job.title || '',
      type: job.type || 'Full-Time',
      location: job.location || '',
      description: job.description || '',
      requirements: job.requirements || ''
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    showConfirm('Are you sure you want to delete this job posting?', async () => {
      try {
        await deleteDoc(doc(db, 'jobs', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting job", error);
        showAlert('Error deleting job: ' + error.message, 'error');
      }
    });
  };

  const inputStyle = {
    background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', color: 'var(--fg)', borderRadius: '6px', outline: 'none', width: '100%', marginTop: '6px'
  };

  return (
    <div style={{ padding: '40px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      
      {/* Form Section */}
      <div style={{ flex: '1', background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px', position: 'sticky', top: '40px' }}>
        <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>{editingId ? 'Edit Job Posting' : 'Post a New Job'}</h2>
        <p style={{ color: 'var(--muted)', margin: '0 0 32px 0' }}>Fill out the details below to publish a job opening.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Job Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} placeholder="e.g. Senior Frontend Developer" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Job Type</label>
              <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} placeholder="e.g. Remote, Dubai" required />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Job Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" style={{...inputStyle, resize: 'vertical'}} placeholder="Briefly describe the role..." required></textarea>
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Requirements (One per line)</label>
            <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="6" style={{...inputStyle, resize: 'vertical'}} placeholder="- ReactJS proficiency&#10;- 3+ Years Experience&#10;- Excellent Communication"></textarea>
          </div>

          <div style={{ marginTop: '12px' }}>
            <button type="submit" className="sp-btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? (editingId ? 'Updating...' : 'Publishing...') : (editingId ? 'Update Job' : 'Publish Job')}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', type: 'Full-Time', location: '', description: '', requirements: '' }) }} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border)', color: 'white', borderRadius: '6px', marginTop: '12px', cursor: 'pointer' }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div style={{ flex: '1', minWidth: '400px' }}>
        <h2 style={{ fontSize: '24px', margin: '0 0 24px 0' }}>Open Positions ({jobs.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobs.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--muted)' }}>
              No jobs posted yet.
            </div>
          ) : jobs.map(job => (
            <div key={job.id} style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: '#ff6a00' }}>💼</span> {job.type}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: '#00ff88' }}>📍</span> {job.location}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(job)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                  <button onClick={() => handleDelete(job.id)} style={{ background: 'rgba(255,0,0,0.1)', border: 'none', color: '#ff4444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

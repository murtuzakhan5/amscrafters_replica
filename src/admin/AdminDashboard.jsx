import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminDashboard = () => {
  const { showAlert, showConfirm } = usePopup();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const fetchData = async () => {
    // Fetch Categories
    const catSnap = await getDocs(collection(db, 'categories'));
    setCategories(catSnap.docs.map(doc => doc.data().name));
    
    // Fetch Projects
    const projQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const projSnap = await getDocs(projQuery);
    setProjects(projSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '', // Default fallback
    timeTaken: '',
    description: '',
    challenge: '',
    solution: '',
    clientFeedback: '',
    liveLink: '',
    roas: '',
    conversions: '',
    messages: '',
  });

  const [files, setFiles] = useState({
    thumbnail: null,
    banner: null,
    gallery: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'gallery') {
      setFiles({ ...files, gallery: Array.from(e.target.files) });
    } else {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  const compressImage = (file, maxWidth = 800) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let scaleSize = maxWidth / img.width;
          if (scaleSize > 1) scaleSize = 1; // Don't upscale
          canvas.width = img.width * scaleSize;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.6)); // 60% quality JPEG
        };
      };
    });
  };

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const maxWidth = path === 'banners' ? 1200 : 800;
    return await compressImage(file, maxWidth);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload Images
      const thumbUrl = await uploadFile(files.thumbnail, 'thumbnails');
      const bannerUrl = await uploadFile(files.banner, 'banners');
      
      let galleryUrls = [];
      if (formData.category === 'Photography' && files.gallery.length > 0) {
        for (let file of files.gallery) {
          const url = await uploadFile(file, 'gallery');
          galleryUrls.push(url);
        }
      }

      // 2. Build Project Object
      const typeMap = {
        'Web Design': 'web',
        'E-Commerce': 'web',
        'Branding': 'web',
        'App Dev': 'web',
        'Marketing': 'marketing',
        'Photography': 'photography'
      };

      const projectData = {
        title: formData.title,
        client: formData.client,
        category: formData.category,
        timeTaken: formData.timeTaken,
        description: formData.description,
        challenge: formData.challenge || '',
        solution: formData.solution || '',
        clientFeedback: formData.clientFeedback || '',
        liveLink: formData.liveLink || '',
        type: typeMap[formData.category] || 'web', // Fallback to web layout
        createdAt: serverTimestamp(),
      };

      if (thumbUrl) projectData.thumbnail = thumbUrl;
      if (bannerUrl) projectData.banner = bannerUrl;

      if (formData.category === 'Marketing') {
        projectData.metrics = {
          roas: formData.roas,
          conversions: formData.conversions,
          messages: formData.messages
        };
      }

      if (formData.category === 'Photography') {
        projectData.thumbnail = 'collage';
        projectData.images = galleryUrls;
      }

      // 3. Save to Firestore
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
        showAlert('Project updated successfully!', 'success');
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        showAlert('Project uploaded successfully!', 'success');
      }
      
      setFormData({
        title: '', client: '', category: '', timeTaken: '', description: '', challenge: '', solution: '', clientFeedback: '', liveLink: '', roas: '', conversions: '', messages: ''
      });
      setFiles({ thumbnail: null, banner: null, gallery: [] });
      setEditingId(null);
      fetchData();
      
    } catch (error) {
      console.error(error);
      showAlert('Error uploading project: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      client: project.client || '',
      category: project.category || '',
      timeTaken: project.timeTaken || '',
      description: project.description || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      clientFeedback: project.clientFeedback || '',
      liveLink: project.liveLink || '',
      roas: project.metrics?.roas || '',
      conversions: project.metrics?.conversions || '',
      messages: project.metrics?.messages || ''
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    showConfirm('Are you sure you want to delete this project?', async () => {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting project", error);
        showAlert('Error deleting project: ' + error.message, 'error');
      }
    });
  };

  const inputStyle = {
    background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', color: 'var(--fg)', borderRadius: '6px', outline: 'none', width: '100%', marginTop: '6px'
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ maxWidth: '800px' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0' }}>Projects Dashboard</h1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Upload new projects to your portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Project Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Client Name</label>
              <input type="text" name="client" value={formData.client} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                {categories.length > 0 ? (
                  categories.map(c => <option key={c} value={c}>{c}</option>)
                ) : (
                  <option value="Web Design">Web Design</option>
                )}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Time Taken</label>
              <input type="text" name="timeTaken" value={formData.timeTaken} onChange={handleChange} placeholder="e.g. 4 Weeks" style={inputStyle} required />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Project Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" style={{...inputStyle, resize: 'vertical'}} required></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>The Challenge (Optional)</label>
              <textarea name="challenge" value={formData.challenge} onChange={handleChange} rows="3" style={{...inputStyle, resize: 'vertical'}} placeholder="What problem were you trying to solve?"></textarea>
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>The Solution (Optional)</label>
              <textarea name="solution" value={formData.solution} onChange={handleChange} rows="3" style={{...inputStyle, resize: 'vertical'}} placeholder="How did you solve it?"></textarea>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Client Feedback / Testimonial (Optional)</label>
            <textarea name="clientFeedback" value={formData.clientFeedback} onChange={handleChange} rows="3" style={{...inputStyle, resize: 'vertical'}} placeholder='"They did an amazing job..."'></textarea>
          </div>

          <div>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Live Link (Optional)</label>
            <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="https://" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border)', borderRadius: '8px' }}>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Thumbnail Image</label>
              <input type="file" name="thumbnail" onChange={handleFileChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Banner Image</label>
              <input type="file" name="banner" onChange={handleFileChange} style={inputStyle} />
            </div>
          </div>

          {formData.category === 'Marketing' && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#ff6a00' }}>Marketing Metrics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div><input type="text" name="roas" value={formData.roas} onChange={handleChange} placeholder="4.5x" style={inputStyle} /></div>
                <div><input type="text" name="conversions" value={formData.conversions} onChange={handleChange} placeholder="+210%" style={inputStyle} /></div>
                <div><input type="text" name="messages" value={formData.messages} onChange={handleChange} placeholder="5k+" style={inputStyle} /></div>
              </div>
            </div>
          )}

           {formData.category === 'Photography' && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#ff6a00' }}>Gallery Images</h3>
              <div>
                <input type="file" name="gallery" multiple onChange={handleFileChange} style={inputStyle} />
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <button type="submit" className="sp-btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Project' : 'Upload Project')}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({title: '', client: '', category: '', timeTaken: '', description: '', challenge: '', solution: '', clientFeedback: '', liveLink: '', roas: '', conversions: '', messages: ''}) }} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border)', color: 'white', borderRadius: '6px', marginTop: '12px', cursor: 'pointer' }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>Manage Existing Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projects.length === 0 ? (
              <p style={{ color: 'var(--muted)' }}>No projects found.</p>
            ) : projects.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#111' }}>
                     {p.thumbnail && <img src={p.thumbnail !== 'collage' ? p.thumbnail : p.images?.[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>{p.title}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '99px' }}>{p.category}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => handleEdit(p)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} style={{ background: 'rgba(255,0,0,0.1)', border: 'none', color: '#ff4444', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

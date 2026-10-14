import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const DEFAULT_SERVICES = [
  { title: '360 Marketing', slug: '360-marketing', desc: 'Campaign Strategy & Growth', color: '#3180b2', order: 1, thumbnail: '/services/360-marketing.webp' },
  { title: 'Website Design', slug: 'website-design', desc: 'UI/UX & Web Development', color: '#1d5375', order: 2, thumbnail: '/services/website-design.webp' },
  { title: 'App Development', slug: 'mobile-app', desc: 'iOS & Android Mobile Apps', color: '#4fa3d8', order: 3, thumbnail: '/services/mobile-app.webp' },
  { title: 'Software Development', slug: 'software-development', desc: 'Custom SaaS & Platforms', color: '#276994', order: 4, thumbnail: '/services/software-development.webp' },
  { title: 'SEO', slug: 'seo', desc: 'Rank higher, grow organic traffic', color: '#3180b2', order: 5, thumbnail: '/services/seo.webp' },
  { title: 'Branding', slug: 'branding', desc: 'Brand Identity & Logo Design', color: '#1d5375', order: 6, thumbnail: '/services/branding.webp' },
  { title: 'Graphic Design', slug: 'graphic-design', desc: 'Social & Print Media', color: '#4fa3d8', order: 7, thumbnail: '/services/graphic-design.webp' },
  { title: 'Product Photography', slug: 'product-photography', desc: 'E-commerce & Lifestyle', color: '#276994', order: 8, thumbnail: '/services/product-photography.webp' },
  { title: 'CRM Solutions', slug: 'crm-solutions', desc: 'Streamline operations', color: '#133a54', order: 9, thumbnail: '/services/crm-solutions.webp' },
  { title: 'Shopify Development', slug: 'shopify', desc: 'Shopify Storefronts', color: '#3180b2', order: 10, thumbnail: '/services/shopify.webp' },
  { title: 'E-Commerce', slug: 'ecommerce', desc: 'Custom Online Stores', color: '#1d5375', order: 11, thumbnail: '/services/ecommerce.webp' },
];

export const AdminServices = () => {
  const { showAlert, showConfirm } = usePopup();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Edit / Add Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [previewThumb, setPreviewThumb] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    desc: '',
    color: '#3180b2',
    order: 1,
    thumbnail: ''
  });

  // Fetch services from Firestore
  const fetchServices = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (a.order || 99) - (b.order || 99));
        setServices(list);
      } else {
        // First time initialization: initialize with default services
        setServices(DEFAULT_SERVICES.map((s, idx) => ({ id: s.slug || `srv-${idx}`, ...s })));
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      showAlert("Could not load services from database. Displaying defaults.", "error");
      setServices(DEFAULT_SERVICES.map((s, idx) => ({ id: s.slug || `srv-${idx}`, ...s })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Compress image to lightweight Base64
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 500;
          const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  // Open Edit Modal for a service
  const handleOpenEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      desc: service.desc || '',
      color: service.color || '#3180b2',
      order: service.order || 1,
      thumbnail: service.thumbnail || ''
    });
    setPreviewThumb(service.thumbnail || `/services/${service.slug}.webp`);
    setIsModalOpen(true);
  };

  // Open Add New Service Modal
  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      desc: '',
      color: '#3180b2',
      order: services.length + 1,
      thumbnail: ''
    });
    setPreviewThumb('');
    setIsModalOpen(true);
  };

  // Handle Thumbnail File Selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showAlert("Image file size should be less than 5MB", "error");
      return;
    }

    try {
      const compressedBase64 = await compressImage(file);
      setPreviewThumb(compressedBase64);
      setFormData(prev => ({ ...prev, thumbnail: compressedBase64 }));
    } catch (err) {
      console.error("Image compression error:", err);
      showAlert("Failed to process image. Please try another.", "error");
    }
  };

  // Quick Direct Upload for a service card
  const handleQuickUpload = (service) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        showAlert("Processing and updating thumbnail...", "info");
        const compressedBase64 = await compressImage(file);
        const docId = service.id || service.slug;
        await setDoc(doc(db, 'services', docId), {
          ...service,
          thumbnail: compressedBase64,
          updatedAt: serverTimestamp()
        }, { merge: true });
        showAlert(`Thumbnail updated for "${service.title}"!`, "success");
        fetchServices();
      } catch (err) {
        console.error("Error updating thumbnail:", err);
        showAlert("Failed to update thumbnail.", "error");
      }
    };
    input.click();
  };

  // Save Service (Create or Update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showAlert("Title and Slug are required", "error");
      return;
    }

    setSaving(true);
    try {
      const cleanSlug = formData.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
      const docId = editingService ? (editingService.id || cleanSlug) : cleanSlug;

      const payload = {
        title: formData.title,
        slug: cleanSlug,
        desc: formData.desc,
        color: formData.color,
        order: Number(formData.order) || 1,
        thumbnail: formData.thumbnail || (editingService ? editingService.thumbnail : `/services/${cleanSlug}.webp`),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'services', docId), payload, { merge: true });
      showAlert(`Service "${formData.title}" saved successfully!`, "success");
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error("Error saving service:", err);
      showAlert("Failed to save service.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete Service
  const handleDelete = (service) => {
    showConfirm(`Are you sure you want to delete "${service.title}"?`, async () => {
      try {
        const docId = service.id || service.slug;
        await deleteDoc(doc(db, 'services', docId));
        showAlert("Service deleted successfully", "success");
        fetchServices();
      } catch (err) {
        console.error("Error deleting service:", err);
        showAlert("Failed to delete service", "error");
      }
    });
  };

  // Revert / Reset all services to default seeds in Firestore
  const handleSeedDefaults = () => {
    showConfirm("Initialize/Reset all 11 default services with standard thumbnails in database?", async () => {
      setLoading(true);
      try {
        const batch = writeBatch(db);
        DEFAULT_SERVICES.forEach((s) => {
          const docRef = doc(db, 'services', s.slug);
          batch.set(docRef, {
            ...s,
            updatedAt: serverTimestamp()
          });
        });
        await batch.commit();
        showAlert("All default services have been initialized in database!", "success");
        fetchServices();
      } catch (err) {
        console.error("Error seeding defaults:", err);
        showAlert("Failed to reset services.", "error");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div style={{ padding: '36px 32px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚡</span> Services & Dropdown Thumbnails
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>
            Upload, change, and manage thumbnails for each service. All edits reflect in the website header dropdown in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSeedDefaults}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--muted)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🔄</span> Sync All Defaults
          </button>

          <button
            onClick={handleOpenAdd}
            className="btn-primary"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              height: '38px',
              padding: '0 18px',
              borderRadius: '8px'
            }}
          >
            <span>+</span> Add New Service
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)' }}>
          Loading services & thumbnails...
        </div>
      ) : services.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>No services found in database.</p>
          <button onClick={handleSeedDefaults} className="btn-primary" style={{ cursor: 'pointer' }}>
            Initialize Default Services
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {services.map((service, idx) => (
            <div
              key={service.id || service.slug || idx}
              style={{
                background: 'rgba(17, 24, 39, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Top Row: Thumbnail & Info */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {/* Thumbnail Display */}
                <div style={{ position: 'relative', width: '84px', height: '62px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.12)', background: service.color || '#1e293b' }}>
                  <img
                    src={service.thumbnail || `/services/${service.slug}.webp`}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.backgroundColor = service.color || '#3180b2';
                      e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
                    }}
                  />
                  {service.thumbnail?.startsWith('data:') && (
                    <span style={{ position: 'absolute', bottom: '3px', right: '3px', background: 'rgba(16, 185, 129, 0.9)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 4px', borderRadius: '4px' }}>
                      CUSTOM
                    </span>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: service.color || '#3180b2' }}></span>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {service.title}
                    </h3>
                  </div>
                  <div style={{ fontSize: '12px', color: '#4fa3d8', fontFamily: 'monospace', marginBottom: '3px' }}>
                    /services/{service.slug}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {service.desc}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => handleQuickUpload(service)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(79, 163, 216, 0.12)',
                    border: '1px solid rgba(79, 163, 216, 0.35)',
                    color: '#4fa3d8',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  title="Upload a new thumbnail image for this service"
                >
                  <span>📷</span> Upload Image
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(service)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#e2e8f0',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Edit service details"
                >
                  <span>✏️</span> Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(service)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#ef4444',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                  title="Delete service"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Service Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          padding: '20px'
        }}>
          <div style={{
            background: '#0d131f',
            border: '1px solid rgba(79, 163, 216, 0.3)',
            borderRadius: '18px',
            width: '520px',
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Thumbnail Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Service Thumbnail (Dropdown & Banners)
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '110px', height: '76px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', background: formData.color || '#1e293b', flexShrink: 0 }}>
                    {previewThumb ? (
                      <img src={previewThumb} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px' }}>
                        No Image
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      id="modal-thumb-file"
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor="modal-thumb-file"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        background: 'rgba(79, 163, 216, 0.15)',
                        border: '1px solid rgba(79, 163, 216, 0.4)',
                        color: '#4fa3d8',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginBottom: '6px'
                      }}
                    >
                      <span>📁</span> Choose Image File (PNG, JPG, WebP)
                    </label>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      Auto-compressed for instant loading. Max 5MB.
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => {
                    const title = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      title,
                      slug: !editingService && !prev.slug ? title.toLowerCase().replace(/[^a-z0-9]/g, '-') : prev.slug
                    }));
                  }}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  placeholder="e.g. Website Design"
                />
              </div>

              {/* Slug */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  URL Slug (/services/:slug) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  placeholder="e.g. website-design"
                />
              </div>

              {/* Short Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Short Subtitle / Description (Dropdown Tagline)
                </label>
                <input
                  type="text"
                  value={formData.desc}
                  onChange={e => setFormData({ ...formData, desc: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  placeholder="e.g. UI/UX & Web Development"
                />
              </div>

              {/* Color & Order */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Accent Color
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={e => setFormData({ ...formData, color: e.target.value })}
                      style={{ width: '40px', height: '38px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'none' }}
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={e => setFormData({ ...formData, color: e.target.value })}
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    min="1"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--muted)',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                  style={{
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                >
                  {saving ? 'Saving Changes...' : (editingService ? 'Save Changes' : 'Create Service')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

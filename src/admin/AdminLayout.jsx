import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--fg)' }}>Loading Admin...</div>;
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Projects', icon: '📁' },
    { path: '/admin/categories', label: 'Categories', icon: '🏷️' },
    { path: '/admin/clients', label: 'Clients', icon: '🤝' },
    { path: '/admin/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/admin/team', label: 'Team Members', icon: '👥' },
    { path: '/admin/jobs', label: 'Jobs', icon: '💼' },
    { path: '/admin/applications', label: 'Applications', icon: '📝' },
    { path: '/admin/consultations', label: 'Consultations', icon: '🗓️' },
    { path: '/admin/inbox', label: 'Inbox', icon: '📥' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      
      {/* Sidebar */}
      <div style={{ width: '260px', background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border)' }}>
          <img src="/brand-white-logo.png" alt="Logo" style={{ height: '24px', marginBottom: '12px' }} />
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 700 }}>CMS Dashboard</div>
        </div>
        
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: location.pathname === item.path ? '#fff' : 'var(--muted)',
                background: location.pathname === item.path ? 'rgba(255,255,255,0.05)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          {/* Careers Section */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ 
              color: 'var(--muted)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              padding: '0 20px', 
              marginBottom: '12px' 
            }}>
              Careers
            </div>
            <Link to="/admin/jobs" style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', 
              color: location.pathname === '/admin/jobs' ? 'var(--fg)' : 'var(--muted)', 
              background: location.pathname === '/admin/jobs' ? 'rgba(255,255,255,0.05)' : 'transparent',
              textDecoration: 'none', borderRadius: '12px', transition: 'all 0.2s', margin: '0 12px 4px 12px' 
            }}>
              💼 Jobs Listing
            </Link>
            <Link to="/admin/applications" style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', 
              color: location.pathname === '/admin/applications' ? 'var(--fg)' : 'var(--muted)', 
              background: location.pathname === '/admin/applications' ? 'rgba(255,255,255,0.05)' : 'transparent',
              textDecoration: 'none', borderRadius: '12px', transition: 'all 0.2s', margin: '0 12px' 
            }}>
              📄 Applications
            </Link>
          </div>
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background='rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.target.style.background='transparent'}>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        <Outlet />
      </div>

    </div>
  );
};

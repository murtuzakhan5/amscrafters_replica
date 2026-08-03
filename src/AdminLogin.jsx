import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      // If user is not found, automatically create the account for the client
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        try {
           await createUserWithEmailAndPassword(auth, email, password);
           navigate('/admin/dashboard');
        } catch (signupErr) {
           setError('Could not create account: ' + signupErr.message);
        }
      } else {
        setError('Login failed: ' + err.message);
      }
    }
  };

  return (
    <div className="sp-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '60px 40px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/brand-white-logo.png" alt="Logo" style={{ height: '30px', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '24px', margin: 0 }}>Admin Panel</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '8px' }}>Sign in to manage portfolio</p>
        </div>

        {error && <div style={{ color: '#ff6a00', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', color: 'var(--fg)', borderRadius: '6px', outline: 'none' }}
              placeholder="admin@amscrafters.io"
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', color: 'var(--fg)', borderRadius: '6px', outline: 'none' }}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="sp-btn-primary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
            Sign In
          </button>
          
        </form>
      </div>
    </div>
  );
};

import React from 'react';

export const Placeholder = ({ title }) => {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
      <h1 style={{ fontSize: '48px', color: 'var(--fg)', marginBottom: '16px' }}>{title}</h1>
      <p style={{ color: 'var(--muted)', fontSize: '18px' }}>Page content coming soon.</p>
    </div>
  );
};

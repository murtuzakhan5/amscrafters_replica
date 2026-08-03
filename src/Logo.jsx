import React from 'react';

export const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
      <img src="/ams-icon.png" alt="AMS Icon" style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block' }} />
      <span style={{ fontSize: '20px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--fg)', fontWeight: 800 }}>AMS </span>
        <span style={{ color: '#3180b2', fontWeight: 600 }}>CRAFTERS</span>
      </span>
    </div>
  );
};

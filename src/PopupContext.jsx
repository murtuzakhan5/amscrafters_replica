import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '', type: 'info' });
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, message: '', onConfirm: null });

  const showAlert = (message, type = 'info') => {
    setAlertConfig({ isOpen: true, message, type });
  };

  const showConfirm = (message, onConfirm) => {
    setConfirmConfig({ isOpen: true, message, onConfirm });
  };

  const closeAlert = () => setAlertConfig({ ...alertConfig, isOpen: false });
  
  const handleConfirmAction = () => {
    if (confirmConfig.onConfirm) confirmConfig.onConfirm();
    setConfirmConfig({ ...confirmConfig, isOpen: false });
  };
  
  const closeConfirm = () => setConfirmConfig({ ...confirmConfig, isOpen: false });

  return (
    <PopupContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      {/* Global Alert Modal */}
      {alertConfig.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999
        }}>
          <div style={{
            background: 'var(--surface, #1e1e24)',
            border: '1px solid var(--border, #333)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            animation: 'spFadeUp 0.3s ease'
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '30px',
              background: alertConfig.type === 'error' ? 'rgba(255,50,50,0.1)' : 'rgba(0,255,136,0.1)',
              color: alertConfig.type === 'error' ? '#ff3232' : '#00ff88',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', margin: '0 auto 20px auto'
            }}>
              {alertConfig.type === 'error' ? '!' : '✓'}
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--fg, #fff)' }}>
              {alertConfig.type === 'error' ? 'Error' : 'Success'}
            </h3>
            <p style={{ color: 'var(--muted, #aaa)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.5 }}>
              {alertConfig.message}
            </p>
            <button onClick={closeAlert} style={{
              background: 'var(--fg, #fff)', color: 'var(--bg, #000)',
              border: 'none', padding: '12px 32px', borderRadius: '8px',
              fontWeight: 600, cursor: 'pointer', width: '100%'
            }}>
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Global Confirm Modal */}
      {confirmConfig.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999
        }}>
          <div style={{
            background: 'var(--surface, #1e1e24)',
            border: '1px solid var(--border, #333)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            animation: 'spFadeUp 0.3s ease'
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '30px',
              background: 'rgba(255,106,0,0.1)',
              color: '#ff6a00',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', margin: '0 auto 20px auto'
            }}>
              ?
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--fg, #fff)' }}>Please Confirm</h3>
            <p style={{ color: 'var(--muted, #aaa)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.5 }}>
              {confirmConfig.message}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={closeConfirm} style={{
                background: 'rgba(255,255,255,0.05)', color: 'var(--fg, #fff)',
                border: '1px solid var(--border, #333)', padding: '12px', borderRadius: '8px',
                fontWeight: 600, cursor: 'pointer', flex: 1
              }}>
                Cancel
              </button>
              <button onClick={handleConfirmAction} style={{
                background: '#ff3232', color: '#fff',
                border: 'none', padding: '12px', borderRadius: '8px',
                fontWeight: 600, cursor: 'pointer', flex: 1
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </PopupContext.Provider>
  );
};

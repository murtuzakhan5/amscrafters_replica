import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import './components.css';

export const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        setClients(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <section className="clients-section">
      <div className="clients-header">
        <span className="clients-subtitle">Trusted by growing businesses</span>
      </div>
      <div className="clients-mask">
        <div className="clients-track">
          {clients.length > 0 ? (
            [...clients, ...clients, ...clients, ...clients].map((client, idx) => (
              <div key={`${client.id}-${idx}`} className="client-logo-wrap">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="client-logo-img"
                />
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', color: 'var(--muted)' }}>Loading clients...</div>
          )}
        </div>
      </div>
    </section>
  );
};

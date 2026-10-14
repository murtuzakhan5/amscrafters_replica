import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { usePopup } from '../PopupContext';

export const AdminLeads = () => {
  const { showAlert, showConfirm } = usePopup();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, 'chat_leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setLeads(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching chat leads: ", error);
      showAlert("Failed to load chat leads", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = (id) => {
    showConfirm('Are you sure you want to delete this lead record?', async () => {
      try {
        await deleteDoc(doc(db, 'chat_leads', id));
        fetchLeads();
        showAlert('Lead record deleted successfully', 'success');
      } catch (error) {
        console.error("Error deleting lead: ", error);
        showAlert("Failed to delete lead", "error");
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'chat_leads', id), { status: newStatus });
      fetchLeads();
      showAlert(`Status updated to "${newStatus}"`, 'success');
    } catch (error) {
      console.error("Error updating status: ", error);
      showAlert("Failed to update status", "error");
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.service || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = leads.length;
  const newCount = leads.filter(l => l.status === 'New').length;
  const contactedCount = leads.filter(l => l.status === 'Contacted').length;
  const meetingCount = leads.filter(l => l.status === 'Meeting Scheduled').length;

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: 'var(--fg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>🤖</span>
            <h1 style={{ fontSize: '30px', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
              AI Chatbot Leads & Meeting Inquiries
            </h1>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '6px' }}>
            Live leads captured 24/7 by the AMS Crafters AI Assistant. Click to direct call or email clients.
          </p>
        </div>
        <button 
          onClick={fetchLeads} 
          style={{ 
            padding: '10px 18px', 
            borderRadius: '8px', 
            background: 'rgba(255,255,255,0.06)', 
            border: '1px solid var(--border)', 
            color: 'var(--fg)', 
            cursor: 'pointer', 
            fontSize: '13px', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🔄 Refresh Leads
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Inquiries</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--fg)', marginTop: '8px' }}>{totalCount}</div>
        </div>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#60a5fa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Leads (To Call)</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#93c5fd', marginTop: '8px' }}>{newCount}</div>
        </div>
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacted</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#fde68a', marginTop: '8px' }}>{contactedCount}</div>
        </div>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#34d399', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meetings Scheduled</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#a7f3d0', marginTop: '8px' }}>{meetingCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search by client name, email, phone, or service..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '260px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '12px 18px',
            borderRadius: '10px',
            color: 'var(--fg)',
            outline: 'none',
            fontSize: '14px'
          }}
        />
        <select 
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '12px 18px',
            borderRadius: '10px',
            color: 'var(--fg)',
            outline: 'none',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          <option value="All">All Statuses</option>
          <option value="New">Status: New</option>
          <option value="Contacted">Status: Contacted</option>
          <option value="Meeting Scheduled">Status: Meeting Scheduled</option>
          <option value="Closed - Won">Status: Closed - Won</option>
          <option value="Archived">Status: Archived</option>
        </select>
      </div>

      {/* Leads List */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading AI chatbot leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div style={{ padding: '48px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📬</div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>No chat leads found</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
            {searchTerm || statusFilter !== 'All' ? 'Try adjusting your search or filters.' : 'Leads submitted by website visitors in the 24/7 AI Chatbot will automatically appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredLeads.map(lead => {
            const dateStr = lead.createdAt?.toDate 
              ? lead.createdAt.toDate().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
              : 'Recently';

            return (
              <div 
                key={lead.id} 
                style={{
                  background: 'var(--surface)',
                  border: lead.status === 'New' ? '1px solid rgba(79, 163, 216, 0.45)' : '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: lead.status === 'New' ? '0 8px 24px rgba(49, 128, 178, 0.12)' : 'none',
                  position: 'relative'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #3180b2, #4fa3d8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', color: '#fff' }}>
                      {lead.name ? lead.name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--fg)' }}>
                        {lead.name || 'Unnamed Visitor'}
                      </h3>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Captured on {dateStr} via 24/7 AI Chatbot</span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>Status:</span>
                    <select 
                      value={lead.status || 'New'}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid var(--border)',
                        background: lead.status === 'New' ? '#1e3a8a' : lead.status === 'Contacted' ? '#78350f' : '#064e3b',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="New">🔵 New</option>
                      <option value="Contacted">🟡 Contacted</option>
                      <option value="Meeting Scheduled">🟢 Meeting Scheduled</option>
                      <option value="Closed - Won">⭐ Closed - Won</option>
                      <option value="Archived">⚪ Archived</option>
                    </select>
                  </div>
                </div>

                {/* Contact details & action buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Phone (Click to Call)</span>
                    <div style={{ marginTop: '4px' }}>
                      <a 
                        href={`tel:${lead.phone}`} 
                        style={{ color: '#4fa3d8', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        title="Click to dial this phone number directly"
                      >
                        📞 {lead.phone || 'No phone provided'}
                      </a>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Email Address</span>
                    <div style={{ marginTop: '4px' }}>
                      <a 
                        href={`mailto:${lead.email}`} 
                        style={{ color: '#4fa3d8', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        title="Click to email client"
                      >
                        ✉️ {lead.email || 'No email provided'}
                      </a>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Service Needed</span>
                    <div style={{ fontSize: '14.5px', fontWeight: 600, marginTop: '4px' }}>
                      🛠️ {lead.service || 'General Inquiry'}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Preferred Meeting Time</span>
                    <div style={{ fontSize: '14px', marginTop: '4px', color: 'var(--fg)' }}>
                      ⏰ {lead.preferredTime || 'As soon as possible'}
                    </div>
                  </div>
                </div>

                {/* Notes & Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {lead.chatTranscript && (
                      <button 
                        onClick={() => setSelectedTranscript(lead.chatTranscript)}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border)',
                          color: 'var(--fg)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        💬 View Chat Transcript
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={() => handleDelete(lead.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#f87171',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    🗑️ Delete Lead
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Transcript Modal */}
      {selectedTranscript && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setSelectedTranscript(null)}
        >
          <div 
            style={{
              background: '#0e121d',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>AI Conversation Transcript</h3>
              <button 
                onClick={() => setSelectedTranscript(null)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto', whiteSpace: 'pre-wrap', fontSize: '13px', lineHeight: 1.6, color: '#cbd5e1' }}>
              {selectedTranscript}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

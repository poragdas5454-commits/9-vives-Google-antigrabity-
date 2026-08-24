import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const ContactPage = () => {
  const { settings } = useStoreSettings();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge-tag badge-accent" style={{ marginBottom: '10px' }}>
            9 VIVES CONCIERGE
          </span>
          <h1 style={{ fontSize: '36px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            GET IN TOUCH
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '8px auto 0 auto' }}>
            Have questions regarding sizing, custom orders, or shipping status? Our concierge team is at your service.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          {/* Info Card */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-color)' }}>
              9 VIVES HEADQUARTERS
            </h3>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '14px' }}>
              <MapPin size={20} color="var(--accent-color)" style={{ marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: '#fff' }}>STORE & FLAGSHIP STUDIO</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{settings.address || "House 9, Road 9, Banani, Dhaka, Bangladesh"}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '14px' }}>
              <Mail size={20} color="var(--accent-color)" />
              <div>
                <strong style={{ display: 'block', color: '#fff' }}>SUPPORT EMAIL</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{settings.supportEmail || "concierge@9vives.com"}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '14px' }}>
              <Phone size={20} color="var(--accent-color)" />
              <div>
                <strong style={{ display: 'block', color: '#fff' }}>CLIENT HELPLINE</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{settings.supportPhone || "+880 1700-9VIVES"}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              SEND US A MESSAGE
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>YOUR NAME *</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  placeholder="Samiur Rahman" 
                  className="input-field" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>EMAIL ADDRESS *</label>
                <input 
                  type="email" 
                  required 
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})} 
                  placeholder="samiur@example.com" 
                  className="input-field" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>SUBJECT</label>
                <input 
                  type="text" 
                  value={form.subject} 
                  onChange={e => setForm({...form, subject: e.target.value})} 
                  placeholder="Sizing advice / Order inquiry" 
                  className="input-field" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>MESSAGE *</label>
                <textarea 
                  required 
                  rows={4} 
                  value={form.message} 
                  onChange={e => setForm({...form, message: e.target.value})} 
                  placeholder="How can 9 Vives concierge assist you?" 
                  className="input-field" 
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '14px' }}>
                <Send size={16} />
                <span>SEND MESSAGE</span>
              </button>

              {submitted && (
                <p style={{ fontSize: '12px', color: 'var(--accent-color)', textAlign: 'center', fontWeight: '700' }}>
                  ✓ Message sent! 9 Vives concierge will reply shortly.
                </p>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

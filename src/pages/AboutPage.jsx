import React, { useEffect } from 'react';
import { Layers, ShieldCheck, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const AboutPage = ({ setActivePage }) => {
  const { settings, setSEOTitle } = useStoreSettings();

  useEffect(() => {
    setSEOTitle("Brand Story & Philosophy", 'default');
  }, [settings]);

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Banner */}
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '50px'
        }}>
          <span className="badge-tag badge-accent" style={{ marginBottom: '12px' }}>
            THE PHILOSOPHY OF 9 VIVES
          </span>
          <h1 style={{ fontSize: '38px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            MODERN FASHION. UNCOMPROMISED QUALITY.
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            9 Vives is a modern luxury streetwear and fashion brand created for individuals who appreciate heavy cotton weight, tailored silhouettes, and minimalist confidence.
          </p>
        </div>

        {/* Content Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '20px', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '16px' }}>
              OUR FABRIC STANDARD
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
              Most off-the-rack t-shirts use lightweight 140–160 GSM fabric that loses its shape after a single wash cycle. At <strong>9 Vives</strong>, we engineer custom 240+ GSM combed cotton. This ensures a substantial drape, crisp collar retention, and zero shrinkage over lifetime wear.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
              <div>
                <strong style={{ fontSize: '24px', color: '#fff', display: 'block', fontFamily: 'var(--font-heading)' }}>240+ GSM</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Heavyweight combed cotton</span>
              </div>
              <div>
                <strong style={{ fontSize: '24px', color: '#fff', display: 'block', fontFamily: 'var(--font-heading)' }}>100% COMBED</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Silky smooth skin feel</span>
              </div>
              <div>
                <strong style={{ fontSize: '24px', color: '#fff', display: 'block', fontFamily: 'var(--font-heading)' }}>PRE-SHRUNK</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dimensional stability</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '20px', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '16px' }}>
              THE 9 VIVES FIT SILHOUETTE
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Our oversized tees are meticulously proportioned with dropped shoulders and a boxy body cut that sits effortlessly on any frame. Whether paired with raw denim, cargo trousers, or layered under outerwear, <strong>9 Vives</strong> establishes an elevated streetwear look.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setActivePage('shop')} className="btn-primary" style={{ padding: '16px 40px' }}>
              EXPLORE 9 VIVES COLLECTIONS
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

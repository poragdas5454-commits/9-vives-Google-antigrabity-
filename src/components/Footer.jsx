import React, { useState } from 'react';
import { Send, ShieldCheck, Truck, RefreshCw, Globe, Share2 } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
  </svg>
);

export const Footer = ({ setActivePage }) => {
  const { settings } = useStoreSettings();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const socialLinks = settings.socialLinks || {};

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '60px',
      paddingBottom: '40px',
      marginTop: '80px'
    }}>
      {/* Brand Commitments Bar */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '30px',
        paddingBottom: '50px',
        marginBottom: '50px',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}>
            <Truck size={24} color="var(--accent-color)" />
          </div>
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>EXPRESS DELIVERY</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fast delivery across Bangladesh</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}>
            <ShieldCheck size={24} color="var(--accent-color)" />
          </div>
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>240 GSM COTTON</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>100% Combed luxury cotton</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}>
            <RefreshCw size={24} color="var(--accent-color)" />
          </div>
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>EASY EXCHANGES</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>7-day effortless size exchange</p>
          </div>
        </div>
      </div>

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '40px',
        paddingBottom: '40px'
      }}>

        {/* Brand Information Column */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: '800',
            letterSpacing: '0.12em',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            9 VIVES
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.7' }}>
            9 Vives represents contemporary streetwear crafted with uncompromised attention to fit, fabric weight, and minimalist luxury aesthetics.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '14px' }}>
            {socialLinks.facebook && (
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                <FacebookIcon size={16} />
              </a>
            )}
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                <InstagramIcon size={16} />
              </a>
            )}
            {socialLinks.youtube && (
              <a 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                <YoutubeIcon size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            COLLECTIONS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li>
              <button onClick={() => setActivePage('shop', { category: 'Oversized Tees' })} style={{ color: 'inherit' }}>
                Oversized T-Shirts
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('shop', { category: 'Graphic Tees' })} style={{ color: 'inherit' }}>
                Graphic Streetwear
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('shop', { category: 'Outerwear' })} style={{ color: 'inherit' }}>
                Heavyweight Hoodies
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('shop', { category: 'Basics' })} style={{ color: 'inherit' }}>
                Minimalist Basics
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            9 VIVES CONCIERGE
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li><button onClick={() => setActivePage('about')} style={{ color: 'inherit' }}>About 9 Vives</button></li>
            <li><button onClick={() => setActivePage('contact')} style={{ color: 'inherit' }}>Size Guide & Care</button></li>
            <li><button onClick={() => setActivePage('contact')} style={{ color: 'inherit' }}>Shipping & Delivery</button></li>
            <li><button onClick={() => setActivePage('account')} style={{ color: 'inherit' }}>Track Your Order</button></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            JOIN THE 9 VIVES CLUB
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Subscribe to receive private drop alerts, early access to new releases, and exclusive member discounts.
          </p>
          
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={newsletterEmail} 
              onChange={(e) => setNewsletterEmail(e.target.value)} 
              required 
              className="input-field" 
              style={{ fontSize: '12px', padding: '10px 14px' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 16px' }}>
              <Send size={14} />
            </button>
          </form>

          {subscribed && (
            <p style={{ fontSize: '12px', color: 'var(--accent-color)', marginTop: '8px', fontWeight: '600' }}>
              ✓ Welcome to 9 Vives Club! Check your inbox.
            </p>
          )}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="container" style={{
        borderTop: '1px solid var(--border-light)',
        paddingTop: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <div>
          © {new Date().getFullYear()} <strong>9 VIVES</strong>. All rights reserved. Premium T-Shirts & Modern Fashion.
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <button 
            onClick={() => setActivePage('admin')}
            style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase' }}
          >
            🔒 Admin Console (/admin)
          </button>
        </div>
      </div>
    </footer>
  );
};

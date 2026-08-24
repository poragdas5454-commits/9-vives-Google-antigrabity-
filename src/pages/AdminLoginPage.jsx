import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, ArrowRight, Key, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const AdminLoginPage = ({ onLoginSuccess, onReturnToStore }) => {
  const { settings } = useStoreSettings();
  const { loginAdminCredentials } = useAuth();

  const [email, setEmail] = useState('admin@9vives.com');
  const [password, setPassword] = useState('admin123');

  const handleExecuteLogin = () => {
    loginAdminCredentials(email, password);
    onLoginSuccess();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleExecuteLogin();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#070707',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'var(--font-body)'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '40px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '12px',
        background: '#111111',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            background: 'var(--accent-color)',
            color: '#000',
            fontWeight: '900',
            fontSize: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            fontFamily: 'var(--font-heading)'
          }}>
            9V
          </div>

          <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.2em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
            OFFICIAL SAAS MANAGEMENT PORTAL
          </span>

          <h1 style={{ fontSize: '26px', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '6px', color: '#ffffff' }}>
            9 VIVES ADMIN
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Sign in to access 9 Vives SaaS Admin Console, manage orders & customer profiles.
          </p>
        </div>

        {/* Direct Access Button */}
        <button
          onClick={handleExecuteLogin}
          className="btn-accent"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '13px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Key size={18} />
          <span>ENTER ADMIN DASHBOARD NOW</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>OR ENTER ADMIN CREDENTIALS</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-secondary)' }}>
              ADMIN EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="admin@9vives.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '38px', fontSize: '13px' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-secondary)' }}>
              ADMIN PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '38px', fontSize: '13px' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '13px', marginTop: '8px' }}>
            <span>SIGN IN & OPEN ADMIN DASHBOARD</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button onClick={onReturnToStore} style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Return to 9 Vives Customer Storefront
          </button>
        </div>

      </div>
    </div>
  );
};

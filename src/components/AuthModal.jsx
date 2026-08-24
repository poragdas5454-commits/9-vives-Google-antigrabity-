import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Lock, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { customerUser, registerCustomer, loginCustomer, logoutCustomer } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    postalCode: '1212',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isSignUp) {
      const res = registerCustomer(form);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => onClose(), 1500);
      } else {
        setErrorMsg(res.message);
      }
    } else {
      const res = loginCustomer(form.email, form.password);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => onClose(), 1200);
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 280,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div 
        onClick={onClose}
        style={{ position: 'absolute', inset: 0 }}
      />

      <div className="animate-fade-in glass-card" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '480px',
        padding: '32px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-primary)' }}
        >
          <X size={20} />
        </button>

        {customerUser ? (
          /* User Logged In Summary */
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              color: 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <User size={30} />
            </div>

            <span className="badge-tag badge-accent">REGISTERED 9 VIVES CUSTOMER</span>
            <h2 style={{ fontSize: '20px', textTransform: 'uppercase' }}>{customerUser.fullName}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{customerUser.email} | {customerUser.phone}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Address: {customerUser.address}, {customerUser.city}</p>

            <button 
              onClick={() => {
                logoutCustomer();
                onClose();
              }}
              className="btn-secondary"
              style={{ marginTop: '10px' }}
            >
              LOGOUT FROM ACCOUNT
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                9 VIVES CUSTOMER PORTAL
              </span>
              <h2 style={{ fontSize: '22px', textTransform: 'uppercase', marginTop: '6px' }}>
                {isSignUp ? 'CUSTOMER REGISTRATION' : 'CUSTOMER SIGN IN'}
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isSignUp ? 'Create your 9 Vives account to purchase products & track delivery' : 'Sign in with your registered email and password'}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {isSignUp && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="Samiur Rahman"
                      value={form.fullName}
                      onChange={e => setForm({...form, fullName: e.target.value})}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712-345678"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>DELIVERY STREET ADDRESS *</label>
                    <input
                      type="text"
                      required
                      placeholder="House no, Road no, Area"
                      value={form.address}
                      onChange={e => setForm({...form, address: e.target.value})}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>CITY</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => setForm({...form, city: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>POSTAL CODE</label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={e => setForm({...form, postalCode: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  placeholder="samiur@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>PASSWORD *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="input-field"
                />
              </div>

              {errorMsg && (
                <p style={{ fontSize: '12px', color: '#ef4444', textAlign: 'center', fontWeight: '600' }}>
                  {errorMsg}
                </p>
              )}

              {successMsg && (
                <p style={{ fontSize: '12px', color: 'var(--accent-color)', textAlign: 'center', fontWeight: '700' }}>
                  ✓ {successMsg}
                </p>
              )}

              <button type="submit" className="btn-primary" style={{ padding: '14px', marginTop: '8px' }}>
                <span>{isSignUp ? 'COMPLETE REGISTRATION' : 'SIGN IN TO 9 VIVES'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
              {isSignUp ? (
                <p>
                  Already registered?{' '}
                  <button 
                    onClick={() => {
                      setIsSignUp(false);
                      setErrorMsg('');
                    }} 
                    style={{ color: 'var(--accent-color)', fontWeight: '700' }}
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Need an account?{' '}
                  <button 
                    onClick={() => {
                      setIsSignUp(true);
                      setErrorMsg('');
                    }} 
                    style={{ color: 'var(--accent-color)', fontWeight: '700' }}
                  >
                    Register Account
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

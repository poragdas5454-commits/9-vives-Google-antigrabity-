import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X, Sparkles } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Header = ({ activePage, setActivePage, onSearchClick, onAuthClick }) => {
  const { settings } = useStoreSettings();
  const { cartCount, setIsCartOpen } = useCart();
  const { customerUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP ALL' },
    { id: 'oversized', label: 'OVERSIZED TEES', category: 'Oversized Tees' },
    { id: 'outerwear', label: 'HOODIES & FLEECE', category: 'Outerwear' },
    { id: 'about', label: 'BRAND STORY' },
    { id: 'contact', label: 'CONCIERGE' },
  ];

  const handleNavClick = (link) => {
    if (link.category) {
      setActivePage('shop', { category: link.category });
    } else {
      setActivePage(link.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        background: '#000000',
        color: '#d4af37',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '8px 0',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <Sparkles size={13} color="#d4af37" />
        <span>9 VIVES CONCIERGE — FREE SHIPPING NATIONWIDE ON ORDERS OVER ৳ 3,000</span>
        <Sparkles size={13} color="#d4af37" />
      </div>

      {/* Main Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'var(--transition-normal)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}>

          {/* Left: Mobile Toggle & Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', color: 'var(--text-primary)' }}
              className="mobile-toggle-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav style={{ display: 'flex', gap: '28px' }} className="desktop-nav">
              {navLinks.map((link) => (
                <button
                  key={link.id + (link.category || '')}
                  onClick={() => handleNavClick(link)}
                  style={{
                    color: activePage === link.id ? 'var(--accent-color)' : 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                  onMouseLeave={(e) => {
                    if (activePage !== link.id) e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Center: Brand Logo (9 Vives) */}
          <div 
            onClick={() => setActivePage('home')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              userSelect: 'none'
            }}
          >
            {settings.logoURLs?.primary ? (
              <img 
                src={settings.logoURLs.primary} 
                alt={settings.brandName || "9 Vives"} 
                style={{ height: '36px', objectFit: 'contain' }} 
              />
            ) : (
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: '800',
                letterSpacing: '0.12em',
                color: '#ffffff',
                textTransform: 'uppercase',
                lineHeight: 1
              }}>
                9 VIVES
              </span>
            )}
            <span style={{
              fontSize: '9px',
              fontWeight: '700',
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginTop: '3px'
            }}>
              EST. DHAKA
            </span>
          </div>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={onSearchClick}
              style={{ color: 'var(--text-primary)', transition: 'var(--transition-fast)' }}
              title="Search 9 Vives"
            >
              <Search size={20} />
            </button>

            {/* Customer User Account / Register / Login Trigger */}
            <button
              onClick={onAuthClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: customerUser ? 'var(--accent-color)' : 'var(--text-primary)',
                transition: 'var(--transition-fast)'
              }}
              title={customerUser ? `Logged in as ${customerUser.fullName}` : "Customer Sign In / Register"}
            >
              <User size={20} />
              {customerUser && (
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                  {customerUser.fullName.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                color: 'var(--text-primary)',
                padding: '6px'
              }}
              title="Shopping Bag"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-4px',
                  background: 'var(--accent-color)',
                  color: '#000',
                  fontSize: '10px',
                  fontWeight: '800',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {navLinks.map((link) => (
              <button
                key={link.id + (link.category || '')}
                onClick={() => handleNavClick(link)}
                style={{
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  color: activePage === link.id ? 'var(--accent-color)' : 'var(--text-primary)',
                  padding: '8px 0'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Responsive Inline CSS for Navigation */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

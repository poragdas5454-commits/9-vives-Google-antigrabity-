import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const CartDrawer = ({ onCheckoutClick }) => {
  const { settings } = useStoreSettings();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    discountCode,
    applyPromoCode,
    subtotal,
    discountAmount,
    total,
    cartCount
  } = useCart();

  const [inputCode, setInputCode] = React.useState('');
  const [promoMessage, setPromoMessage] = React.useState(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e) => {
    e.preventDefault();
    const res = applyPromoCode(inputCode);
    setPromoMessage(res);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      {/* Backdrop overlay trigger */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Drawer content */}
      <div className="animate-fade-in" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        background: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              YOUR BAG ({cartCount})
            </h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ color: 'var(--text-primary)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '12px 24px',
          borderBottom: '1px solid var(--border-light)',
          fontSize: '12px',
          color: 'var(--text-secondary)'
        }}>
          {subtotal >= 3000 ? (
            <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>
              ✓ CONGRATULATIONS! You have unlocked Free Nationwide Shipping!
            </span>
          ) : (
            <span>
              Add <strong>{settings.currency || '৳'} {(3000 - subtotal).toLocaleString()}</strong> more for Free Shipping.
            </span>
          )}
        </div>

        {/* Cart Line Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '15px', marginBottom: '16px' }}>Your shopping bag is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '10px 20px' }}
              >
                DISCOVER 9 VIVES TEES
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{
                    width: '80px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    background: '#121212'
                  }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
                      9 VIVES
                    </span>
                    <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Size: <strong>{item.selectedSize}</strong> | Color: <strong>{item.selectedColor}</strong>
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <button 
                        onClick={() => updateQuantity(index, -1)}
                        style={{ padding: '4px 10px', color: 'var(--text-primary)' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '13px', fontWeight: '700' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(index, 1)}
                        style={{ padding: '4px 10px', color: 'var(--text-primary)' }}
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700' }}>
                        {settings.currency || '৳'} {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeFromCart(index)}
                        style={{ color: 'var(--text-muted)' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCode} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="PROMO CODE (e.g. VIVES10)" 
                value={inputCode} 
                onChange={(e) => setInputCode(e.target.value)} 
                className="input-field" 
                style={{ fontSize: '12px', padding: '8px 12px', textTransform: 'uppercase' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '11px' }}>
                APPLY
              </button>
            </form>
            {promoMessage && (
              <p style={{
                fontSize: '11px',
                color: promoMessage.success ? 'var(--accent-color)' : '#ef4444',
                fontWeight: '600'
              }}>
                {promoMessage.message}
              </p>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{settings.currency || '৳'} {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-color)' }}>
                  <span>Discount ({discountCode})</span>
                  <span>- {settings.currency || '৳'} {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: '800',
                color: 'var(--text-primary)',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-light)'
              }}>
                <span>TOTAL</span>
                <span>{settings.currency || '৳'} {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={() => {
                setIsCartOpen(false);
                onCheckoutClick();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '13px' }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="var(--accent-color)" />
              <span>Guaranteed Authentic 9 Vives Quality</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

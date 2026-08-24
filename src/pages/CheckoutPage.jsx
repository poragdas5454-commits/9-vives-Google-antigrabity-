import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Banknote, Smartphone, CreditCard, User, Check } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CheckoutPage = ({ onOrderSuccess, setActivePage, onOpenAuthModal }) => {
  const { settings, placeOrder } = useStoreSettings();
  const { cartItems, subtotal, discountAmount, total, clearCart } = useCart();
  const { customerUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: customerUser?.fullName || '',
    email: customerUser?.email || '',
    phone: customerUser?.phone || '',
    address: customerUser?.address || '',
    city: customerUser?.city || 'Dhaka',
    postalCode: customerUser?.postalCode || '1212',
    notes: '',
    paymentMethod: 'Cash on Delivery'
  });

  useEffect(() => {
    if (customerUser) {
      setFormData(prev => ({
        ...prev,
        fullName: customerUser.fullName || prev.fullName,
        email: customerUser.email || prev.email,
        phone: customerUser.phone || prev.phone,
        address: customerUser.address || prev.address,
        city: customerUser.city || prev.city,
        postalCode: customerUser.postalCode || prev.postalCode
      }));
    }
  }, [customerUser]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Your shopping bag is empty.</h2>
        <p style={{ color: 'var(--text-muted)', margin: '16px 0 24px 0' }}>Add items to your bag before proceeding to checkout.</p>
        <button onClick={() => setActivePage('shop')} className="btn-primary">EXPLORE 9 VIVES SHOP</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerUser) {
      alert("Please register or log in first to complete your purchase.");
      onOpenAuthModal();
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderRecord = placeOrder({
        customerId: customerUser.id,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}`,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        subtotal,
        discountAmount,
        total
      });

      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(orderRecord);
    }, 1200);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-tag badge-accent" style={{ marginBottom: '8px' }}>
            SECURE CHECKOUT
          </span>
          <h1 style={{ fontSize: '32px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            9 VIVES CHECKOUT
          </h1>
        </div>

        {/* Customer Auth Guard Alert */}
        {!customerUser && (
          <div className="glass-card" style={{
            padding: '20px 24px',
            marginBottom: '32px',
            border: '1px solid var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <User size={24} color="var(--accent-color)" />
              <div>
                <strong style={{ color: '#fff', fontSize: '14px' }}>REGISTER OR SIGN IN REQUIRED FOR PURCHASE</strong>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Please register your name, phone, email, and delivery address before completing order.
                </p>
              </div>
            </div>
            <button 
              onClick={onOpenAuthModal}
              className="btn-accent"
              style={{ fontSize: '12px', padding: '10px 20px' }}
            >
              REGISTER / SIGN IN NOW
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px'
        }}>
          {/* Left Column: Shipping & Payment Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Delivery Address */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-color)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>1</span>
                <span>CUSTOMER SHIPPING & REGISTERED DETAILS</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>FULL NAME *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="e.g. Samiur Rahman" className="input-field" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>EMAIL ADDRESS *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="samiur@example.com" className="input-field" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>PHONE NUMBER *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+880 1712-XXXXXX" className="input-field" />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>DELIVERY STREET ADDRESS *</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="House no, Road no, Area" className="input-field" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>CITY *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} className="input-field" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>POSTAL CODE</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="1212" className="input-field" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-color)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>2</span>
                <span>SELECT PAYMENT METHOD</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: formData.paymentMethod === 'Cash on Delivery' ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                  background: formData.paymentMethod === 'Cash on Delivery' ? 'rgba(212, 175, 55, 0.08)' : 'var(--bg-input)',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Cash on Delivery" 
                    checked={formData.paymentMethod === 'Cash on Delivery'} 
                    onChange={handleChange} 
                  />
                  <Banknote size={20} color="var(--accent-color)" />
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block' }}>Cash on Delivery (COD)</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pay with cash upon package arrival nationwide</span>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: formData.paymentMethod === 'bKash / Nagad' ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                  background: formData.paymentMethod === 'bKash / Nagad' ? 'rgba(212, 175, 55, 0.08)' : 'var(--bg-input)',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bKash / Nagad" 
                    checked={formData.paymentMethod === 'bKash / Nagad'} 
                    onChange={handleChange} 
                  />
                  <Smartphone size={20} color="var(--accent-color)" />
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block' }}>bKash / Nagad / Rocket</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Instant mobile banking transaction</span>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className="glass-card" style={{ padding: '28px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                ORDER SUMMARY
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '4px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '600' }}>{item.name}</h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} | Size: {item.selectedSize}
                      </p>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700' }}>
                      {settings.currency || '৳'} {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>{settings.currency || '৳'} {subtotal.toLocaleString()}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Shipping Fee</span>
                  <span>{subtotal >= 3000 ? 'FREE' : `${settings.currency || '৳'} 120`}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-color)' }}>
                    <span>Member Discount</span>
                    <span>- {settings.currency || '৳'} {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <span>TOTAL DUE</span>
                  <span>{settings.currency || '৳'} {(total + (subtotal >= 3000 ? 0 : 120)).toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '14px', marginTop: '24px' }}
              >
                {isSubmitting ? 'PROCESSING 9 VIVES ORDER...' : 'PLACE ORDER NOW'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', marginTop: '16px' }}>
                <ShieldCheck size={14} color="var(--accent-color)" />
                <span>100% Guaranteed Official 9 Vives Purchase</span>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

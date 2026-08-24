import React, { useEffect } from 'react';
import { CheckCircle, Printer, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const OrderConfirmationPage = ({ order, setActivePage }) => {
  const { settings, setSEOTitle } = useStoreSettings();

  useEffect(() => {
    setSEOTitle("Order Receipt", 'default');
    window.scrollTo(0, 0);
  }, [settings]);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>No active order details found.</h2>
        <button onClick={() => setActivePage('shop')} className="btn-primary" style={{ marginTop: '20px' }}>
          RETURN TO 9 VIVES STORE
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Success Header */}
        <div style={{
          textAlign: 'center',
          padding: '40px 24px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.15)',
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <CheckCircle size={36} />
          </div>

          <span className="badge-tag badge-accent" style={{ marginBottom: '8px' }}>
            THANK YOU FOR SHOPPING WITH 9 VIVES
          </span>
          
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '8px 0' }}>
            ORDER CONFIRMED
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Order ID: <strong style={{ color: 'var(--accent-color)' }}>{order.id}</strong> — We have dispatched a confirmation email to <strong>{order.email}</strong>.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', letterSpacing: '0.12em' }}>
                9 VIVES RECEIPT
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Date: {order.date}</span>
            </div>

            <button 
              onClick={handlePrint}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              <Printer size={14} />
              <span>PRINT RECEIPT</span>
            </button>
          </div>

          {/* Customer & Shipping Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px 0', borderBottom: '1px solid var(--border-color)', fontSize: '13px' }}>
            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>CUSTOMER NAME</h4>
              <p style={{ fontWeight: '700' }}>{order.customerName}</p>
              <p style={{ color: 'var(--text-secondary)' }}>{order.phone}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>DELIVERY ADDRESS</h4>
              <p style={{ fontWeight: '600' }}>{order.shippingAddress}</p>
              <p style={{ color: 'var(--text-secondary)' }}>Payment: {order.paymentMethod}</p>
            </div>
          </div>

          {/* Line Items */}
          <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-color)' }}>PURCHASED ITEMS</h4>
            {order.items?.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <div>
                  <strong>{item.name}</strong>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>
                    Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                  </span>
                </div>
                <span style={{ fontWeight: '700' }}>
                  {settings.currency || '৳'} {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>{settings.currency || '৳'} {order.subtotal?.toLocaleString()}</span>
            </div>
            {order.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-color)' }}>
                <span>Discount</span>
                <span>- {settings.currency || '৳'} {order.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
              <span>TOTAL PAID</span>
              <span>{settings.currency || '৳'} {order.total?.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button 
            onClick={() => setActivePage('shop')}
            className="btn-primary"
          >
            <ShoppingBag size={16} />
            <span>CONTINUE SHOPPING AT 9 VIVES</span>
          </button>
          
          <button 
            onClick={() => setActivePage('account')}
            className="btn-secondary"
          >
            <span>VIEW MY ORDERS</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

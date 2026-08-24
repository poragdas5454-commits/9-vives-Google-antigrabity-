import React from 'react';
import { User, Package, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const AccountPage = ({ setActivePage }) => {
  const { settings, orders } = useStoreSettings();

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          paddingBottom: '24px',
          marginBottom: '40px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.15)',
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={28} />
          </div>
          <div>
            <span className="badge-tag badge-accent">9 VIVES MEMBER</span>
            <h1 style={{ fontSize: '24px', textTransform: 'uppercase', marginTop: '4px' }}>
              MY ACCOUNT
            </h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* Order History */}
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Package size={20} color="var(--accent-color)" />
              <span>RECENT ORDERS</span>
            </h3>

            {orders.length === 0 ? (
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>No past order records found.</p>
                <button onClick={() => setActivePage('shop')} className="btn-primary" style={{ marginTop: '16px' }}>
                  SHOP 9 VIVES
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((order) => (
                  <div key={order.id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '14px', color: 'var(--accent-color)' }}>{order.id}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '10px' }}>{order.date}</span>
                      </div>
                      <span className="badge-tag" style={{
                        background: order.status === 'Processing' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        color: order.status === 'Processing' ? '#eab308' : '#22c55e'
                      }}>
                        {order.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <p style={{ color: 'var(--text-secondary)' }}>Delivery to: <strong>{order.customerName}</strong> ({order.shippingAddress})</p>
                      <p style={{ fontWeight: '700' }}>
                        Total: {settings.currency || '৳'} {order.total?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Member Profile Card */}
          <div style={{ height: 'fit-content' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', color: 'var(--accent-color)' }}>
                PROFILE SUMMARY
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>PREFERRED BRAND</span>
                  <strong style={{ color: 'var(--text-primary)' }}>9 Vives</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>DEFAULT CURRENCY</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{settings.currency || '৳'} BDT</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>MEMBER TIER</span>
                  <strong style={{ color: 'var(--accent-color)' }}>VIP Concierge Tier</strong>
                </div>
              </div>

              <button 
                onClick={() => setActivePage('shop')}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '20px', fontSize: '12px', padding: '12px' }}
              >
                EXPLORE NEW DROPS
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

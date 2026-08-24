import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Package, 
  ShoppingBag, 
  Users, 
  Database, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Check, 
  Sparkles, 
  Globe, 
  Share2, 
  Palette,
  Image as ImageIcon,
  Lock,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  MapPin,
  Mail,
  Phone,
  Truck,
  CheckSquare
} from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { 
    settings, 
    updateSettings, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus 
  } = useStoreSettings();

  const { registeredUsers, logoutAdmin, deleteCustomer } = useAuth();

  const [activeTab, setActiveTab] = useState('orders');
  const [toastNotice, setToastNotice] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Branding & Media State
  const [imageForm, setImageForm] = useState({
    logoURL: settings.logoURLs?.primary || '',
    logoPreview: settings.logoURLs?.primary || '',
    heroImageURL: settings.heroImage || '/images/hero_banner.jpg',
    heroPreview: settings.heroImage || '/images/hero_banner.jpg',
    faviconURL: settings.logoURLs?.favicon || ''
  });
  const [brandingSaved, setBrandingSaved] = useState(false);

  // Form local state for Store Settings
  const [settingsForm, setSettingsForm] = useState({
    brandName: settings.brandName || '9 Vives',
    storeName: settings.storeName || '9 Vives',
    tagline: settings.tagline || 'Premium T-Shirts & Modern Fashion',
    heroHeadline: settings.heroHeadline || 'MODERN STYLE. UNCOMPROMISED QUALITY.',
    heroSubtext: settings.heroSubtext || 'Crafted from 240+ GSM heavyweight combed cotton.',
    heroCTA: settings.heroCTA || 'EXPLORE COLLECTION',
    heroImage: settings.heroImage || '/images/hero_banner.jpg',
    supportEmail: settings.supportEmail || 'concierge@9vives.com',
    supportPhone: settings.supportPhone || '+880 1700-9VIVES',
    address: settings.address || 'House 9, Road 9, Banani, Dhaka',
    currency: settings.currency || '৳',
    logoPrimary: settings.logoURLs?.primary || '',
    logoLight: settings.logoURLs?.light || '',
    logoDark: settings.logoURLs?.dark || '',
    logoMobile: settings.logoURLs?.mobile || '',
    favicon: settings.logoURLs?.favicon || '',
    socialFB: settings.socialLinks?.facebook || 'https://facebook.com/9vives',
    socialIG: settings.socialLinks?.instagram || 'https://instagram.com/9vives',
    socialTT: settings.socialLinks?.tiktok || 'https://tiktok.com/@9vives',
    socialYT: settings.socialLinks?.youtube || 'https://youtube.com/@9vives',
    seoTitle: settings.defaultSEO?.title || '9 Vives | Premium T-Shirts & Modern Fashion',
    seoDescription: settings.defaultSEO?.description || '9 Vives premium apparel store.',
    colorBg: settings.brandColors?.primaryBg || '#0a0a0a',
    colorCard: settings.brandColors?.cardBg || '#171717',
    colorText: settings.brandColors?.textColor || '#f5f5f5',
    colorAccent: settings.brandColors?.accentColor || '#d4af37'
  });

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Oversized Tees',
    price: 1450,
    compareAtPrice: 1800,
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Matte Black', 'Off White'],
    images: ['/images/oversized_tee_black.jpg'],
    badge: 'NEW',
    stock: 30
  });

  // Show Toast Helper
  const showToast = (message, type = 'success') => {
    setToastNotice({ message, type });
    setTimeout(() => setToastNotice(null), 3500);
  };

  // Order Action Handlers (Instant & Responsive)
  const handleAcceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'Processing');
    showToast(`✓ Order ${orderId} ACCEPTED & moved to Processing!`, 'success');
  };

  const handleShipOrder = (orderId) => {
    updateOrderStatus(orderId, 'Shipped');
    showToast(`🚚 Order ${orderId} MARKED AS SHIPPED!`, 'info');
  };

  const handleRejectOrder = (orderId) => {
    updateOrderStatus(orderId, 'Deleted');
    showToast(`✕ Order ${orderId} REJECTED & REMOVED!`, 'danger');
  };

  const handleDeleteOrder = (orderId) => {
    updateOrderStatus(orderId, 'Deleted');
    showToast(`🗑️ Order ${orderId} PERMANENTLY DELETED!`, 'danger');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({
      brandName: settingsForm.brandName,
      storeName: settingsForm.storeName,
      tagline: settingsForm.tagline,
      heroHeadline: settingsForm.heroHeadline,
      heroSubtext: settingsForm.heroSubtext,
      heroCTA: settingsForm.heroCTA,
      heroImage: settingsForm.heroImage,
      supportEmail: settingsForm.supportEmail,
      supportPhone: settingsForm.supportPhone,
      address: settingsForm.address,
      currency: settingsForm.currency,
      logoURLs: {
        primary: settingsForm.logoPrimary,
        light: settingsForm.logoLight,
        dark: settingsForm.logoDark,
        mobile: settingsForm.logoMobile,
        favicon: settingsForm.favicon
      },
      socialLinks: {
        facebook: settingsForm.socialFB,
        instagram: settingsForm.socialIG,
        tiktok: settingsForm.socialTT,
        youtube: settingsForm.socialYT
      },
      defaultSEO: {
        title: settingsForm.seoTitle,
        description: settingsForm.seoDescription
      },
      brandColors: {
        primaryBg: settingsForm.colorBg,
        cardBg: settingsForm.colorCard,
        textColor: settingsForm.colorText,
        accentColor: settingsForm.colorAccent
      }
    });

    showToast('✓ 9 Vives Store Settings Saved to Firestore!', 'success');
  };

  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Oversized Tees',
      price: 1450,
      compareAtPrice: 1800,
      description: '240 GSM 100% Combed Heavyweight Cotton Tee.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Matte Black', 'Off White'],
      images: ['/images/oversized_tee_black.jpg'],
      badge: 'NEW',
      stock: 30
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category || 'Oversized Tees',
      price: prod.price,
      compareAtPrice: prod.compareAtPrice || 0,
      description: prod.description || '',
      sizes: prod.sizes || ['S', 'M', 'L', 'XL'],
      colors: prod.colors || ['Matte Black'],
      images: prod.images || ['/images/oversized_tee_black.jpg'],
      badge: prod.badge || '',
      stock: prod.stock || 20
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productForm });
      showToast(`✓ Product "${productForm.name}" updated!`, 'success');
    } else {
      addProduct(productForm);
      showToast(`✓ Product "${productForm.name}" added to 9 Vives catalog!`, 'success');
    }
    setIsProductModalOpen(false);
  };

  // Active Orders (Excluding Deleted)
  const activeOrders = orders.filter(o => o.status !== 'Deleted');
  const totalRevenue = activeOrders.reduce((acc, o) => acc + (o.total || 0), 0);

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 80px 0', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Instant Action Toast Bar */}
        {toastNotice && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 400,
            padding: '14px 24px',
            background: toastNotice.type === 'danger' ? '#ef4444' : toastNotice.type === 'info' ? '#3b82f6' : '#22c55e',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: '700',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }} className="animate-fade-in">
            <CheckSquare size={18} />
            <span>{toastNotice.message}</span>
          </div>
        )}

        {/* Admin Dashboard Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '20px',
          marginBottom: '30px',
          borderBottom: '1px solid var(--border-color)',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px 14px', background: 'var(--accent-color)', color: '#000', borderRadius: 'var(--radius-sm)', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              9V
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                LIVE CONTROL CENTER
              </span>
              <h1 style={{ fontSize: '24px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                9 VIVES ADMIN PORTAL
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={logoutAdmin}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              <LogOut size={14} />
              <span>LOGOUT ADMIN</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '30px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'orders' ? 'var(--text-primary)' : 'var(--bg-card)',
              color: activeTab === 'orders' ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ShoppingBag size={16} />
            <span>ORDER MANAGEMENT ({activeOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'customers' ? 'var(--text-primary)' : 'var(--bg-card)',
              color: activeTab === 'customers' ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={16} />
            <span>CUSTOMERS ({registeredUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'products' ? 'var(--text-primary)' : 'var(--bg-card)',
              color: activeTab === 'products' ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={16} />
            <span>PRODUCTS ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'overview' ? 'var(--text-primary)' : 'var(--bg-card)',
              color: activeTab === 'overview' ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <LayoutDashboard size={16} />
            <span>OVERVIEW</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'settings' ? 'var(--text-primary)' : 'var(--bg-card)',
              color: activeTab === 'settings' ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Settings size={16} />
            <span>STORE SETTINGS</span>
          </button>

          {/* NEW: BRANDING & MEDIA TAB */}
          <button
            onClick={() => setActiveTab('branding')}
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'branding' ? 'var(--accent-color)' : 'var(--bg-card)',
              color: activeTab === 'branding' ? '#000' : 'var(--accent-color)',
              border: '1px solid var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ImageIcon size={16} />
            <span>BRANDING & MEDIA</span>
          </button>
        </div>

        {/* TAB 1: ORDER MANAGEMENT (RESPONSIVE ACCEPT, REJECT, SHIP, DELETE) */}
        {activeTab === 'orders' && (
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: '800', letterSpacing: '0.1em' }}>REALTIME CUSTOMER ORDERS CONTROL</span>
                <h2 style={{ fontSize: '20px', textTransform: 'uppercase' }}>CUSTOMER ORDERS ({activeOrders.length})</h2>
              </div>
            </div>

            {activeOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                <p>No active customer orders found.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeOrders.map((o) => (
                  <div key={o.id} style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    {/* Top Bar */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                      <div>
                        <strong style={{ fontSize: '15px', color: 'var(--accent-color)' }}>{o.id}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '12px' }}>Placed on {o.date}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="badge-tag" style={{
                          background: o.status === 'Processing' ? 'rgba(34, 197, 94, 0.2)' : o.status === 'Shipped' || o.status === 'Delivered' ? 'rgba(212, 175, 55, 0.2)' : o.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                          color: o.status === 'Processing' ? '#22c55e' : o.status === 'Shipped' || o.status === 'Delivered' ? 'var(--accent-color)' : o.status === 'Cancelled' ? '#ef4444' : '#eab308',
                          fontWeight: '800',
                          fontSize: '12px',
                          padding: '6px 14px'
                        }}>
                          STATUS: {o.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info & Purchased Line Items */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', fontSize: '13px' }}>
                      <div>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>CUSTOMER CONTACT & ADDRESS</h4>
                        <strong style={{ color: '#fff', fontSize: '14px' }}>{o.customerName}</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>Phone: {o.phone}</p>
                        <p style={{ color: 'var(--text-secondary)' }}>Email: {o.email}</p>
                        <p style={{ color: 'var(--text-secondary)' }}>Delivery Address: {o.shippingAddress}</p>
                      </div>

                      <div>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>PURCHASED 9 VIVES ITEMS</h4>
                        {o.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span>• {item.name} ({item.selectedSize}, Qty: {item.quantity})</span>
                            <strong>{settings.currency || '৳'} {(item.price * item.quantity).toLocaleString()}</strong>
                          </div>
                        ))}
                        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '6px', marginTop: '6px', fontWeight: '800', fontSize: '14px', color: 'var(--accent-color)' }}>
                          TOTAL: {settings.currency || '৳'} {o.total?.toLocaleString()} ({o.paymentMethod})
                        </div>
                      </div>
                    </div>

                    {/* Instant Admin Control Buttons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                      <button
                        onClick={() => handleAcceptOrder(o.id)}
                        style={{
                          padding: '10px 20px',
                          background: '#22c55e',
                          color: '#000000',
                          fontSize: '12px',
                          fontWeight: '800',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <CheckCircle2 size={16} />
                        <span>ACCEPT & PROCESS</span>
                      </button>

                      <button
                        onClick={() => handleShipOrder(o.id)}
                        style={{
                          padding: '10px 20px',
                          background: 'var(--accent-color)',
                          color: '#000000',
                          fontSize: '12px',
                          fontWeight: '800',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Truck size={16} />
                        <span>MARK SHIPPED</span>
                      </button>

                      <button
                        onClick={() => handleRejectOrder(o.id)}
                        style={{
                          padding: '10px 20px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid #ef4444',
                          color: '#ef4444',
                          fontSize: '12px',
                          fontWeight: '700',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <XCircle size={16} />
                        <span>REJECT / CANCEL</span>
                      </button>

                      <button
                        onClick={() => handleDeleteOrder(o.id)}
                        style={{
                          padding: '10px 20px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: '#ef4444',
                          fontSize: '12px',
                          fontWeight: '700',
                          borderRadius: 'var(--radius-sm)',
                          marginLeft: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                        <span>DELETE ORDER</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REGISTERED CUSTOMERS DATABASE */}
        {activeTab === 'customers' && (
          <div className="glass-card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '20px', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '20px' }}>
              REGISTERED CUSTOMER DATABASE (users/{'{userId}'})
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px' }}>
                    <th style={{ padding: '12px' }}>Customer</th>
                    <th style={{ padding: '12px' }}>Email</th>
                    <th style={{ padding: '12px' }}>Phone</th>
                    <th style={{ padding: '12px' }}>Delivery Address</th>
                    <th style={{ padding: '12px' }}>Registered Date</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No registered customer accounts found.
                      </td>
                    </tr>
                  ) : (
                    registeredUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Avatar with initials */}
                            <div style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, var(--accent-color), #a0791e)',
                              color: '#000',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '900',
                              fontSize: '14px',
                              fontFamily: 'var(--font-heading)',
                              flexShrink: 0
                            }}>
                              {u.fullName?.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
                            </div>
                            <span style={{ fontWeight: '700', color: '#fff' }}>{u.fullName}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--accent-color)' }}>{u.email}</td>
                        <td style={{ padding: '12px' }}>{u.phone}</td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{u.address}, {u.city}</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{u.createdAt}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {/* VIEW BUTTON */}
                            <button
                              onClick={() => setSelectedCustomer(u)}
                              style={{
                                padding: '6px 12px',
                                background: 'rgba(212, 175, 55, 0.15)',
                                border: '1px solid var(--accent-color)',
                                color: 'var(--accent-color)',
                                fontSize: '11px',
                                fontWeight: '700',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Users size={13} />
                              <span>VIEW</span>
                            </button>

                            {/* REMOVE / BAN BUTTON */}
                            <button
                              onClick={() => {
                                deleteCustomer(u.id);
                                showToast(`🗑️ Customer account "${u.fullName}" removed!`, 'danger');
                              }}
                              style={{
                                padding: '6px 12px',
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                fontSize: '11px',
                                fontWeight: '700',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer'
                              }}
                              title="Remove / Ban Customer"
                            >
                              <Trash2 size={13} />
                              <span>REMOVE</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========= CUSTOMER VIEW MODAL ========= */}
        {selectedCustomer && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 400,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedCustomer(null)}
          >
            <div
              onClick={e => e.stopPropagation()}
              className="glass-card animate-fade-in"
              style={{
                width: '100%',
                maxWidth: '460px',
                padding: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
              }}
            >
              {/* Modal Header Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #1a1400 0%, #0a0a0a 100%)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                borderBottom: '1px solid rgba(212,175,55,0.2)',
                position: 'relative'
              }}>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCustomer(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '14px',
                    color: 'var(--text-muted)',
                    fontSize: '20px',
                    fontWeight: '700',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    lineHeight: 1
                  }}
                >✕</button>

                {/* Large Avatar with initials */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-color) 0%, #7a5c00 100%)',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '30px',
                  fontFamily: 'var(--font-heading)',
                  border: '3px solid rgba(212,175,55,0.4)',
                  boxShadow: '0 0 30px rgba(212,175,55,0.2)'
                }}>
                  {selectedCustomer.fullName?.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.18em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>9 VIVES REGISTERED CUSTOMER</span>
                  <h2 style={{ fontSize: '22px', color: '#fff', fontWeight: '800', margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {selectedCustomer.fullName}
                  </h2>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Member since {selectedCustomer.createdAt}</p>
                </div>
              </div>

              {/* Customer Detail Info */}
              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: 'var(--bg-input)', borderRadius: '8px', padding: '14px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '4px' }}>EMAIL</p>
                    <p style={{ fontSize: '13px', color: '#fff', wordBreak: 'break-all' }}>{selectedCustomer.email}</p>
                  </div>

                  <div style={{ background: 'var(--bg-input)', borderRadius: '8px', padding: '14px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '4px' }}>PHONE</p>
                    <p style={{ fontSize: '13px', color: '#fff' }}>{selectedCustomer.phone || 'N/A'}</p>
                  </div>

                  <div style={{ background: 'var(--bg-input)', borderRadius: '8px', padding: '14px', gridColumn: 'span 2' }}>
                    <p style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '4px' }}>DELIVERY ADDRESS</p>
                    <p style={{ fontSize: '13px', color: '#fff' }}>{selectedCustomer.address || 'N/A'}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedCustomer.city} {selectedCustomer.postalCode}</p>
                  </div>

                  <div style={{ background: 'var(--bg-input)', borderRadius: '8px', padding: '14px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '4px' }}>CUSTOMER ID</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{selectedCustomer.id}</p>
                  </div>

                  <div style={{ background: 'var(--bg-input)', borderRadius: '8px', padding: '14px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '4px' }}>CITY & POSTAL</p>
                    <p style={{ fontSize: '13px', color: '#fff' }}>{selectedCustomer.city || 'Dhaka'}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Postal: {selectedCustomer.postalCode || 'N/A'}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '12px', fontSize: '12px' }}
                  >
                    CLOSE
                  </button>

                  <button
                    onClick={() => {
                      deleteCustomer(selectedCustomer.id);
                      showToast(`🗑️ Customer "${selectedCustomer.fullName}" REMOVED!`, 'danger');
                      setSelectedCustomer(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid #ef4444',
                      color: '#ef4444',
                      fontSize: '12px',
                      fontWeight: '700',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={14} />
                    <span>REMOVE / BAN USER</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', textTransform: 'uppercase', color: 'var(--accent-color)' }}>
                PRODUCT CATALOG MANAGEMENT
              </h2>
              <button onClick={handleOpenNewProduct} className="btn-primary">
                <Plus size={16} />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px' }}>
                      <th style={{ padding: '12px' }}>Product</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Price</th>
                      <th style={{ padding: '12px' }}>Stock</th>
                      <th style={{ padding: '12px' }}>Badge</th>
                      <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={p.images?.[0] || '/images/oversized_tee_black.jpg'} alt="" style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div>
                            <strong style={{ display: 'block' }}>{p.name}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--accent-color)' }}>9 Vives ({p.id})</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>{p.category}</td>
                        <td style={{ padding: '12px', fontWeight: '700' }}>{settings.currency || '৳'} {p.price?.toLocaleString()}</td>
                        <td style={{ padding: '12px' }}>{p.stock} pcs</td>
                        <td style={{ padding: '12px' }}>{p.badge && <span className="badge-tag">{p.badge}</span>}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleOpenEditProduct(p)} style={{ color: 'var(--accent-color)' }}><Edit3 size={16} /></button>
                            <button onClick={() => deleteProduct(p.id)} style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>GROSS REVENUE</span>
                <h3 style={{ fontSize: '28px', color: 'var(--accent-color)', margin: '8px 0 0 0' }}>
                  {settings.currency || '৳'} {totalRevenue.toLocaleString()}
                </h3>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>TOTAL ORDERS</span>
                <h3 style={{ fontSize: '28px', color: 'var(--text-primary)', margin: '8px 0 0 0' }}>
                  {activeOrders.length}
                </h3>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>REGISTERED CUSTOMERS</span>
                <h3 style={{ fontSize: '28px', color: 'var(--text-primary)', margin: '8px 0 0 0' }}>
                  {registeredUsers.length} Users
                </h3>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>ACTIVE CATALOG</span>
                <h3 style={{ fontSize: '28px', color: '#fff', margin: '8px 0 0 0' }}>
                  {products.length} Products
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BRANDING & MEDIA */}
        {activeTab === 'branding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Section 1: Logo Management */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>BRAND IDENTITY</span>
                <h2 style={{ fontSize: '20px', textTransform: 'uppercase', margin: '4px 0 0 0' }}>LOGO MANAGEMENT</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Paste an image URL or a hosted logo link. The logo will update across all customer-facing pages.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>

                {/* Logo URL Input & Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>PRIMARY LOGO URL (PNG / SVG / WEBP recommended)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/9vives-logo.png"
                      value={imageForm.logoURL}
                      onChange={e => setImageForm({ ...imageForm, logoURL: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>FAVICON URL (16x16 or 32x32 ICO / PNG)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/favicon.ico"
                      value={imageForm.faviconURL}
                      onChange={e => setImageForm({ ...imageForm, faviconURL: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => {
                        setImageForm(prev => ({ ...prev, logoPreview: prev.logoURL }));
                        showToast('Logo preview updated! Click Save to apply.', 'info');
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '12px', padding: '10px 16px' }}
                    >
                      PREVIEW LOGO
                    </button>

                    <button
                      onClick={() => {
                        updateSettings({
                          logoURLs: {
                            primary: imageForm.logoURL,
                            favicon: imageForm.faviconURL,
                            light: imageForm.logoURL,
                            dark: imageForm.logoURL,
                            mobile: imageForm.logoURL
                          }
                        });
                        setImageForm(prev => ({ ...prev, logoPreview: prev.logoURL }));
                        showToast('✓ 9 Vives Logo SAVED & Applied to Storefront!', 'success');
                      }}
                      className="btn-primary"
                      style={{ fontSize: '12px', padding: '10px 20px' }}
                    >
                      SAVE LOGO
                    </button>
                  </div>
                </div>

                {/* Logo Live Preview Box */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>LIVE LOGO PREVIEW</label>
                  <div style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    {/* Dark background preview */}
                    <div style={{
                      background: '#0a0a0a',
                      borderRadius: '8px',
                      padding: '20px 32px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px'
                    }}>
                      {imageForm.logoPreview ? (
                        <img
                          src={imageForm.logoPreview}
                          alt="Logo Preview"
                          style={{ maxHeight: '60px', maxWidth: '200px', objectFit: 'contain' }}
                          onError={(e) => { e.target.style.display='none'; }}
                        />
                      ) : (
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: '900', letterSpacing: '0.15em', color: 'var(--accent-color)' }}>9 VIVES</span>
                      )}
                    </div>

                    {/* White background preview */}
                    <div style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '20px 32px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px'
                    }}>
                      {imageForm.logoPreview ? (
                        <img
                          src={imageForm.logoPreview}
                          alt="Logo Preview Light"
                          style={{ maxHeight: '60px', maxWidth: '200px', objectFit: 'contain' }}
                          onError={(e) => { e.target.style.display='none'; }}
                        />
                      ) : (
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: '900', letterSpacing: '0.15em', color: '#0a0a0a' }}>9 VIVES</span>
                      )}
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>Dark & Light background preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Hero Banner Image */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>HOMEPAGE VISUAL</span>
                <h2 style={{ fontSize: '20px', textTransform: 'uppercase', margin: '4px 0 0 0' }}>HERO BANNER IMAGE</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Change the full-width hero background shown on your Homepage. Use a high-resolution landscape image (1920×1080 recommended).</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>HERO BANNER IMAGE URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/hero-banner.jpg"
                      value={imageForm.heroImageURL}
                      onChange={e => setImageForm({ ...imageForm, heroImageURL: e.target.value })}
                      className="input-field"
                    />
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>Or use a relative path like /images/hero_banner.jpg if hosted locally</p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => {
                        setImageForm(prev => ({ ...prev, heroPreview: prev.heroImageURL }));
                        showToast('Hero preview updated! Click Save to apply.', 'info');
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '12px', padding: '10px 16px' }}
                    >
                      PREVIEW BANNER
                    </button>

                    <button
                      onClick={() => {
                        updateSettings({ heroImage: imageForm.heroImageURL });
                        setImageForm(prev => ({ ...prev, heroPreview: prev.heroImageURL }));
                        showToast('✓ Hero Banner SAVED & Applied to Homepage!', 'success');
                      }}
                      className="btn-primary"
                      style={{ fontSize: '12px', padding: '10px 20px' }}
                    >
                      SAVE BANNER
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>QUICK LOCAL IMAGE PRESETS</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { label: 'Hero Banner (Default)', path: '/images/hero_banner.jpg' },
                        { label: 'Oversized Tee Black', path: '/images/oversized_tee_black.jpg' },
                        { label: 'Oversized Tee White', path: '/images/oversized_tee_white.jpg' },
                        { label: 'Streetwear Hoodie', path: '/images/streetwear_hoodie.jpg' },
                      ].map(preset => (
                        <button
                          key={preset.path}
                          onClick={() => {
                            setImageForm(prev => ({ ...prev, heroImageURL: preset.path, heroPreview: preset.path }));
                          }}
                          style={{
                            padding: '8px 14px',
                            background: imageForm.heroPreview === preset.path ? 'rgba(212,175,55,0.2)' : 'var(--bg-input)',
                            border: imageForm.heroPreview === preset.path ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                            color: imageForm.heroPreview === preset.path ? 'var(--accent-color)' : 'var(--text-secondary)',
                            fontSize: '12px',
                            fontWeight: '600',
                            borderRadius: '6px',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hero Banner Live Preview */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>LIVE BANNER PREVIEW</label>
                  <div style={{
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    minHeight: '220px',
                    background: '#111'
                  }}>
                    {imageForm.heroPreview && (
                      <img
                        src={imageForm.heroPreview}
                        alt="Hero Preview"
                        style={{
                          width: '100%',
                          height: '220px',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    {/* Overlay badge */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '16px'
                    }}>
                      <div>
                        <span style={{ fontSize: '9px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)' }}>9 VIVES HOMEPAGE HERO</span>
                        <p style={{ fontSize: '16px', fontWeight: '900', color: '#fff', margin: '2px 0 0 0', fontFamily: 'var(--font-heading)' }}>PREVIEW</p>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>This image appears as the full-width hero section on your homepage.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <h2 style={{ fontSize: '20px', textTransform: 'uppercase', color: 'var(--accent-color)' }}>
              CENTRAL STORE CONFIGURATION (settings/store)
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>BRAND NAME (Must be "9 Vives")</label>
                <input type="text" value={settingsForm.brandName} onChange={e => setSettingsForm({...settingsForm, brandName: e.target.value})} className="input-field" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>SUPPORT EMAIL</label>
                <input type="email" value={settingsForm.supportEmail} onChange={e => setSettingsForm({...settingsForm, supportEmail: e.target.value})} className="input-field" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>SUPPORT PHONE</label>
                <input type="text" value={settingsForm.supportPhone} onChange={e => setSettingsForm({...settingsForm, supportPhone: e.target.value})} className="input-field" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>CURRENCY SYMBOL</label>
                <input type="text" value={settingsForm.currency} onChange={e => setSettingsForm({...settingsForm, currency: e.target.value})} className="input-field" />
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary">SAVE 9 VIVES SETTINGS TO FIRESTORE</button>
            </div>
          </form>
        )}

      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--accent-color)' }}>
              {editingProduct ? 'EDIT 9 VIVES PRODUCT' : 'CREATE NEW 9 VIVES PRODUCT'}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>PRODUCT TITLE</label>
                <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="input-field" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>CATEGORY</label>
                  <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="input-field">
                    <option value="Oversized Tees">Oversized Tees</option>
                    <option value="Graphic Tees">Graphic Tees</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Basics">Basics</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>BADGE TAG</label>
                  <input type="text" value={productForm.badge} onChange={e => setProductForm({...productForm, badge: e.target.value})} placeholder="NEW / BESTSELLER" className="input-field" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>PRICE (৳)</label>
                  <input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="input-field" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>COMPARE AT PRICE (৳)</label>
                  <input type="number" value={productForm.compareAtPrice} onChange={e => setProductForm({...productForm, compareAtPrice: Number(e.target.value)})} className="input-field" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>DESCRIPTION</label>
                <textarea rows={3} value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="input-field" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>PRIMARY IMAGE PATH / URL</label>
                <input type="text" value={productForm.images[0] || ''} onChange={e => setProductForm({...productForm, images: [e.target.value]})} className="input-field" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="btn-secondary">
                  CANCEL
                </button>
                <button type="submit" className="btn-primary">
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

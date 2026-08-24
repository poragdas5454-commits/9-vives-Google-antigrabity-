import React, { useState, useEffect } from 'react';
import { StoreSettingsProvider, useStoreSettings } from './context/StoreSettingsContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { Search, X, Shield } from 'lucide-react';

const MainAppContent = () => {
  const { products, settings } = useStoreSettings();
  const { isAdminAuthenticated } = useAuth();
  
  // Detect if current path or hash is admin (/admin or #admin)
  const getInitialPage = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('admin') || hash.includes('admin')) {
      return 'admin';
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [pageParams, setPageParams] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Listen to hash / URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) {
        setActivePage('admin');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (page, params = {}) => {
    setActivePage(page);
    setPageParams(params);
    if (page === 'admin') {
      window.location.hash = 'admin';
    } else if (window.location.hash.includes('admin')) {
      window.location.hash = '';
    }
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    navigateTo('product');
  };

  const handleOrderSuccess = (order) => {
    setLastPlacedOrder(order);
    navigateTo('confirmation');
  };

  const searchResults = searchQuery.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // IF ADMIN ROUTE ACTIVE (/admin or #admin)
  if (activePage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLoginPage 
          onLoginSuccess={() => setActivePage('admin')}
          onReturnToStore={() => navigateTo('home')}
        />
      );
    }

    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        {/* Top Mini Switcher to return to customer store */}
        <div style={{
          background: '#000000',
          color: 'var(--accent-color)',
          padding: '8px 24px',
          fontSize: '11px',
          fontWeight: '700',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <span>9 VIVES SAAS CONTROL CENTER — SECURED ADMIN SESSION</span>
          <button 
            onClick={() => navigateTo('home')}
            style={{ color: '#fff', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back to Customer Storefront
          </button>
        </div>

        {/* Full SaaS Admin Dashboard UI */}
        <AdminDashboard />
      </div>
    );
  }

  // STOREFRONT UI FOR CUSTOMERS
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Mini Admin Switch Bar for easy access */}
      <div style={{
        background: '#0a0a0a',
        borderBottom: '1px solid var(--border-light)',
        padding: '4px 24px',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        color: 'var(--text-muted)'
      }}>
        <button 
          onClick={() => navigateTo('admin')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-color)', fontWeight: '700' }}
        >
          <Shield size={11} />
          <span>ADMIN LOGIN / PORTAL (#admin)</span>
        </button>
      </div>

      <Header 
        activePage={activePage} 
        setActivePage={navigateTo} 
        onSearchClick={() => setIsSearchOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage 
            setActivePage={navigateTo} 
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage 
            initialCategory={pageParams.category || 'All'}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activePage === 'product' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage 
            onOrderSuccess={handleOrderSuccess}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'confirmation' && (
          <OrderConfirmationPage 
            order={lastPlacedOrder}
            setActivePage={navigateTo}
          />
        )}

        {activePage === 'account' && (
          <AccountPage setActivePage={navigateTo} />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={navigateTo} />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      <Footer setActivePage={navigateTo} />

      {/* Global Cart Side Drawer */}
      <CartDrawer onCheckoutClick={() => navigateTo('checkout')} />

      {/* Customer Register / Login Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

      {/* Global Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)}
          onFullDetails={(p) => handleSelectProduct(p)}
        />
      )}

      {/* Full-screen Search Overlay */}
      {isSearchOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '60px 24px'
        }}>
          <button 
            onClick={() => setIsSearchOpen(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', color: '#fff' }}
          >
            <X size={28} />
          </button>

          <div style={{ width: '100%', maxWidth: '640px', marginTop: '40px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase', display: 'block', textAlign: 'center', marginBottom: '12px' }}>
              SEARCH 9 VIVES CATALOG
            </span>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                autoFocus
                placeholder="Type to search oversized tees, hoodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '2px solid var(--accent-color)',
                  color: '#fff',
                  fontSize: '24px',
                  padding: '12px 40px 12px 0',
                  outline: 'none',
                  fontFamily: 'var(--font-heading)'
                }}
              />
              <Search size={24} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-color)' }} />
            </div>

            {/* Results Grid */}
            <div style={{ marginTop: '40px', maxHeight: '50vh', overflowY: 'auto' }}>
              {searchResults.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    handleSelectProduct(prod);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card)',
                    marginBottom: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <img src={prod.images?.[0] || '/images/oversized_tee_black.jpg'} alt="" style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--accent-color)', fontWeight: '800' }}>9 VIVES</span>
                    <h4 style={{ fontSize: '14px', color: '#fff' }}>{prod.name}</h4>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                      {settings.currency || '৳'} {prod.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreSettingsProvider>
        <CartProvider>
          <MainAppContent />
        </CartProvider>
      </StoreSettingsProvider>
    </AuthProvider>
  );
}

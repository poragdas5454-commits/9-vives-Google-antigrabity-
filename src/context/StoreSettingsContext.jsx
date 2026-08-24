import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEFAULT_STORE_SETTINGS, 
  INITIAL_PRODUCTS, 
  syncStoreSettingsToFirestore, 
  syncOrderToFirestore, 
  syncProductToFirestore 
} from '../services/firebase';

const StoreSettingsContext = createContext();

export const StoreSettingsProvider = ({ children }) => {
  // Load initial store settings from localStorage or fallback to defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('9vives_store_settings');
    if (saved) {
      try {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Error parsing saved store settings", e);
      }
    }
    return DEFAULT_STORE_SETTINGS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('9vives_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved products", e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('9vives_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved orders", e);
      }
    }
    return [
      {
        id: "9V-ORD-8821",
        date: "2026-08-23",
        customerName: "Samiur Rahman",
        email: "samiur@example.com",
        phone: "+880 1712-345678",
        shippingAddress: "House 12, Road 4, Gulshan 1, Dhaka",
        items: [
          { id: "9v-001", name: "9 Vives Signature Heavyweight Oversized Tee", price: 1450, quantity: 2, size: "L", color: "Matte Black" }
        ],
        subtotal: 2900,
        discountAmount: 0,
        total: 2900,
        paymentMethod: "Cash on Delivery",
        status: "Processing"
      }
    ];
  });

  // Save settings to LocalStorage whenever updated & sync to Firestore
  useEffect(() => {
    localStorage.setItem('9vives_store_settings', JSON.stringify(settings));
    
    // Dynamically set CSS variables if custom brand colors set
    if (settings.brandColors) {
      document.documentElement.style.setProperty('--bg-primary', settings.brandColors.primaryBg || '#0a0a0a');
      document.documentElement.style.setProperty('--bg-card', settings.brandColors.cardBg || '#171717');
      document.documentElement.style.setProperty('--text-primary', settings.brandColors.textColor || '#f5f5f5');
      document.documentElement.style.setProperty('--accent-color', settings.brandColors.accentColor || '#d4af37');
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('9vives_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('9vives_orders', JSON.stringify(orders));
  }, [orders]);

  // Helper method to set dynamic SEO document title
  const setSEOTitle = (pageTitle = null, pageType = 'default') => {
    const brand = settings.brandName || "9 Vives";
    
    if (!pageTitle || pageType === 'home') {
      document.title = settings.defaultSEO?.title || `${brand} | Premium T-Shirts & Modern Fashion`;
      return;
    }

    if (pageType === 'product') {
      document.title = `${pageTitle} | ${brand}`;
      return;
    }

    if (pageType === 'category') {
      document.title = `${pageTitle} | ${brand}`;
      return;
    }

    document.title = `${pageTitle} | ${brand}`;
  };

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    syncStoreSettingsToFirestore(updated);
  };

  const addProduct = (product) => {
    const newProd = {
      ...product,
      id: `9v-${Date.now().toString().slice(-4)}`,
      brand: settings.brandName || "9 Vives"
    };
    setProducts((prev) => [newProd, ...prev]);
    syncProductToFirestore(newProd);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    syncProductToFirestore(updatedProduct);
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter(p => p.id !== productId));
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `9V-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: "Pending"
    };
    setOrders((prev) => [newOrder, ...prev]);
    syncOrderToFirestore(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, status: newStatus };
        syncOrderToFirestore(updated);
        return updated;
      }
      return o;
    }));
  };

  return (
    <StoreSettingsContext.Provider value={{
      settings,
      updateSettings,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      placeOrder,
      updateOrderStatus,
      setSEOTitle
    }}>
      {children}
    </StoreSettingsContext.Provider>
  );
};

export const useStoreSettings = () => {
  const context = useContext(StoreSettingsContext);
  if (!context) {
    throw new Error('useStoreSettings must be used within a StoreSettingsProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check, Star, Ruler } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage = ({ product, onSelectProduct, onQuickView, setActivePage }) => {
  const { settings, products, setSEOTitle } = useStoreSettings();
  const { addToCart } = useCart();

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = product.colors || ['Matte Black', 'Off White'];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (product) {
      setSEOTitle(product.name, 'product');
      window.scrollTo(0, 0);
    }
  }, [product, settings]);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/oversized_tee_black.jpg'];

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '32px' }}>
          <button onClick={() => setActivePage('home')} style={{ color: 'inherit' }}>Home</button>
          <span>/</span>
          <button onClick={() => setActivePage('shop')} style={{ color: 'inherit' }}>Shop</button>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{product.name}</span>
        </div>

        {/* Product Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '50px',
          marginBottom: '80px'
        }}>

          {/* Left Column: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              width: '100%',
              paddingTop: '125%',
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: '#121212',
              border: '1px solid var(--border-color)'
            }}>
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    style={{
                      width: '80px',
                      height: '100px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImageIndex === index ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                      padding: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Purchasing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                  {settings.brandName || "9 Vives"}
                </span>
                {product.badge && <span className="badge-tag">{product.badge}</span>}
              </div>

              <h1 style={{ fontSize: '32px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '12px' }}>
                {product.name}
              </h1>

              {/* Price display with currency */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {settings.currency || '৳'} {product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span style={{ fontSize: '18px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {settings.currency || '৳'} {product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              {product.description}
            </p>

            {/* Specifications Card */}
            <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Fabric Composition:</span>
                <strong>240 GSM 100% Combed Heavyweight Cotton</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Fit Profile:</span>
                <strong>Relaxed Luxury Oversized Silhouette</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Branding:</span>
                <strong>Tonal High-Density 9 Vives Silicone Emblem</strong>
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                COLOR: <span style={{ color: 'var(--text-muted)' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: '700',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedColor === color ? 'var(--text-primary)' : 'var(--bg-input)',
                      color: selectedColor === color ? 'var(--bg-primary)' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Link */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  SELECT SIZE:
                </label>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent-color)', fontWeight: '600' }}
                >
                  <Ruler size={14} />
                  <span>Size Chart</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontWeight: '800',
                      background: selectedSize === size ? 'var(--accent-color)' : 'var(--bg-input)',
                      color: selectedSize === size ? '#000' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {showSizeGuide && (
                <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  <h4 style={{ textTransform: 'uppercase', marginBottom: '8px' }}>9 VIVES OVERSIZED FIT CHART (INCHES)</h4>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--accent-color)' }}>
                        <th style={{ padding: '6px' }}>Size</th>
                        <th style={{ padding: '6px' }}>Chest</th>
                        <th style={{ padding: '6px' }}>Length</th>
                        <th style={{ padding: '6px' }}>Sleeve</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ padding: '6px' }}>S</td><td>42"</td><td>27.5"</td><td>9.0"</td></tr>
                      <tr><td style={{ padding: '6px' }}>M</td><td>44"</td><td>28.5"</td><td>9.5"</td></tr>
                      <tr><td style={{ padding: '6px' }}>L</td><td>46"</td><td>29.5"</td><td>10.0"</td></tr>
                      <tr><td style={{ padding: '6px' }}>XL</td><td>48"</td><td>30.5"</td><td>10.5"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)'
              }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '14px 18px', fontSize: '16px', fontWeight: '700' }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontSize: '15px', fontWeight: '800' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '14px 18px', fontSize: '16px', fontWeight: '700' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, padding: '16px', fontSize: '14px' }}
              >
                {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                <span>{added ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
              </button>
            </div>

            {/* Guarantee Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--accent-color)" />
                <span>Express Delivery Nationwide</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--accent-color)" />
                <span>Original 9 Vives Authenticity</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
            <h3 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '32px' }}>
              COMPLETE THE 9 VIVES LOOK
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '30px' }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} onQuickView={onQuickView} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

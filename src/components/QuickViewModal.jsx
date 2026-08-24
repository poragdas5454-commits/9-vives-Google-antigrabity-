import React, { useState } from 'react';
import { X, ShoppingBag, Check, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export const QuickViewModal = ({ product, onClose, onFullDetails }) => {
  const { settings } = useStoreSettings();
  const { addToCart } = useCart();

  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = product.colors || ['Matte Black', 'Off White'];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['/images/oversized_tee_black.jpg'];

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div 
        onClick={onClose}
        style={{ position: 'absolute', inset: 0 }}
      />

      <div className="animate-fade-in glass-card" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '860px',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        padding: '32px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'var(--text-primary)',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            padding: '6px'
          }}
        >
          <X size={18} />
        </button>

        {/* Product Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <img 
            src={images[activeImageIndex]} 
            alt={product.name} 
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: 'var(--radius-sm)',
              background: '#121212'
            }}
          />

          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt=""
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '60px',
                    height: '75px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    border: activeImageIndex === idx ? '2px solid var(--accent-color)' : '1px solid var(--border-color)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
              {settings.brandName || "9 Vives"}
            </span>

            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '6px 0 12px 0', color: 'var(--text-primary)' }}>
              {product.name}
            </h2>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {settings.currency || '৳'} {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '16px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  {settings.currency || '৳'} {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Color Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                COLOR: <span style={{ color: 'var(--text-muted)' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedColor === c ? 'var(--text-primary)' : 'var(--bg-input)',
                      color: selectedColor === c ? 'var(--bg-primary)' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                SELECT SIZE:
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '700',
                      background: selectedSize === s ? 'var(--accent-color)' : 'var(--bg-input)',
                      color: selectedSize === s ? '#000' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleAdd}
              className="btn-primary"
              style={{ width: '100%', padding: '16px' }}
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
              <span>{added ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onFullDetails(product);
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '12px', fontSize: '12px' }}
            >
              VIEW FULL DETAILS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

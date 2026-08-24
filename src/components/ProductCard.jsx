import React, { useState } from 'react';
import { Eye, ShoppingBag, Heart } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onSelectProduct, onQuickView }) => {
  const { settings } = useStoreSettings();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const defaultSize = product.sizes?.[0] || 'M';
  const defaultColor = product.colors?.[0] || 'Default';
  const mainImage = product.images?.[0] || '/images/oversized_tee_black.jpg';
  const hoverImage = product.images?.[1] || mainImage;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'var(--transition-normal)',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}
    >
      {/* Image Container with Badge & Quick Actions */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '125%', // 4:5 Aspect ratio standard for luxury apparel
        overflow: 'hidden',
        background: '#121212'
      }}>
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
            <span className="badge-tag badge-accent">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 2,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: liked ? '#ef4444' : '#ffffff',
            transition: 'var(--transition-fast)'
          }}
        >
          <Heart size={16} fill={liked ? '#ef4444' : 'none'} />
        </button>

        {/* Quick Action Overlay (Reveals on Hover) */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          zIndex: 3,
          display: 'flex',
          gap: '8px',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'var(--transition-fast)'
        }}>
          <button
            onClick={handleQuickAdd}
            className="btn-primary"
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '11px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ShoppingBag size={14} />
            <span>ADD TO BAG</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            style={{
              padding: '10px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Details Section strictly formatted per requirements */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        
        {/* Brand Name: 9 Vives */}
        <span style={{
          fontSize: '11px',
          fontWeight: '800',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-color)'
        }}>
          {settings.brandName || "9 Vives"}
        </span>

        {/* Product Title */}
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.name}
        </h3>

        {/* Price display with currency: ৳ Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: '700',
            color: 'var(--text-primary)'
          }}>
            {settings.currency || '৳'} {product.price.toLocaleString()}
          </span>

          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              textDecoration: 'line-through'
            }}>
              {settings.currency || '৳'} {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

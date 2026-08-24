import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage = ({ initialCategory = 'All', onSelectProduct, onQuickView }) => {
  const { settings, products, setSEOTitle } = useStoreSettings();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(5000);

  const categories = ['All', 'Oversized Tees', 'Graphic Tees', 'Outerwear', 'Basics'];

  useEffect(() => {
    const title = selectedCategory === 'All' ? 'Shop All Collections' : selectedCategory;
    setSEOTitle(title, 'category');
  }, [selectedCategory, settings]);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // default newest
  });

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Shop Page Banner */}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '40px'
        }}>
          <span className="badge-tag badge-accent" style={{ marginBottom: '12px' }}>
            {settings.brandName || "9 Vives"} CATALOG
          </span>
          <h1 style={{ fontSize: '36px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            {selectedCategory === 'All' ? 'ALL 9 VIVES COLLECTIONS' : selectedCategory.toUpperCase()}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Explore our high-density 240+ GSM heavyweight t-shirts, graphic streetwear, and luxury fleece outer layers.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '20px',
                  background: selectedCategory === cat ? 'var(--text-primary)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? 'var(--bg-primary)' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                placeholder="Search 9 Vives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ fontSize: '12px', padding: '8px 14px 8px 34px' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={14} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '8px 12px',
                  fontSize: '12px',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none'
                }}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div style={{ marginBottom: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredProducts.length}</strong> items in <strong>9 Vives</strong>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              No products found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '30px'
          }}>
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

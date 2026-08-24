import React, { useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Flame, Layers } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { ProductCard } from '../components/ProductCard';

export const HomePage = ({ setActivePage, onSelectProduct, onQuickView }) => {
  const { settings, products, setSEOTitle } = useStoreSettings();

  useEffect(() => {
    setSEOTitle(null, 'home');
  }, [settings]);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="animate-fade-in">

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(to right, rgba(10, 10, 10, 0.95) 30%, rgba(10, 10, 10, 0.5) 70%), url("${settings.heroImage || '/images/hero_banner.jpg'}") center/cover no-repeat`,
        borderBottom: '1px solid var(--border-color)',
        padding: '60px 0'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Pill Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-tag badge-accent">
                {settings.brandName || "9 Vives"} — COLLECTION 2026
              </span>
            </div>

            {/* Editable Hero Headline */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: '1.05',
              color: '#ffffff'
            }}>
              {settings.heroHeadline || "MODERN STYLE. UNCOMPROMISED QUALITY."}
            </h1>

            {/* Editable Hero Subtext */}
            <p style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              {settings.heroSubtext || "Crafted from 240+ GSM heavyweight combed cotton. Engineered for everyday confidence and contemporary street fashion."}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
              <button 
                onClick={() => setActivePage('shop')}
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '14px' }}
              >
                <span>{settings.heroCTA || "EXPLORE COLLECTION"}</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => setActivePage('about')}
                className="btn-secondary"
                style={{ padding: '16px 32px', fontSize: '14px' }}
              >
                THE 9 VIVES STORY
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Values Strip */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '30px 0'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Layers size={26} color="var(--accent-color)" />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                240+ GSM COTTON
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Heavyweight luxury drape fabric</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Flame size={26} color="var(--accent-color)" />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                CRAFTED FIT
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Precision tailored oversized silhouette</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ShieldCheck size={26} color="var(--accent-color)" />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PRE-SHRUNK
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Zero shrinkage after repeated washing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px'
          }}>
            <div>
              <span className="badge-tag badge-accent" style={{ marginBottom: '10px' }}>
                CURATED SELECTION
              </span>
              <h2 style={{ fontSize: '32px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                FEATURED 9 VIVES PIECES
              </h2>
            </div>

            <button 
              onClick={() => setActivePage('shop')}
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '12px' }}
            >
              VIEW ALL PRODUCTS
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '30px'
          }}>
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Editorial Banner Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.2em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                THE 9 VIVES MANIFESTO
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', textTransform: 'uppercase', lineHeight: '1.15' }}>
                REDEFINING EVERYDAY STREETWEAR LUXURY
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Every 9 Vives t-shirt is designed with intentionality. We reject thin, fast-fashion materials in favor of custom-milled heavyweight combed cotton that holds its structure and feels substantial on the body.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--accent-color)" />
                  <span>High-density tonal 9 Vives silicone signature logo</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--accent-color)" />
                  <span>Ribbed double-stitch collar that retains shape</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--accent-color)" />
                  <span>Designed in Banani, Dhaka for global streetwear enthusiasts</span>
                </div>
              </div>
              <div>
                <button 
                  onClick={() => setActivePage('shop')}
                  className="btn-primary"
                  style={{ marginTop: '10px' }}
                >
                  SHOP NEW ARRIVALS
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <img 
                src="/images/oversized_tee_black.jpg" 
                alt="9 Vives Quality" 
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)'
                }}
              />
              <div className="glass-card" style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: '800', color: 'var(--accent-color)' }}>
                  9
                </span>
                <div>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>VIVES CERTIFIED</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Premium Heavyweight Fabric</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge-tag badge-accent" style={{ marginBottom: '10px' }}>
              JUST RELEASED
            </span>
            <h2 style={{ fontSize: '32px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              NEW ARRIVALS BY 9 VIVES
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '30px'
          }}>
            {newArrivals.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

import '../Pages.css';
import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    icon: '⚡',
    tag: 'STARTER',
    name: 'Nexus Core',
    desc: 'The essential React starter with routing, state management, and a polished design system. Perfect for your next project.',
    price: '$0',
    badge: 'FREE',
    badgeColor: 'var(--accent-3)',
    features: ['React Router v6', 'Global state', 'Design tokens', 'Mobile-first'],
  },
  {
    id: 2,
    icon: '🚀',
    tag: 'POPULAR',
    name: 'Nexus Pro',
    desc: 'Everything in Core, plus auth flows, dashboard templates, dark mode, and priority support from the team.',
    price: '$49',
    badge: 'BEST VALUE',
    badgeColor: 'var(--accent)',
    features: ['Auth flows', 'Dashboard UI', 'Dark mode', 'Priority support'],
  },
  {
    id: 3,
    icon: '🎨',
    tag: 'DESIGN',
    name: 'Nexus UI Kit',
    desc: 'A Figma component library with 200+ production-ready components that match the Nexus design system exactly.',
    price: '$29',
    badge: 'NEW',
    badgeColor: 'var(--accent-2)',
    features: ['200+ components', 'Figma source', 'Auto layout', 'Dark & light'],
  },
  {
    id: 4,
    icon: '🔒',
    tag: 'ENTERPRISE',
    name: 'Nexus Enterprise',
    desc: 'Full source access, custom integrations, dedicated onboarding, and SLA-backed support for your whole team.',
    price: '$199',
    badge: 'FULL ACCESS',
    badgeColor: '#7c3aed',
    features: ['Full source', 'Custom integrations', 'SLA support', 'Team licences'],
  },
];

export default function Products({ addToCart, cart }) {
  const [added, setAdded] = useState({});

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(p => ({ ...p, [product.id]: true }));
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500);
  };

  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0;

  return (
    <div className="page">
      <section className="products-header">
        <p className="section-eyebrow">SHOP</p>
        <h1 className="section-title">Pick your<br /><em style={{fontStyle:'italic',color:'var(--accent)'}}>plan.</em></h1>
        <p className="section-sub">Everything is a one-time purchase. No subscriptions. No surprises.</p>
      </section>

      {cart.length > 0 && (
        <div className="cart-summary">
          <span className="cart-sum-icon">🛒</span>
          <span className="cart-sum-text">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
            {' · '}
            {cart.map(i => `${i.name} ×${i.qty}`).join(', ')}
          </span>
        </div>
      )}

      <div className="products-grid">
        {PRODUCTS.map((p, i) => (
          <div className="product-card" key={p.id} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="product-top">
              <span className="product-tag">{p.tag}</span>
              <span className="product-badge" style={{ background: p.badgeColor }}>{p.badge}</span>
            </div>

            <div className="product-icon">{p.icon}</div>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-desc">{p.desc}</p>

            <ul className="product-features">
              {p.features.map(f => (
                <li key={f}><span className="feat-check">✓</span>{f}</li>
              ))}
            </ul>

            <div className="product-footer">
              <span className="product-price">{p.price}</span>
              <button
                className={`btn btn-add ${added[p.id] ? 'added' : ''}`}
                onClick={() => handleAdd(p)}
              >
                {added[p.id]
                  ? '✓ Added!'
                  : getQty(p.id) > 0
                  ? `In cart (${getQty(p.id)})`
                  : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
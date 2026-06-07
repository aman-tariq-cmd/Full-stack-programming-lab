import '../Pages.css';
import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '⚡', title: 'Lightning Fast',  desc: 'Optimised React components with lazy loading and code splitting.' },
  { icon: '🎨', title: 'Beautiful UI',    desc: 'Handcrafted design system with consistent tokens and animations.' },
  { icon: '📦', title: 'Ready to Ship',   desc: 'Production-grade routing, forms, and state management included.' },
  { icon: '🔒', title: 'Secure by Default', desc: 'Best practices baked in — no surprises when you go live.' },
];

const stats = [
  { value: '4',    label: 'Pages'      },
  { value: '100%', label: 'Responsive' },
  { value: 'v6',   label: 'React Router'},
  { value: '0',    label: 'Dependencies beyond RR' },
];

export default function Home() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="home-hero">
        <p className="section-eyebrow">WELCOME TO NEXUS</p>
        <h1 className="section-title">
          The modern<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>React starter</em><br />
          you needed.
        </h1>
        <p className="section-sub">
          A fully-routed, production-ready React app with beautiful design,
          smooth transitions, and all the pages you need to get started fast.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-accent">View Products →</Link>
          <Link to="/about"    className="btn btn-outline">Learn More</Link>
        </div>

        {/* Stats row */}
        <div className="stats-row">
          {stats.map(s => (
            <div className="stat-item" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="home-divider" />

      {/* Features */}
      <section className="home-features">
        <p className="section-eyebrow">WHAT'S INSIDE</p>
        <h2 className="home-features-title">Everything you need.</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={f.title} style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to explore?</h2>
          <p className="cta-sub">Browse our products or get in touch — we're here to help.</p>
          <div className="hero-actions">
            <Link to="/contact"  className="btn btn-primary">Contact Us</Link>
            <Link to="/products" className="btn btn-outline">Shop Now →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
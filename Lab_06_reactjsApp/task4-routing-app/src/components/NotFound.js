import '../Pages.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page notfound-page">
      <div className="nf-inner">
        <div className="nf-code">404</div>
        <div className="nf-divider" />
        <p className="section-eyebrow">PAGE NOT FOUND</p>
        <h1 className="nf-title">Lost in the void.</h1>
        <p className="nf-desc">
          The page you're looking for doesn't exist, was moved,
          or is still being built.
        </p>
        <div className="nf-actions">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>← Go Back</button>
          <Link to="/" className="btn btn-outline">Home</Link>
        </div>
        <div className="nf-links">
          <span>Or try one of these:</span>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}
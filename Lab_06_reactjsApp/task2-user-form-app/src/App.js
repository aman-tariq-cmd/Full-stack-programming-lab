import React, { useState } from 'react';
import './App.css';

function UserForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(prev => [{ ...form, id: Date.now() }, ...prev]);
    setForm({ name: '', email: '' });
    setErrors({});
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const removeEntry = (id) => {
    setSubmitted(prev => prev.filter(e => e.id !== id));
  };

  const isPreviewActive = form.name || form.email;

  return (
    <div className="app-wrapper">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <div className="page-layout">
        {/* Form card */}
        <div className="form-card">
          <div className="card-eyebrow">USER REGISTRATION</div>
          <h1 className="card-title">Tell us about<br />yourself.</h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name field */}
            <div className={`field ${focused === 'name' ? 'focused' : ''} ${errors.name ? 'has-error' : ''} ${form.name ? 'has-value' : ''}`}>
              <label className="field-label" htmlFor="name">Full Name</label>
              <div className="input-wrap">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Ada Lovelace"
                  autoComplete="off"
                />
                <span className="input-bar" />
              </div>
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Email field */}
            <div className={`field ${focused === 'email' ? 'focused' : ''} ${errors.email ? 'has-error' : ''} ${form.email ? 'has-value' : ''}`}>
              <label className="field-label" htmlFor="email">Email Address</label>
              <div className="input-wrap">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. ada@babbage.io"
                  autoComplete="off"
                />
                <span className="input-bar" />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Real-time preview */}
            <div className={`preview-strip ${isPreviewActive ? 'visible' : ''}`}>
              <span className="preview-label">PREVIEW</span>
              <span className="preview-name">{form.name || '—'}</span>
              <span className="preview-sep">·</span>
              <span className="preview-email">{form.email || '—'}</span>
            </div>

            <button type="submit" className="submit-btn">
              <span className="submit-text">Submit</span>
              <span className="submit-arrow">→</span>
            </button>
          </form>

          {/* Success toast */}
          <div className={`success-toast ${showSuccess ? 'show' : ''}`}>
            <span className="toast-icon">✓</span>
            <span>Entry saved successfully!</span>
          </div>
        </div>

        {/* Submitted entries panel */}
        <div className={`entries-panel ${submitted.length > 0 ? 'has-entries' : ''}`}>
          <div className="entries-header">
            <span className="entries-title">Submitted Entries</span>
            <span className="entries-count">{submitted.length}</span>
          </div>

          {submitted.length === 0 ? (
            <div className="entries-empty">
              <div className="empty-icon">◎</div>
              <p>No entries yet.<br />Submit the form to see results here.</p>
            </div>
          ) : (
            <ul className="entries-list">
              {submitted.map((entry, i) => (
                <li key={entry.id} className="entry-item" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="entry-avatar">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="entry-info">
                    <span className="entry-name">{entry.name}</span>
                    <span className="entry-email">{entry.email}</span>
                  </div>
                  <button className="entry-remove" onClick={() => removeEntry(entry.id)} title="Remove">×</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserForm;
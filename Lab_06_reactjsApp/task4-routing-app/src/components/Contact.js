import '../Pages.css';
import React, { useState } from 'react';

const INFO = [
  { icon: '📍', label: 'Address',  value: '12 Bauhaus Str, Berlin, Germany' },
  { icon: '✉️', label: 'Email',    value: 'hello@nexus.dev' },
  { icon: '📞', label: 'Phone',    value: '+49 30 1234 5678' },
  { icon: '🕐', label: 'Hours',    value: 'Mon–Fri 9:00 – 18:00 CET' },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Your name is required';
    if (!form.email.trim())   e.email   = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'A subject helps us route your message';
    if (!form.message.trim()) e.message = 'Please write a message';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  const fields = [
    { id: 'name',    label: 'Full Name',      type: 'text',  placeholder: 'Ada Lovelace',          half: true  },
    { id: 'email',   label: 'Email Address',  type: 'email', placeholder: 'ada@babbage.io',         half: true  },
    { id: 'subject', label: 'Subject',        type: 'text',  placeholder: 'What is this about?',    half: false },
  ];

  return (
    <div className="page">
      <section className="contact-header">
        <p className="section-eyebrow">GET IN TOUCH</p>
        <h1 className="section-title">We'd love<br /><em style={{fontStyle:'italic',color:'var(--accent)'}}>to hear</em> from you.</h1>
        <p className="section-sub">Fill in the form and we'll get back to you within one business day.</p>
      </section>

      <div className="contact-layout">
        {/* Form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="contact-success">
              <span className="success-icon">✓</span>
              <h2>Message sent!</h2>
              <p>Thanks, <strong>{form.name.split(' ')[0]}</strong>. We'll reply to <strong>{form.email}</strong> soon.</p>
              <button className="btn btn-outline" onClick={reset}>Send another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                {fields.filter(f => f.half).map(f => (
                  <div className={`form-field ${focused===f.id?'focused':''} ${errors[f.id]?'has-err':''}`} key={f.id}>
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id} name={f.id} type={f.type}
                      value={form[f.id]}
                      placeholder={f.placeholder}
                      onChange={handle}
                      onFocus={() => setFocused(f.id)}
                      onBlur={() => setFocused(null)}
                    />
                    {errors[f.id] && <span className="form-err">{errors[f.id]}</span>}
                  </div>
                ))}
              </div>

              {fields.filter(f => !f.half).map(f => (
                <div className={`form-field ${focused===f.id?'focused':''} ${errors[f.id]?'has-err':''}`} key={f.id}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type}
                    value={form[f.id]}
                    placeholder={f.placeholder}
                    onChange={handle}
                    onFocus={() => setFocused(f.id)}
                    onBlur={() => setFocused(null)}
                  />
                  {errors[f.id] && <span className="form-err">{errors[f.id]}</span>}
                </div>
              ))}

              <div className={`form-field ${focused==='message'?'focused':''} ${errors.message?'has-err':''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  value={form.message}
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  onChange={handle}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
                {errors.message && <span className="form-err">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-accent contact-submit">
                Send Message →
              </button>
            </form>
          )}
        </div>

        {/* Info panel */}
        <aside className="contact-info">
          <h3 className="info-title">Contact Info</h3>
          <div className="info-list">
            {INFO.map(i => (
              <div className="info-item" key={i.label}>
                <span className="info-icon">{i.icon}</span>
                <div>
                  <span className="info-label">{i.label}</span>
                  <span className="info-value">{i.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="info-note">
            <span className="note-dot" />
            <span>We typically respond within 4–8 hours during business days.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
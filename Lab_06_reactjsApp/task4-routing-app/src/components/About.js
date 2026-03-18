import '../Pages.css';
import React from 'react';
import { Link } from 'react-router-dom';

const team = [
  { initials: 'AK', name: 'Aisha Khan',    role: 'Founder & CEO',    color: '#d4410f' },
  { initials: 'MR', name: 'Marco Rossi',   role: 'Head of Design',   color: '#1c6ef2' },
  { initials: 'SL', name: 'Sara Lin',      role: 'Lead Engineer',    color: '#059669' },
  { initials: 'JP', name: 'James Park',    role: 'Product Manager',  color: '#7c3aed' },
];

const values = [
  { icon: '◎', title: 'Transparency',  desc: 'We believe in open communication at every level of the organisation.' },
  { icon: '◈', title: 'Craft',         desc: 'Every pixel, every line of code — we obsess over the details.' },
  { icon: '◉', title: 'Community',     desc: 'Built by developers, for developers. We grow together.' },
];

const timeline = [
  { year: '2021', event: 'NEXUS founded in a small Berlin studio apartment.' },
  { year: '2022', event: 'First 1,000 users. Launched v2 with React Router.' },
  { year: '2023', event: 'Series A funding. Team grew to 18 people.' },
  { year: '2024', event: 'Crossed 100,000 active projects worldwide.' },
  { year: '2025', event: 'Launched NEXUS Pro with AI-powered scaffolding.' },
];

export default function About() {
  return (
    <div className="page">
      {/* Header */}
      <section className="about-hero">
        <p className="section-eyebrow">OUR STORY</p>
        <h1 className="section-title">We build tools<br /><em style={{fontStyle:'italic',color:'var(--accent)'}}>developers love.</em></h1>
        <p className="section-sub">
          NEXUS was born from frustration with boilerplate. We wanted a React starter
          that felt as good to use as it was to look at — so we built one.
        </p>
      </section>

      {/* Values */}
      <section className="about-section">
        <p className="section-eyebrow">OUR VALUES</p>
        <div className="values-grid">
          {values.map(v => (
            <div className="value-card" key={v.title}>
              <span className="value-icon">{v.icon}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section">
        <p className="section-eyebrow">TIMELINE</p>
        <h2 className="about-section-title">How we got here.</h2>
        <div className="timeline">
          {timeline.map((t, i) => (
            <div className="tl-item" key={t.year} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="tl-year">{t.year}</div>
              <div className="tl-dot" />
              <div className="tl-event">{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <p className="section-eyebrow">THE TEAM</p>
        <h2 className="about-section-title">The people behind it.</h2>
        <div className="team-grid">
          {team.map(m => (
            <div className="team-card" key={m.name}>
              <div className="team-avatar" style={{ background: m.color }}>{m.initials}</div>
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <p>Want to work with us or just say hi?</p>
        <Link to="/contact" className="btn btn-accent">Get in Touch →</Link>
      </section>
    </div>
  );
}
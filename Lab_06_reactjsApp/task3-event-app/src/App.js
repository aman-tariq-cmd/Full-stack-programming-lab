import React, { useState } from 'react';
import './App.css';

const BG_PALETTE = [
  { bg: '#0f0f13', label: 'Void' },
  { bg: '#0d1f2d', label: 'Abyss' },
  { bg: '#1a0a2e', label: 'Nebula' },
  { bg: '#0a1f0a', label: 'Forest' },
  { bg: '#2d1a0a', label: 'Ember' },
  { bg: '#1a1a0a', label: 'Sulfur' },
  { bg: '#2d0a1a', label: 'Crimson' },
  { bg: '#0a2d2d', label: 'Deep Sea' },
];

function Actions() {
  const [message, setMessage]     = useState(null);
  const [bgIndex, setBgIndex]     = useState(0);
  const [hovered, setHovered]     = useState(null);
  const [ripples, setRipples]     = useState([]);
  const [alertLog, setAlertLog]   = useState([]);
  const [msgVisible, setMsgVisible] = useState(false);

  const currentBg = BG_PALETTE[bgIndex];

  const addRipple = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rid = Date.now();
    setRipples(r => [...r, { id: rid, x, y, btn: id }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== rid)), 600);
  };

  const handleShowMessage = (e) => {
    addRipple(e, 'msg');
    const msgs = [
      "You've unlocked a secret. 🔓",
      "React loves you back. ⚛️",
      "onClick fired — perfectly. ✓",
      "Events are your superpower. ⚡",
      "Keep building great things. 🚀",
    ];
    const next = msgs[Math.floor(Math.random() * msgs.length)];
    setMessage(next);
    setMsgVisible(true);
    setTimeout(() => setMsgVisible(false), 3500);
  };

  const handleChangeBg = (e) => {
    addRipple(e, 'bg');
    setBgIndex(i => (i + 1) % BG_PALETTE.length);
  };

  const handleAlert = (e) => {
    addRipple(e, 'alert');
    const timestamp = new Date().toLocaleTimeString();
    const entry = `Alert fired at ${timestamp}`;
    setAlertLog(l => [entry, ...l].slice(0, 5));
    alert(`⚡ Event triggered!\n\nThis is your browser alert.\nTime: ${timestamp}`);
  };

  const buttons = [
    {
      id: 'msg',
      label: 'Show Message',
      sublabel: 'onClick',
      icon: '◈',
      hoverColor: '#e8d44d',
      className: 'btn-message',
      action: handleShowMessage,
    },
    {
      id: 'bg',
      label: 'Change Background',
      sublabel: 'onClick',
      icon: '◉',
      hoverColor: '#4de8b0',
      className: 'btn-bg',
      action: handleChangeBg,
    },
    {
      id: 'alert',
      label: 'Show Alert',
      sublabel: 'onClick',
      icon: '◆',
      hoverColor: '#e84d7a',
      className: 'btn-alert',
      action: handleAlert,
    },
  ];

  return (
    <div className="app-wrapper" style={{ background: currentBg.bg }}>
      <div className="noise-overlay" />

      <div className="stage">
        {/* Header */}
        <div className="header">
          <p className="eyebrow">EVENT HANDLER DEMO</p>
          <h1 className="title">Actions<span className="title-accent">.</span></h1>
          <div className="bg-chip">
            <span className="chip-dot" style={{ background: currentBg.bg === '#0f0f13' ? '#555' : currentBg.bg }} />
            <span className="chip-label">Scene: {currentBg.label}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="btn-grid">
          {buttons.map(btn => (
            <button
              key={btn.id}
              className={`action-btn ${btn.className} ${hovered === btn.id ? 'is-hovered' : ''}`}
              onClick={btn.action}
              onMouseOver={() => setHovered(btn.id)}
              onMouseOut={() => setHovered(null)}
              style={hovered === btn.id ? { color: btn.hoverColor, borderColor: btn.hoverColor } : {}}
            >
              {/* Ripples */}
              {ripples.filter(r => r.btn === btn.id).map(r => (
                <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
              ))}
              <span className="btn-icon"
                style={hovered === btn.id ? { color: btn.hoverColor } : {}}>
                {btn.icon}
              </span>
              <span className="btn-text">{btn.label}</span>
              <span className="btn-sub"
                style={hovered === btn.id ? { color: btn.hoverColor, opacity: 0.9 } : {}}>
                {btn.sublabel}
              </span>
              <span className="btn-glow"
                style={hovered === btn.id ? { background: btn.hoverColor, opacity: 0.12 } : {}} />
            </button>
          ))}
        </div>

        {/* Message display */}
        <div className={`message-panel ${msgVisible ? 'visible' : ''}`}>
          <span className="msg-bar" />
          <span className="msg-text">{message}</span>
        </div>

        {/* Alert log */}
        {alertLog.length > 0 && (
          <div className="alert-log">
            <p className="log-label">ALERT LOG</p>
            <ul className="log-list">
              {alertLog.map((entry, i) => (
                <li key={i} className="log-item" style={{ animationDelay: `${i * 0.05}s` }}>
                  <span className="log-dot" />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hover state indicator */}
        <div className="event-strip">
          <span className="ev-label">LAST EVENT</span>
          <span className="ev-value">
            {hovered
              ? `onMouseOver → #${hovered}-btn`
              : message && msgVisible
              ? 'onClick → showMessage()'
              : alertLog.length > 0
              ? 'onClick → alert()'
              : '— waiting —'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Actions;
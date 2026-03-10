// ============================================================
//  Greeting.js  —  Dynamic Greeting App
//
//  Props
//  ─────
//  name        (string)  – Person's name to greet
//  timeOfDay   (string)  – "Morning" | "Afternoon" | "Evening" | "Night"
//  bgColor     (string)  – BONUS: override gradient key from the theme map
//                          e.g. "Morning" | "Afternoon" | "Evening" | "Night"
//  index       (number)  – Position in list → drives staggered animation delay
//
//  Conditional rendering is used throughout:
//    • Greeting text  →  changes per timeOfDay  (if/else chain via object map)
//    • Icon / scene   →  different celestial body per timeOfDay
//    • Particles      →  different count & symbol per timeOfDay
//    • Theme colours  →  different gradient palette per timeOfDay
// ============================================================

import React, { useMemo } from 'react';

// ── 1. TIME-OF-DAY THEME MAP ──────────────────────────────────
//
//  Each key holds everything that changes when timeOfDay changes:
//  gradient colours, greeting copy, sub-message, icon, particle
//  symbol and count, and text colour scheme.
//
//  This is the core "conditional rendering" data structure —
//  instead of nested if/else blocks we look up the active theme
//  with a single: themes[timeOfDay] || themes.Morning
//
const TIME_THEMES = {
  Morning: {
    // Sky colours — dawn pastels
    gradientTop:    '#fde8c8',
    gradientMid:    '#fbc97a',
    gradientBot:    '#f5a623',
    glowColor:      'rgba(251, 201, 122, 0.55)',
    // Text
    greeting:       'Good Morning',
    subMessage:     'Rise and shine — a fresh canvas awaits you.',
    tagline:        'Start strong. The day is yours.',
    // Celestial body
    icon:           '☀️',
    iconLabel:      'Sun',
    iconAnimation:  'spin-slow',
    // Floating particles (stars / motes in the sky)
    particleSymbol: '✦',
    particleCount:  6,
    particleClass:  'particles--morning',
    // Text colours (dark text on light sky)
    textDark:       true,
    accentColor:    '#b45309',
    cardClass:      'greeting-card--morning',
  },

  Afternoon: {
    gradientTop:    '#60a5fa',
    gradientMid:    '#3b82f6',
    gradientBot:    '#1d4ed8',
    glowColor:      'rgba(96, 165, 250, 0.50)',
    greeting:       'Good Afternoon',
    subMessage:     'Keep the momentum — your best work is happening right now.',
    tagline:        'Stay focused. Stay brilliant.',
    icon:           '🌤️',
    iconLabel:      'Partly cloudy',
    iconAnimation:  'float-gentle',
    particleSymbol: '☁',
    particleCount:  5,
    particleClass:  'particles--afternoon',
    textDark:       false,
    accentColor:    '#bfdbfe',
    cardClass:      'greeting-card--afternoon',
  },

  Evening: {
    gradientTop:    '#7c3aed',
    gradientMid:    '#db2777',
    gradientBot:    '#ea580c',
    glowColor:      'rgba(219, 39, 119, 0.45)',
    greeting:       'Good Evening',
    subMessage:     'The golden hour is here — savour every moment.',
    tagline:        'Wind down. Reflect. Recharge.',
    icon:           '🌅',
    iconLabel:      'Sunset',
    iconAnimation:  'float-gentle',
    particleSymbol: '✧',
    particleCount:  8,
    particleClass:  'particles--evening',
    textDark:       false,
    accentColor:    '#fed7aa',
    cardClass:      'greeting-card--evening',
  },

  Night: {
    gradientTop:    '#0f172a',
    gradientMid:    '#1e1b4b',
    gradientBot:    '#312e81',
    glowColor:      'rgba(129, 140, 248, 0.35)',
    greeting:       'Good Night',
    subMessage:     'The stars are out — rest well and dream deeply.',
    tagline:        'Peace. Stillness. Tomorrow awaits.',
    icon:           '🌙',
    iconLabel:      'Moon',
    iconAnimation:  'float-gentle',
    particleSymbol: '★',
    particleCount:  10,
    particleClass:  'particles--night',
    textDark:       false,
    accentColor:    '#c7d2fe',
    cardClass:      'greeting-card--night',
  },
};

// ── 2. PARTICLE POSITIONS (pre-defined so they look natural) ──
//
//  Each array entry: { top%, left%, size(rem), delay(s), duration(s) }
//
const PARTICLE_POSITIONS = [
  { top: 12, left:  8, size: 0.75, delay: 0.0, dur: 3.8 },
  { top: 20, left: 78, size: 0.55, delay: 0.6, dur: 4.5 },
  { top:  7, left: 55, size: 0.90, delay: 1.2, dur: 3.2 },
  { top: 35, left: 15, size: 0.60, delay: 0.3, dur: 5.0 },
  { top: 15, left: 40, size: 0.45, delay: 1.8, dur: 4.0 },
  { top: 28, left: 88, size: 0.70, delay: 0.9, dur: 3.6 },
  { top:  5, left: 25, size: 0.50, delay: 2.1, dur: 4.8 },
  { top: 40, left: 65, size: 0.65, delay: 0.5, dur: 3.4 },
  { top: 22, left: 95, size: 0.40, delay: 1.5, dur: 5.2 },
  { top: 10, left: 70, size: 0.80, delay: 0.2, dur: 4.2 },
];

// ── 3. GREETING COMPONENT ─────────────────────────────────────
const Greeting = ({ name, timeOfDay, bgColor, index }) => {

  // ── Conditional rendering step 1:
  //    Look up the theme for the given timeOfDay prop.
  //    If timeOfDay doesn't match any key (e.g. a typo), fall back to Morning.
  //    The bgColor BONUS prop can override which theme's gradient is shown.
  const theme = useMemo(() => {
    const resolvedKey = bgColor || timeOfDay;
    return TIME_THEMES[resolvedKey] || TIME_THEMES.Morning;
  }, [timeOfDay, bgColor]);

  // ── Conditional rendering step 2:
  //    Slice particle positions to the count defined per theme.
  const particles = PARTICLE_POSITIONS.slice(0, theme.particleCount);

  // ── Derive first name for a friendlier greeting
  const firstName = name.split(' ')[0];

  // ── Card entrance delay (staggered via index prop)
  const entranceDelay = `${index * 0.18}s`;

  return (
    <div
      className={`greeting-card ${theme.cardClass}`}
      style={{
        '--gradient-top': theme.gradientTop,
        '--gradient-mid': theme.gradientMid,
        '--gradient-bot': theme.gradientBot,
        '--glow-color':   theme.glowColor,
        '--accent-color': theme.accentColor,
        animationDelay:   entranceDelay,
      }}
    >

      {/* ── Sky gradient background ── */}
      <div className="card-sky" aria-hidden="true" />

      {/* ── Horizon glow ── */}
      <div className="card-glow" aria-hidden="true" />

      {/* ── Floating particles (stars / clouds / sparkles) ──
           Conditional rendering step 3:
           Each timeOfDay renders different particle symbols
           at different positions via .map()                    */}
      <div className={`card-particles ${theme.particleClass}`} aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              top:             `${p.top}%`,
              left:            `${p.left}%`,
              fontSize:        `${p.size}rem`,
              animationDelay:  `${p.delay}s`,
              animationDuration:`${p.dur}s`,
            }}
          >
            {theme.particleSymbol}
          </span>
        ))}
      </div>

      {/* ── Celestial icon ──
           Conditional rendering step 4:
           Different icon rendered per timeOfDay theme         */}
      <div
        className={`card-icon ${theme.iconAnimation}`}
        role="img"
        aria-label={theme.iconLabel}
      >
        {theme.icon}
      </div>

      {/* ── Text content ── */}
      <div className={`card-content ${theme.textDark ? 'card-content--dark' : 'card-content--light'}`}>

        {/* Time-of-day label */}
        <div className="card-time-label">
          {/* Conditional rendering step 5:
              Show a small coloured dot that matches the theme accent */}
          <span className="time-dot" />
          {timeOfDay}
        </div>

        {/* Main greeting — uses theme.greeting which changes per timeOfDay */}
        <h2 className="card-greeting">
          {theme.greeting},
        </h2>

        {/* Name — large display type */}
        <p className="card-name">{firstName}</p>

        {/* Sub-message — unique per timeOfDay */}
        <p className="card-sub">{theme.subMessage}</p>

        {/* Divider */}
        <div className="card-divider" />

        {/* Tagline footer */}
        <p className="card-tagline">{theme.tagline}</p>

      </div>

      {/* ── Bottom wave decoration ── */}
      <div className="card-wave" aria-hidden="true">
        <svg viewBox="0 0 400 60" preserveAspectRatio="none">
          <path
            d="M0,30 C80,60 160,0 240,30 C320,60 360,10 400,30 L400,60 L0,60 Z"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
      </div>

    </div>
  );
};

export default Greeting;

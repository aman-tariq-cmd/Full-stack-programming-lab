// ============================================================
//  App.js  —  Dynamic Greeting App
//
//  Features:
//    • Renders 4 Greeting components (one per timeOfDay)
//    • Live clock that shows current time
//    • Auto-detects the user's current time of day and
//      highlights the matching card with a "You are here" badge
//    • BONUS: bgColor prop demonstrated on one card
// ============================================================

import React, { useState, useEffect } from 'react';
import Greeting from './components/Greeting';
import './App.css';

// ── Helper: derive timeOfDay string from current hour ─────────
function getTimeOfDay(hour) {
  if (hour >= 5  && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
}

// ── Helper: format time as HH:MM:SS ──────────────────────────
function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

// ── Greeting data — 4 people, one per timeOfDay ───────────────
//  The BONUS bgColor prop is shown on the last entry:
//  Sarah's card uses bgColor="Evening" even though her
//  timeOfDay prop is also "Evening" — you could set bgColor
//  to any key to override the visual theme independently.
const greetings = [
  {
    id:        1,
    name:      'Aisha Rahman',
    timeOfDay: 'Morning',
    // No bgColor prop → uses timeOfDay as theme key
  },
  {
    id:        2,
    name:      'Carlos Mendez',
    timeOfDay: 'Afternoon',
  },
  {
    id:        3,
    name:      'Yuki Tanaka',
    timeOfDay: 'Evening',
  },
  {
    id:        4,
    name:      'Noah Williams',
    timeOfDay: 'Night',
    // BONUS: bgColor prop — even if timeOfDay were "Morning",
    // this card would visually render the Night theme palette
    bgColor:   'Night',
  },
];

// ── App Component ─────────────────────────────────────────────
function App() {
  // Live clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Derive the user's current time-of-day to highlight the matching card
  const currentTimeOfDay = getTimeOfDay(currentTime.getHours());

  return (
    <div className="app">

      {/* ── Full-page atmospheric background ── */}
      <div className="app-bg" aria-hidden="true">
        <div className="app-bg__layer app-bg__layer--1" />
        <div className="app-bg__layer app-bg__layer--2" />
        <div className="app-bg__noise"  />
      </div>

      {/* ══════════════════════════════════════
          HEADER
          ══════════════════════════════════════ */}
      <header className="page-header">

        {/* Live clock badge */}
        <div className="clock-badge">
          <span className="clock-badge__dot" />
          <span className="clock-badge__time">{formatTime(currentTime)}</span>
        </div>

        {/* Page title */}
        <h1 className="page-title">
          Dynamic <br />
          <em>Greetings</em>
        </h1>

        {/* Sub-heading */}
        <p className="page-subtitle">
          A <code>Greeting</code> component rendered four times with different{' '}
          <code>name</code>, <code>timeOfDay</code>, and <code>bgColor</code> props.
          The card matching your current hour glows.
        </p>

        {/* Current time-of-day indicator */}
        <div className="now-indicator">
          <span className="now-indicator__label">Your time of day</span>
          <span className={`now-indicator__badge now-indicator__badge--${currentTimeOfDay.toLowerCase()}`}>
            {currentTimeOfDay}
          </span>
        </div>

      </header>

      {/* ══════════════════════════════════════
          GREETING CARDS GRID
          ══════════════════════════════════════ */}
      <main className="cards-section">

        {/*
         * Map over the greetings array to render a Greeting component
         * for each entry. The 'key' prop is required by React for list
         * rendering. 'index' drives the staggered entrance animation.
         *
         * We also pass 'isCurrentTime' so the matching card can show
         * a "Now" badge — this is additional conditional rendering in CSS
         * via a data attribute.
         */}
        <div className="cards-grid">
          {greetings.map((g, index) => {
            const isCurrent = g.timeOfDay === currentTimeOfDay;
            return (
              <div
                key={g.id}
                className={`card-slot ${isCurrent ? 'card-slot--current' : ''}`}
                data-current={isCurrent}
              >
                {/* "Now" badge shown conditionally */}
                {isCurrent && (
                  <div className="now-badge" aria-label="Your current time of day">
                    <span className="now-badge__pulse" />
                    Now
                  </div>
                )}

                <Greeting
                  name={g.name}
                  timeOfDay={g.timeOfDay}
                  bgColor={g.bgColor}   // BONUS prop
                  index={index}
                />
              </div>
            );
          })}
        </div>

        {/* ── Prop legend ── */}
        <div className="legend">
          <div className="legend__title">Props used in this render</div>
          <div className="legend__chips">
            <span className="legend__chip legend__chip--name">name</span>
            <span className="legend__chip legend__chip--tod">timeOfDay</span>
            <span className="legend__chip legend__chip--bg">bgColor ✦ bonus</span>
            <span className="legend__chip legend__chip--idx">index</span>
          </div>
        </div>

      </main>

      {/* ══════════════════════════════════════
          FOOTER
          ══════════════════════════════════════ */}
      <footer className="page-footer">
        <span>Greeting App</span>
        <span className="footer-dot">·</span>
        <span>React Lab 05</span>
        <span className="footer-dot">·</span>
        <span>Task 03</span>
      </footer>

    </div>
  );
}

export default App;

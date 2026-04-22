// ============================================================
//  App.js  —  Student Card Application
//  Root component that renders the page header and three
//  StudentCard components with different color themes.
// ============================================================

import React from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

// ── Student data array ────────────────────────────────────────
//  Each object is spread as props into <StudentCard />.
//  The 'color' prop maps to a theme inside StudentCard.js.
const students = [
  {
    name:       'Aisha Malik',
    rollNo:     'CS-2021-041',
    department: 'Computer Science',
    university: 'FAST National University',
    color:      'indigo',
  },
  {
    name:       'Bilal Hassan',
    rollNo:     'EE-2021-078',
    department: 'Electrical Engineering',
    university: 'UET Lahore',
    color:      'teal',
  },
  {
    name:       'Sara Noor',
    rollNo:     'BA-2022-015',
    department: 'Business Administration',
    university: 'IBA Karachi',
    color:      'rose',
  },
];

// ── App Component ─────────────────────────────────────────────
function App() {
  return (
    <div className="app">

      {/* ── Background decorative blobs ── */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      {/* ── Page header ── */}
      <header className="page-header">
        <div className="header-eyebrow">React · Props · Components</div>
        <h1 className="page-title">
          Student <span className="title-accent">Information</span> Cards
        </h1>
        <p className="page-subtitle">
          A reusable <code>StudentCard</code> component rendered with different data
          and colour themes via <code>props</code>.
        </p>

        {/* Small stat pills */}
        <div className="header-pills">
          <span className="pill">
            <span className="pill-dot pill-dot--indigo" />
            3 Students
          </span>
          <span className="pill">
            <span className="pill-dot pill-dot--teal" />
            1 Component
          </span>
          <span className="pill">
            <span className="pill-dot pill-dot--rose" />
            Multiple Props
          </span>
        </div>
      </header>

      {/* ── Cards grid ── */}
      <main className="cards-grid">
        {students.map((student, index) => (
          /*
           * Spread the student object as individual props.
           * 'index' drives the staggered entrance animation delay.
           * 'key' is required by React for list rendering.
           */
          <StudentCard
            key={student.rollNo}
            {...student}
            index={index}
          />
        ))}
      </main>

      {/* ── Footer ── */}
      <footer className="page-footer">
        <span>Built with</span>
        <span className="footer-heart">♥</span>
        <span>React · Lab 05 · Task 01</span>
      </footer>

    </div>
  );
}

export default App;

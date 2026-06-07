// ============================================================
//  App.js  —  Course List Application
//
//  Renders:
//    • Animated page header with live stats
//    • Filter tabs (All / Online / Offline)
//    • Mapped CourseItem components from the courses array
//    • Summary footer
// ============================================================

import React, { useState, useMemo } from 'react';
import CourseItem from './components/CourseItem';
import './App.css';

// ── Course data ───────────────────────────────────────────────
//  Array of 5 courses. Each object maps directly to CourseItem props.
//  'courseType' drives the BONUS styling (Online vs Offline).
const courses = [
  {
    id:          1,
    courseName:  'Advanced UI/UX Design Systems',
    instructor:  'Layla Okonkwo',
    duration:    '10 Weeks',
    courseType:  'Online',
    category:    'Design',
    level:       'Advanced',
  },
  {
    id:          2,
    courseName:  'Full-Stack Engineering with React & Node',
    instructor:  'Marco Fernandez',
    duration:    '14 Weeks',
    courseType:  'Online',
    category:    'Engineering',
    level:       'Intermediate',
  },
  {
    id:          3,
    courseName:  'Data Science & Machine Learning Bootcamp',
    instructor:  'Priya Sharma',
    duration:    '12 Weeks',
    courseType:  'Offline',
    category:    'Data',
    level:       'Intermediate',
  },
  {
    id:          4,
    courseName:  'Strategic Business Communication',
    instructor:  'James Whitfield',
    duration:    '6 Weeks',
    courseType:  'Offline',
    category:    'Business',
    level:       'Beginner',
  },
  {
    id:          5,
    courseName:  'Ethical Hacking & Cybersecurity',
    instructor:  'Amir Khalid',
    duration:    '8 Weeks',
    courseType:  'Online',
    category:    'Security',
    level:       'Advanced',
  },
];

// ── Filter tab definitions ────────────────────────────────────
const FILTERS = [
  { key: 'All',     label: 'All Courses' },
  { key: 'Online',  label: 'Online'      },
  { key: 'Offline', label: 'Offline'     },
];

// ── App Component ─────────────────────────────────────────────
function App() {
  // Active filter tab state
  const [activeFilter, setActiveFilter] = useState('All');

  // Derive filtered list with useMemo to avoid re-computation on every render
  const filteredCourses = useMemo(
    () =>
      activeFilter === 'All'
        ? courses
        : courses.filter((c) => c.courseType === activeFilter),
    [activeFilter]
  );

  // Derived counts for stats display
  const onlineCount  = courses.filter((c) => c.courseType === 'Online').length;
  const offlineCount = courses.filter((c) => c.courseType === 'Offline').length;

  return (
    <div className="app">

      {/* ── Decorative background grid lines ── */}
      <div className="bg-grid" aria-hidden="true" />

      {/* ── Decorative ambient glow spots ── */}
      <div className="glow glow--1" aria-hidden="true" />
      <div className="glow glow--2" aria-hidden="true" />

      {/* ════════════════════════════════════
          PAGE HEADER
          ════════════════════════════════════ */}
      <header className="page-header">
        <div className="page-header__inner">

          {/* Eyebrow label */}
          <div className="eyebrow">
            <span className="eyebrow__dot" />
            React · Props · Array.map()
          </div>

          {/* Main title */}
          <h1 className="page-title">
            Course <em>Catalogue</em>
          </h1>

          {/* Sub-heading */}
          <p className="page-subtitle">
            A reusable <code>CourseItem</code> component rendered from a
            data array using <code>Array.map()</code> with Online / Offline
            type differentiation via props.
          </p>

          {/* ── Stats bar ── */}
          <div className="stats-bar">
            <div className="stat">
              <span className="stat__number">{courses.length}</span>
              <span className="stat__label">Total Courses</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__number stat__number--online">{onlineCount}</span>
              <span className="stat__label">Online</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__number stat__number--offline">{offlineCount}</span>
              <span className="stat__label">Offline</span>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════
          FILTER TABS
          ════════════════════════════════════ */}
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${activeFilter === f.key ? 'filter-tab--active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
            {/* Show live count badge on each tab */}
            <span className="filter-tab__count">
              {f.key === 'All'
                ? courses.length
                : courses.filter((c) => c.courseType === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════
          COURSE LIST
          ════════════════════════════════════ */}
      <main className="course-list">
        {filteredCourses.length === 0 ? (
          /* Empty state (edge-case safety) */
          <div className="empty-state">
            <span className="empty-state__icon">◌</span>
            <p>No courses found for this filter.</p>
          </div>
        ) : (
          /*
           * Map over the filtered courses array and render a
           * CourseItem for each one. The 'key' prop is required
           * by React. 'index' is passed for staggered animations.
           */
          filteredCourses.map((course, index) => (
            <CourseItem
              key={course.id}
              courseName={course.courseName}
              instructor={course.instructor}
              duration={course.duration}
              courseType={course.courseType}
              category={course.category}
              level={course.level}
              index={index}
            />
          ))
        )}
      </main>

      {/* ════════════════════════════════════
          FOOTER
          ════════════════════════════════════ */}
      <footer className="page-footer">
        <span>Course List App</span>
        <span className="footer-sep">·</span>
        <span>React Lab 05</span>
        <span className="footer-sep">·</span>
        <span>Task 02</span>
      </footer>

    </div>
  );
}

export default App;

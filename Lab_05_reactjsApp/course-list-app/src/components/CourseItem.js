// ============================================================
//  CourseItem.js  —  Course List App
//
//  Props:
//    courseName  (string)  — Title of the course
//    instructor  (string)  — Instructor's full name
//    duration    (string)  — e.g. "8 Weeks" or "12 Hours"
//    courseType  (string)  — "Online" | "Offline"
//    index       (number)  — Position in the list (for animations
//                            & staggered entrance delays)
//    category    (string)  — e.g. "Design", "Engineering"
//    level       (string)  — "Beginner" | "Intermediate" | "Advanced"
// ============================================================

import React, { useState } from 'react';

// ── Level badge colour mapping ────────────────────────────────
const levelConfig = {
  Beginner:     { className: 'level--beginner',     label: 'Beginner'     },
  Intermediate: { className: 'level--intermediate', label: 'Intermediate' },
  Advanced:     { className: 'level--advanced',      label: 'Advanced'     },
};

// ── Category icon mapping (Unicode symbols, no extra lib) ─────
const categoryIcons = {
  Design:      '✦',
  Engineering: '⚙',
  Data:        '◈',
  Business:    '◉',
  Security:    '⬡',
};

const CourseItem = ({
  courseName,
  instructor,
  duration,
  courseType,
  index,
  category,
  level,
}) => {
  // Track whether the card is "bookmarked" — local UI state
  const [bookmarked, setBookmarked] = useState(false);

  // Determine if course is online for conditional class logic
  const isOnline = courseType === 'Online';

  // Resolve level config (fall back to Beginner)
  const lvl = levelConfig[level] || levelConfig.Beginner;

  // Category icon (fall back to a dot)
  const catIcon = categoryIcons[category] || '◌';

  return (
    // Staggered entrance: animation-delay driven by index prop
    <article
      className={`course-item ${isOnline ? 'course-item--online' : 'course-item--offline'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* ── Left accent bar (colour changes Online vs Offline) ── */}
      <div className="course-item__accent" />

      {/* ── Main content area ── */}
      <div className="course-item__body">

        {/* Top row: category tag + course type badge */}
        <div className="course-item__top">
          <span className="course-item__category">
            <span className="course-item__cat-icon">{catIcon}</span>
            {category}
          </span>

          {/*
           * BONUS: courseType prop renders different badge styles.
           * Online  → amber pill with a pulse dot
           * Offline → slate pill with a static dot
           */}
          <span className={`course-item__type-badge ${isOnline ? 'type-badge--online' : 'type-badge--offline'}`}>
            <span className={`type-badge__dot ${isOnline ? 'type-badge__dot--pulse' : ''}`} />
            {courseType}
          </span>
        </div>

        {/* Course title */}
        <h2 className="course-item__title">{courseName}</h2>

        {/* Instructor row */}
        <div className="course-item__instructor">
          {/* Auto-generated instructor initials avatar */}
          <div className="instructor-avatar">
            {instructor
              .split(' ')
              .map((w) => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="instructor-info">
            <span className="instructor-label">Instructor</span>
            <span className="instructor-name">{instructor}</span>
          </div>
        </div>

        {/* Footer: duration + level + bookmark */}
        <div className="course-item__footer">
          <div className="course-item__meta">
            {/* Duration */}
            <div className="meta-chip">
              {/* Clock icon (inline SVG, no dependencies) */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {duration}
            </div>

            {/* Difficulty level */}
            <div className={`meta-chip level-chip ${lvl.className}`}>
              {lvl.label}
            </div>
          </div>

          {/* Bookmark toggle button */}
          <button
            className={`bookmark-btn ${bookmarked ? 'bookmark-btn--active' : ''}`}
            onClick={() => setBookmarked((prev) => !prev)}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this course'}
          >
            {bookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>

      {/* ── Hover shimmer overlay ── */}
      <div className="course-item__shimmer" aria-hidden="true" />
    </article>
  );
};

export default CourseItem;

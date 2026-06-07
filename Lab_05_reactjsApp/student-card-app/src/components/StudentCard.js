// ============================================================
//  StudentCard Component
//  Props: name, rollNo, department, university, color, index
//  Displays a styled card for a single student's information
// ============================================================

import React from 'react';

const StudentCard = ({ name, rollNo, department, university, color, index }) => {

  // Derive initials from the student's name for the avatar
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Map the color prop to a full theme object (gradient + accent + text)
  const colorThemes = {
    indigo: {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      badge: '#ede9fe',
      badgeText: '#5b21b6',
      avatarBg: 'rgba(255,255,255,0.22)',
      shine: 'rgba(255,255,255,0.12)',
    },
    teal: {
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)',
      badge: '#ccfbf1',
      badgeText: '#0f766e',
      avatarBg: 'rgba(255,255,255,0.22)',
      shine: 'rgba(255,255,255,0.12)',
    },
    rose: {
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #db2777 100%)',
      badge: '#ffe4e6',
      badgeText: '#be123c',
      avatarBg: 'rgba(255,255,255,0.22)',
      shine: 'rgba(255,255,255,0.12)',
    },
    amber: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      badge: '#fef3c7',
      badgeText: '#92400e',
      avatarBg: 'rgba(255,255,255,0.22)',
      shine: 'rgba(255,255,255,0.12)',
    },
    emerald: {
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      badge: '#d1fae5',
      badgeText: '#065f46',
      avatarBg: 'rgba(255,255,255,0.22)',
      shine: 'rgba(255,255,255,0.12)',
    },
  };

  // Fall back to indigo if an unrecognised color is passed
  const theme = colorThemes[color] || colorThemes.indigo;

  return (
    <div className="card-wrapper" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="student-card">

        {/* ── Coloured header band ── */}
        <div className="card-header" style={{ background: theme.gradient }}>

          {/* Decorative shine circle */}
          <div className="card-shine" style={{ background: theme.shine }} />

          {/* Avatar circle with initials */}
          <div className="avatar" style={{ background: theme.avatarBg }}>
            {initials}
          </div>

          {/* Student name + roll number badge */}
          <div className="card-header-text">
            <h2 className="student-name">{name}</h2>
            <span className="roll-badge">
              Roll # {rollNo}
            </span>
          </div>
        </div>

        {/* ── Info body ── */}
        <div className="card-body">

          {/* Department row */}
          <div className="info-row">
            <div className="info-icon" style={{ background: theme.badge, color: theme.badgeText }}>
              {/* Book SVG icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-label">Department</span>
              <span className="info-value">{department}</span>
            </div>
          </div>

          {/* University row */}
          <div className="info-row">
            <div className="info-icon" style={{ background: theme.badge, color: theme.badgeText }}>
              {/* Building SVG icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-label">University</span>
              <span className="info-value">{university}</span>
            </div>
          </div>

          {/* ── Footer tag ── */}
          <div className="card-footer">
            <span
              className="dept-tag"
              style={{ background: theme.badge, color: theme.badgeText }}
            >
              {department}
            </span>
            <span className="student-label">Student</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentCard;

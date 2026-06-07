/* ======================================================
   Task 3 — Async Data Loader
   script.js
   ====================================================== */

// ── Step 1: Mock user data (resolves from Promise) ─────
const mockUsers = [
  { id: 1, name: 'Ayesha Khan',   role: 'Full-Stack Dev',   emoji: '👩‍💻', status: 'active'  },
  { id: 2, name: 'Omar Sheikh',   role: 'UI/UX Designer',   emoji: '🎨', status: 'active'  },
  { id: 3, name: 'Sara Malik',    role: 'Data Scientist',   emoji: '📊', status: 'offline' },
  { id: 4, name: 'Bilal Ahmed',   role: 'DevOps Engineer',  emoji: '⚙️', status: 'active'  },
  { id: 5, name: 'Hina Javed',    role: 'Backend Dev',      emoji: '🛠️', status: 'offline' },
  { id: 6, name: 'Zain Ul Abid',  role: 'Cloud Architect',  emoji: '☁️', status: 'active'  },
];

// ── Step 2: fetchUsers — returns a Promise ─────────────
function fetchUsers(shouldFail = false) {   // boolean flag
  return new Promise((resolve, reject) => {
    // Simulate network delay with setTimeout (3 seconds)
    setTimeout(() => {
      if (shouldFail) {
        // REJECT with error object when flag is true
        reject({
          code: 503,
          message: 'Server unavailable. Could not fetch user data.',
        });
      } else {
        // RESOLVE with array of user objects
        resolve(mockUsers);
      }
    }, 3000);   // 3000ms = 3 seconds
  });
}

// ── Step 3: Progress bar helpers ──────────────────────
let progressInterval = null;

function startProgress() {
  const bar  = document.getElementById('progress-bar');
  const wrap = document.getElementById('progress-wrap');
  wrap.style.display = 'block';
  bar.style.width    = '0%';
  bar.style.background = 'linear-gradient(90deg, var(--blue), var(--green))';

  let pct = 0;
  progressInterval = setInterval(() => {
    // Randomly grow to max 92% (final jump happens on resolve)
    pct = Math.min(pct + Math.random() * 4, 92);
    bar.style.width = pct + '%';
  }, 120);
}

function finishProgress(success) {
  clearInterval(progressInterval);
  const bar = document.getElementById('progress-bar');
  bar.style.width = '100%';
  if (!success) {
    bar.style.background = '#ff4757';   // red on failure
  }
  // Hide after short delay
  setTimeout(() => {
    document.getElementById('progress-wrap').style.display = 'none';
  }, 700);
}

// ── Step 4: Status bar helper ─────────────────────────
function setStatus(type, message) {
  const dot = document.getElementById('dot');
  dot.className = 'dot ' + type;          // 'loading' | 'success' | 'error'
  document.getElementById('status-msg').textContent = message;
}

// ── Step 5: Render user cards to DOM ──────────────────
const avatarColors = [
  '#1e3a5f', '#1a3d2f', '#3d1a2e',
  '#2a1a3d', '#3d2a1a', '#1a2a3d',
];

function renderUsers(users) {
  const grid = document.getElementById('user-grid');
  grid.innerHTML = users.map((user, index) => `
    <div class="user-card" style="animation-delay: ${index * 0.08}s">
      <div class="user-avatar" style="background: ${avatarColors[index % avatarColors.length]}">
        ${user.emoji}
      </div>
      <div class="user-name">${user.name}</div>
      <div class="user-role">${user.role}</div>
      <span class="user-badge ${user.status === 'active' ? 'badge-active' : 'badge-offline'}">
        ${user.status === 'active' ? '● Online' : '○ Offline'}
      </span>
    </div>`).join('');
}

// ── Step 6: Show skeleton placeholders while loading ──
function showSkeletons() {
  const grid = document.getElementById('user-grid');
  grid.innerHTML = Array(6).fill(0).map(() => `
    <div class="skeleton">
      <div class="skel-circle"></div>
      <div class="skel-line"></div>
      <div class="skel-line short"></div>
      <div class="skel-line xs"></div>
    </div>`).join('');
}

// ── Step 7: Main trigger — uses .then() and .catch() ──
function triggerFetch() {
  const shouldFail = document.getElementById('fail-toggle').checked;
  const btn = document.getElementById('load-btn');

  // Disable button during fetch
  btn.disabled = true;

  // Reset UI
  document.getElementById('error-box').style.display = 'none';
  setStatus('loading', 'Fetching users from server…');
  showSkeletons();
  startProgress();

  // ── Call the Promise-returning function ──────────────
  fetchUsers(shouldFail)
    .then(users => {
      // SUCCESS path
      finishProgress(true);
      setStatus('success', `✓ Loaded ${users.length} users successfully`);
      renderUsers(users);
    })
    .catch(err => {
      // FAILURE path
      finishProgress(false);
      setStatus('error', `✗ Error ${err.code}: ${err.message}`);

      // Clear skeletons
      document.getElementById('user-grid').innerHTML = '';

      // Show error box in HTML
      const errBox = document.getElementById('error-box');
      errBox.style.display = 'block';
      errBox.innerHTML = `
        <strong>⚠️  Error ${err.code}</strong><br/>
        ${err.message}<br/><br/>
        Toggle off "Simulate Failure" and try again.`;
    })
    .finally(() => {
      // Runs after BOTH .then() and .catch()
      btn.disabled = false;
    });
}

// ── Step 8: Clear output ───────────────────────────────
function clearOutput() {
  document.getElementById('user-grid').innerHTML = '';
  document.getElementById('error-box').style.display = 'none';
  document.getElementById('dot').className = 'dot';
  document.getElementById('status-msg').textContent =
    'Ready — click "Fetch Users" to load data';
}

/* ======================================================
   Task 1 — Student Management System
   script.js
   ====================================================== */

// ── Step 1: ES6 Class Definition ───────────────────────
class Student {
  // Private field (ES2022)
  #id;

  constructor(id, name, semester, courses = []) {
    this.#id      = id;          // const-like private identity
    this.name     = name;        // string
    this.semester = semester;    // string, e.g. "3rd"
    this.courses  = courses;     // array of course names
  }

  // Getter for private #id
  get id() {
    return this.#id;
  }

  // Template literal method — returns HTML string for the card
  toCard() {
    const courseTags = this.courses
      .map(c => `<span class="course-tag">${c.trim()}</span>`)
      .join('');

    return `
      <div class="card">
        <div class="card-id">ID: STU-${this.#id}</div>
        <div class="card-name">${this.name}</div>
        <div class="card-sem">Semester: ${this.semester}</div>
        <div class="card-courses">
          ${courseTags || '<span class="empty-msg">No courses enrolled</span>'}
        </div>
      </div>
    `;
  }
}

// ── Step 2: Seed Data — 3 student objects using const ──
const students = [];     // mutable array (let-like behaviour via push)
let   idCounter = 1001;  // mutable counter

const seedData = [
  { name: 'Ayesha Tariq',  semester: '5th', courses: ['OOP', 'DBMS', 'Web Dev', 'DSA'] },
  { name: 'Hassan Raza',   semester: '3rd', courses: ['Calculus', 'Physics', 'C++'] },
  { name: 'Zara Mehmood',  semester: '7th', courses: ['AI', 'Machine Learning', 'Cloud'] },
];

// Create Student objects and push into array
seedData.forEach(({ name, semester, courses }) => {
  students.push(new Student(idCounter++, name, semester, courses));
});

// ── Step 3: Render function — uses innerHTML ───────────
function render() {
  const grid = document.getElementById('student-grid');

  // Build all cards via template literals and join
  grid.innerHTML = students.map(s => s.toCard()).join('');

  // Update stats
  document.getElementById('stat-count').textContent =
    students.length;

  document.getElementById('stat-courses').textContent =
    students.reduce((total, s) => total + s.courses.length, 0);
}

// ── Step 4: Add Student from form inputs ───────────────
function addStudent() {
  const nameEl    = document.getElementById('inp-name');
  const semEl     = document.getElementById('inp-sem');
  const coursesEl = document.getElementById('inp-courses');

  const name    = nameEl.value.trim();
  const sem     = semEl.value.trim();
  const courses = coursesEl.value
    .split(',')
    .map(c => c.trim())
    .filter(Boolean);   // remove empty strings

  // Validation
  if (!name || !sem) {
    alert('⚠️  Name and Semester are required.');
    return;
  }

  // Create new Student object
  const newStudent = new Student(idCounter++, name, sem, courses);
  students.push(newStudent);

  // Re-render the grid
  render();

  // Clear inputs
  nameEl.value    = '';
  semEl.value     = '';
  coursesEl.value = '';
}

// ── Step 5: Initial render on page load ───────────────
render();

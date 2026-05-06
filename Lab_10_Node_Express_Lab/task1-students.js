// task1-students.js - Student List Display
const express = require('express');
const app = express();

const students = [
    { id: 1, name: "Aman Tariq", age: 22, course: "BSSE", semester: "6th" },
    { id: 2, name: "Ali Raza", age: 23, course: "BSSE", semester: "6th" },
    { id: 3, name: "Sara Khan", age: 22, course: "BSSE", semester: "6th" },
    { id: 4, name: "Ahmed Hassan", age: 24, course: "BSSE", semester: "6th" },
    { id: 5, name: "Fatima Ali", age: 21, course: "BSSE", semester: "6th" }
];

app.get('/students', (req, res) => {
    let html = `<html><head><title>Student List</title><style>
        body { font-family: Arial; margin: 50px; background: #f5f5f5; }
        h1 { color: #333; text-align: center; }
        ul { list-style: none; padding: 0; }
        li { background: white; padding: 12px; margin: 8px 0; border-radius: 8px; border-left: 4px solid #4CAF50; }
        .count { text-align: center; margin-top: 20px; color: #666; }
    </style></head><body>
        <h1>📚 Student List</h1>
        <ul>`;
    
    students.forEach(s => {
        html += `<li><strong>${s.name}</strong> - Age: ${s.age} | ${s.course} (${s.semester} Semester)</li>`;
    });
    
    html += `</ul><div class="count">Total Students: ${students.length}</div></body></html>`;
    res.send(html);
});

app.listen(3000, () => {
    console.log(`✅ Task 1 running at http://localhost:3000/students`);
});
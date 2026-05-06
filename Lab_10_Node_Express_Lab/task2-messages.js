// task2-messages.js - Simple Message Routes
const express = require('express');
const app = express();

// Home route
app.get('/home', (req, res) => {
    res.send(`
        <h1>🏠 Welcome to Home Page</h1>
        <p>This is the home page of our Express application.</p>
        <p>Created by: <strong>Aman Tariq</strong></p>
        <hr>
        <a href="/home">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a>
    `);
});

// About route
app.get('/about', (req, res) => {
    res.send(`
        <h1>📖 About Us</h1>
        <p>This is a simple Express.js application demonstrating multiple routes.</p>
        <p><strong>Name:</strong> Aman Tariq</p>
        <p><strong>Roll No:</strong> 232014</p>
        <hr>
        <a href="/home">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a>
    `);
});

// Contact route
app.get('/contact', (req, res) => {
    res.send(`
        <h1>📞 Contact Us</h1>
        <p>Email: aman.tariq@example.com</p>
        <p>Phone: +92 300 1234567</p>
        <p>Address: Islamabad, Pakistan</p>
        <hr>
        <a href="/home">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a>
    `);
});

// Start server on port 3001
app.listen(3001, () => {
    console.log(`✅ Task 2 running at http://localhost:3001`);
    console.log(`   - Home: http://localhost:3001/home`);
    console.log(`   - About: http://localhost:3001/about`);
    console.log(`   - Contact: http://localhost:3001/contact`);
});
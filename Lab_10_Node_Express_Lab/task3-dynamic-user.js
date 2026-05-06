// task3-dynamic-user.js - Dynamic User Page
const express = require('express');
const app = express();

// Dynamic route with parameter :name
app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`
        <h1>👋 Hello, ${userName}!</h1>
        <p>Welcome to our dynamic user page system.</p>
        <p>This page was created especially for <strong>${userName}</strong>!</p>
        <p>Created by: <strong>Aman Tariq</strong></p>
        <hr>
        <a href="/">← Go Back Home</a>
    `);
});

// Home route with examples
app.get('/', (req, res) => {
    res.send(`
        <h1>🌟 Dynamic User Page Demo</h1>
        <p>Try these examples:</p>
        <ul>
            <li><a href="/user/Aman">/user/Aman</a></li>
            <li><a href="/user/Ali">/user/Ali</a></li>
            <li><a href="/user/Sara">/user/Sara</a></li>
            <li><a href="/user/Ahmed">/user/Ahmed</a></li>
        </ul>
        <p>Or type: <strong>/user/YourName</strong> in the URL</p>
        <p>Created by: Aman Tariq (232014)</p>
    `);
});

app.listen(3002, () => {
    console.log(`✅ Task 3 running at http://localhost:3002`);
    console.log(`   - Try: http://localhost:3002/user/Aman`);
});
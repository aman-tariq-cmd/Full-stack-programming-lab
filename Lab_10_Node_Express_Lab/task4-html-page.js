// task4-html-page.js - Simple HTML Page Renderer
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Lab 10 - Node.js Express</title>
            <style>
                body { font-family: Arial; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
                .container { max-width: 800px; margin: auto; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                h1 { color: #333; text-align: center; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
                h2 { color: #4CAF50; margin-top: 20px; }
                .task { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #4CAF50; }
                .task a { color: #4CAF50; text-decoration: none; }
                .task a:hover { text-decoration: underline; }
                .info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📚 Lab 10: Node.js + Express.js</h1>
                <p><strong>Name:</strong> Aman Tariq</p>
                <p><strong>Roll No:</strong> 232014</p>
                <p><strong>Section:</strong> BSSE-VI-B</p>
                
                <h2>✅ Tasks Completed:</h2>
                
                <div class="task">
                    <strong>📋 Task 1: Student List Display</strong><br>
                    <a href="http://localhost:3000/students">http://localhost:3000/students</a> - Shows list of students in HTML
                </div>
                
                <div class="task">
                    <strong>💬 Task 2: Message Routes</strong><br>
                    <a href="http://localhost:3001/home">http://localhost:3001/home</a> |
                    <a href="http://localhost:3001/about">http://localhost:3001/about</a> |
                    <a href="http://localhost:3001/contact">http://localhost:3001/contact</a>
                </div>
                
                <div class="task">
                    <strong>👤 Task 3: Dynamic User Page</strong><br>
                    <a href="http://localhost:3002/user/Aman">http://localhost:3002/user/Aman</a> - Dynamic route with parameter
                </div>
                
                <div class="task">
                    <strong>🎨 Task 4: HTML Page Renderer</strong><br>
                    This page - Full HTML page with CSS styling
                </div>
                
                <div class="info">
                    <strong>✨ How to run each task:</strong><br>
                    Task 1: <code>node task1-students.js</code> → Port 3000<br>
                    Task 2: <code>node task2-messages.js</code> → Port 3001<br>
                    Task 3: <code>node task3-dynamic-user.js</code> → Port 3002<br>
                    Task 4: <code>node task4-html-page.js</code> → Port 3003
                </div>
                
                <div class="footer">
                    <p>© 2026 Aman Tariq - Full Stack Programming Lab</p>
                    <p>All 4 tasks completed successfully ✅</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(3003, () => {
    console.log(`✅ Task 4 running at http://localhost:3003`);
});
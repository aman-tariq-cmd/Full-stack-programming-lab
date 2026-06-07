// Task 2: News Headlines API
// Lab 13 - Full Stack Programming

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* Routes */
const newsRoute = require("./routes/news");
app.use("/api/news", newsRoute);

/* Root / Documentation */
app.get("/", (req, res) => {
    res.json({
        message: "📰 News Headlines API - Lab Task 2",
        endpoints: {
            "GET /api/news/:countryCode": "Get top headlines for a country",
            examples: [
                "http://localhost:4001/api/news/pk   (Pakistan)",
                "http://localhost:4001/api/news/us   (United States)",
                "http://localhost:4001/api/news/gb   (United Kingdom)",
                "http://localhost:4001/api/news/in   (India)",
                "http://localhost:4001/api/news/ae   (UAE)"
            ]
        },
        response_fields: [
            "title       - Article headline",
            "source      - News source name",
            "url         - Link to full article",
            "published_at - Date and time published"
        ]
    });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`\n📰 News API running on http://localhost:${PORT}`);
    console.log(`📌 Try: http://localhost:${PORT}/api/news/pk\n`);
});

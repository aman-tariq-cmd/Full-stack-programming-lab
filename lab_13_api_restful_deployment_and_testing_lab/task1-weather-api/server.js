// Task 1: Weather Forecast API
// Lab 13 - Full Stack Programming

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* Routes */
const weatherRoute = require("./routes/weather");
app.use("/api/weather", weatherRoute);

/* Root / Documentation */
app.get("/", (req, res) => {
    res.json({
        message: "🌤️ Weather Forecast API - Lab Task 1",
        endpoints: {
            "GET /api/weather/:city": "Get weather for a city",
            examples: [
                "http://localhost:4000/api/weather/Lahore",
                "http://localhost:4000/api/weather/London",
                "http://localhost:4000/api/weather/New York",
                "http://localhost:4000/api/weather/Islamabad"
            ]
        }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`\n🌤️  Weather API running on http://localhost:${PORT}`);
    console.log(`📌 Try: http://localhost:${PORT}/api/weather/Lahore\n`);
});

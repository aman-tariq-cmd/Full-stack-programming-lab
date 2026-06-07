// routes/weather.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * GET /api/weather/:city
 * Returns current weather for the given city name.
 * Example: GET /api/weather/Lahore
 */
router.get("/:city", async (req, res) => {
    const { city } = req.params;

    // Validate city parameter
    if (!city || city.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "City name is required."
        });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY_HERE") {
        return res.status(500).json({
            success: false,
            message: "OpenWeather API key not configured. Please add your key in the .env file.",
            hint: "Get a free API key from https://openweathermap.org/api"
        });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        // Build structured response as required by the lab
        const weatherInfo = {
            success: true,
            city: data.name,
            country: data.sys.country,
            temperature: {
                current: `${data.main.temp}°C`,
                feels_like: `${data.main.feels_like}°C`,
                min: `${data.main.temp_min}°C`,
                max: `${data.main.temp_max}°C`
            },
            weather_condition: data.weather[0].main,
            description: data.weather[0].description,
            humidity: `${data.main.humidity}%`,
            wind_speed: `${data.wind.speed} m/s`,
            visibility: `${(data.visibility / 1000).toFixed(1)} km`,
            timestamp: new Date().toISOString()
        };

        res.json(weatherInfo);

    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                message: `City "${city}" not found. Please check the city name and try again.`
            });
        }
        if (error.response?.status === 401) {
            return res.status(401).json({
                success: false,
                message: "Invalid API key. Please check your OpenWeather API key."
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to fetch weather data.",
            error: error.message
        });
    }
});

module.exports = router;

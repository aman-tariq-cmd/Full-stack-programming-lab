// routes/news.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Valid country codes accepted by NewsAPI
const VALID_COUNTRIES = [
    "ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz",
    "de","eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp",
    "kr","lt","lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt",
    "ro","rs","ru","sa","se","sg","si","sk","th","tr","tw","ua","us",
    "ve","za","pk"
];

/**
 * GET /api/news/:countryCode
 * Returns top headlines for the given country code.
 * Example: GET /api/news/us  OR  GET /api/news/pk
 */
router.get("/:countryCode", async (req, res) => {
    const { countryCode } = req.params;
    const code = countryCode.toLowerCase().trim();

    // Validate country code
    if (!VALID_COUNTRIES.includes(code)) {
        return res.status(400).json({
            success: false,
            message: `Invalid country code: "${countryCode}".`,
            hint: "Use a 2-letter ISO country code, e.g., us, gb, pk, in, de",
            valid_examples: ["us", "gb", "pk", "in", "de", "ae", "au"]
        });
    }

    const API_KEY = process.env.NEWS_API_KEY;

    if (!API_KEY || API_KEY === "YOUR_NEWSAPI_KEY_HERE") {
        return res.status(500).json({
            success: false,
            message: "NewsAPI key not configured. Please add your key in the .env file.",
            hint: "Get a free API key from https://newsapi.org/"
        });
    }

    try {
        const url = `https://newsapi.org/v2/top-headlines?country=${code}&pageSize=10&apiKey=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== "ok") {
            return res.status(500).json({
                success: false,
                message: "NewsAPI returned an error.",
                details: data.message
            });
        }

        if (!data.articles || data.articles.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No news found for country code "${code}".`
            });
        }

        // Build structured response as required by the lab
        const articles = data.articles.slice(0, 10).map((article, index) => ({
            index: index + 1,
            title: article.title || "No title",
            source: article.source?.name || "Unknown Source",
            url: article.url || "#",
            published_at: article.publishedAt
                ? new Date(article.publishedAt).toLocaleString()
                : "Unknown date"
        }));

        res.json({
            success: true,
            country: code.toUpperCase(),
            total_results: data.totalResults,
            showing: articles.length,
            fetched_at: new Date().toISOString(),
            headlines: articles
        });

    } catch (error) {
        if (error.response?.status === 401) {
            return res.status(401).json({
                success: false,
                message: "Invalid NewsAPI key. Please check your API key."
            });
        }
        if (error.response?.status === 429) {
            return res.status(429).json({
                success: false,
                message: "API rate limit exceeded. Please wait and try again."
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to fetch news headlines.",
            error: error.message
        });
    }
});

module.exports = router;

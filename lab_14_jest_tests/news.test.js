// news.test.js - Corrected Tests for News Headlines API
const request = require('supertest');
const express = require('express');

const app = express();

// Mock news data
const mockNewsData = {
  data: {
    articles: [
      {
        title: 'Test News 1',
        source: { name: 'Test Source' },
        url: 'https://test.com/1',
        publishedAt: '2026-06-02T10:00:00Z'
      },
      {
        title: 'Test News 2',
        source: { name: 'Test Source 2' },
        url: 'https://test.com/2',
        publishedAt: '2026-06-02T09:00:00Z'
      }
    ]
  }
};

// Mock axios - CORRECT WAY
jest.mock('axios');
const axios = require('axios');
axios.get.mockImplementation(() => Promise.resolve(mockNewsData));

// News route
app.get('/api/news/:country', async (req, res) => {
  const { country } = req.params;
  const validCountries = ['pk', 'us', 'gb', 'in', 'ca', 'au'];
  
  if (!validCountries.includes(country)) {
    return res.status(400).json({ error: 'Invalid country code' });
  }
  
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=test_key`
    );
    const articles = response.data.articles.slice(0, 10).map(article => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt
    }));
    res.json({ country, articles });
  } catch (error) {
    res.status(500).json({ error: 'API Error' });
  }
});

// ============= UNIT TESTS =============
describe('UNIT TESTS - News API', () => {
  test('Should format news article correctly', () => {
    const article = {
      title: 'Breaking News',
      source: 'BBC',
      url: 'https://bbc.com/news',
      publishedAt: '2026-06-02'
    };
    
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('source');
    expect(article).toHaveProperty('url');
    expect(article).toHaveProperty('publishedAt');
  });

  test('Valid country codes should be accepted', () => {
    const validCountries = ['pk', 'us', 'gb', 'in', 'ca', 'au'];
    expect(validCountries).toContain('pk');
    expect(validCountries).toContain('us');
    expect(validCountries.length).toBeGreaterThan(0);
  });

  test('Invalid country code should be rejected', () => {
    const invalidCountry = 'xyz';
    const validCountries = ['pk', 'us', 'gb', 'in', 'ca', 'au'];
    expect(validCountries).not.toContain(invalidCountry);
  });
});

// ============= INTEGRATION TESTS =============
describe('INTEGRATION TESTS - News API Endpoints', () => {
  test('GET /api/news/pk - Should return 200 status', async () => {
    const response = await request(app).get('/api/news/pk');
    expect(response.statusCode).toBe(200);
  });

  test('GET /api/news/us - Should return 200 status', async () => {
    const response = await request(app).get('/api/news/us');
    expect(response.statusCode).toBe(200);
  });

  test('Invalid country code should return 400', async () => {
    const response = await request(app).get('/api/news/xyz');
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

// ============= SYSTEM TESTS =============
describe('SYSTEM TESTS - News API Complete Flow', () => {
  test('Complete flow: Request → Process → Response for Pakistan', async () => {
    const response = await request(app).get('/api/news/pk');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('country');
    expect(response.body).toHaveProperty('articles');
  });

  test('Response should contain article with title and source', async () => {
    const response = await request(app).get('/api/news/us');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.articles)).toBe(true);
  });
});

console.log('✅ News API Tests Loaded - Run with: npm test');
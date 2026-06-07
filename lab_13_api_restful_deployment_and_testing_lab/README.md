# Lab 13 — API RESTful Deployment and Testing
**Full Stack Programming | BSSE-VI**

---

## Project Structure

```
lab_13_api_restful_deployment_and_testing_lab/
├── mern-patient-api/
│   ├── backend/          ← Node.js + Express + MongoDB backend
│   └── frontend/         ← React.js frontend
├── task1-weather-api/    ← Task 1: Weather Forecast API
└── task2-news-api/       ← Task 2: News Headlines API
```

---

## Prerequisites (Install these first)

- [Node.js LTS](https://nodejs.org) — v18 or higher
- [MongoDB Compass](https://www.mongodb.com/products/compass) — run locally
- [Postman](https://www.postman.com/downloads/) — for API testing
- [VS Code](https://code.visualstudio.com)

---

## PART A — MERN Patient API (Tutorial)

### Step 1 — Start MongoDB
Open MongoDB Compass → Connect to: `mongodb://localhost:27017`

### Step 2 — Backend Setup
```bash
cd mern-patient-api/backend
npm install
npm run dev
```
✅ Server starts on http://localhost:5000

### Step 3 — Frontend Setup (open a NEW terminal)
```bash
cd mern-patient-api/frontend
npm install
npm start
```
✅ React app starts on http://localhost:3000

---

## POSTMAN TESTS (Patient API)

### 1. Register Admin
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{ "username": "admin", "password": "admin123", "role": "admin" }
```

### 2. Register Regular User
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{ "username": "john", "password": "pass123", "role": "user" }
```

### 3. Login (copy the token from response!)
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
```json
{ "username": "admin", "password": "admin123" }
```
**Copy the `accessToken` from the response.**

### 4. Add a Patient (need admin token)
- Method: POST
- URL: `http://localhost:5000/api/patients`
- Header: `Authorization: Bearer <your_token>`
- Body (JSON):
```json
{ "name": "Ali Raza", "age": 30, "disease": "Flu", "contact": "0300-1234567" }
```

### 5. Get All Patients
- Method: GET
- URL: `http://localhost:5000/api/patients`
- Header: `Authorization: Bearer <your_token>`

### 6. Get Users List (Admin only)
- Method: GET
- URL: `http://localhost:5000/api/auth/users`
- Header: `Authorization: Bearer <your_token>`

### 7. Update Patient
- Method: PUT
- URL: `http://localhost:5000/api/patients/<PATIENT_ID>`
- Header: `Authorization: Bearer <your_token>`
- Body (JSON):
```json
{ "disease": "Recovered", "age": 31 }
```

### 8. Delete Patient
- Method: DELETE
- URL: `http://localhost:5000/api/patients/<PATIENT_ID>`
- Header: `Authorization: Bearer <your_token>`

---

## PART B — Task 1: Weather Forecast API

### Get API Key
1. Go to https://openweathermap.org/api
2. Sign up for FREE account
3. Go to **API Keys** tab
4. Copy your API key
5. Open `task1-weather-api/.env`
6. Replace `YOUR_OPENWEATHER_API_KEY_HERE` with your key

### Run the Weather API
```bash
cd task1-weather-api
npm install
npm run dev
```
✅ Runs on http://localhost:4000

### Test in Postman or Browser
```
GET http://localhost:4000/api/weather/Lahore
GET http://localhost:4000/api/weather/London
GET http://localhost:4000/api/weather/Islamabad
GET http://localhost:4000/api/weather/New York
```

### Expected Response
```json
{
  "success": true,
  "city": "Lahore",
  "country": "PK",
  "temperature": {
    "current": "32°C",
    "feels_like": "35°C",
    "min": "30°C",
    "max": "34°C"
  },
  "weather_condition": "Clear",
  "description": "clear sky",
  "humidity": "45%",
  "wind_speed": "3.5 m/s",
  "visibility": "10.0 km",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

---

## PART C — Task 2: News Headlines API

### Get API Key
1. Go to https://newsapi.org/
2. Sign up for FREE account
3. Copy your API key from the dashboard
4. Open `task2-news-api/.env`
5. Replace `YOUR_NEWSAPI_KEY_HERE` with your key

### Run the News API
```bash
cd task2-news-api
npm install
npm run dev
```
✅ Runs on http://localhost:4001

### Test in Postman or Browser
```
GET http://localhost:4001/api/news/pk     (Pakistan)
GET http://localhost:4001/api/news/us     (United States)
GET http://localhost:4001/api/news/gb     (United Kingdom)
GET http://localhost:4001/api/news/ae     (UAE)
GET http://localhost:4001/api/news/in     (India)
```

### Expected Response
```json
{
  "success": true,
  "country": "PK",
  "total_results": 38,
  "showing": 10,
  "fetched_at": "2025-01-01T12:00:00.000Z",
  "headlines": [
    {
      "index": 1,
      "title": "Breaking: Major economic reforms announced",
      "source": "Dawn News",
      "url": "https://www.dawn.com/...",
      "published_at": "1/1/2025, 10:00:00 AM"
    }
  ]
}
```

---

## Screenshots Required for Submission

Take screenshots of:
1. ✅ Backend server running in terminal
2. ✅ MongoDB Compass showing `patientsDB` database
3. ✅ Postman: Register admin
4. ✅ Postman: Login and token received
5. ✅ Postman: Add patient (POST)
6. ✅ Postman: Get all patients (GET)
7. ✅ Postman: Update patient (PUT)
8. ✅ Postman: Delete patient (DELETE)
9. ✅ Browser: Login page at http://localhost:3000/login
10. ✅ Browser: Patients list at http://localhost:3000/patients
11. ✅ Task 1: Weather API response in Postman/browser
12. ✅ Task 2: News API response in Postman/browser

---

## Submission Checklist

- [ ] GitHub repo named `Full-Stack-Programming-Lab`
- [ ] Add collaborator: sharifali.aulecturer@gmail.com
- [ ] Folder inside repo: `lab_13_api_restful_deployment_and_testing_lab`
- [ ] Push all code to GitHub
- [ ] Word/PDF document with:
  - All screenshots above
  - GitHub repository URL
- [ ] Upload Word/PDF to GCR

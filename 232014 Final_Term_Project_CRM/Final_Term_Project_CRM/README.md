# CRM System — Customer Relationship Management

**Air University | Full Stack Programming Lab | BSSE VI-B | Spring 2026**

A full-stack Customer Relationship Management (CRM) system built with Next.js 14, Express.js, and MongoDB.

## Features

- JWT authentication (register/login)
- Customer CRUD with search, filter, and URL-persisted query params
- Dashboard with stats and recent customers
- Invoice generation with PDF download (jsPDF)
- Rule-based CRM chatbot assistant
- Toast notifications with notification panel
- Responsive dark-mode UI (375px – 1440px)

## Prerequisites

- Node.js 18+
- MongoDB (local installation or MongoDB Atlas URI)

## Setup

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd Final_Term_Project_CRM
```

### 2. Server setup

```bash
cd server
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, PORT
node seed.js           # seed admin user + 15 customers
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Client setup

```bash
cd client
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

Client runs at `http://localhost:3000`

## Default Credentials (after seeding)

| Email | Password |
|---|---|
| admin@crm.com | admin123 |

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port (default: 5000) |

### Client (`client/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL (e.g. `http://localhost:5000`) |

## Project Structure

```
Final_Term_Project_CRM/
├── client/          # Next.js 14 frontend
├── server/          # Express.js backend
└── README.md
```

## GitHub Repository

<!-- Replace with your actual repo URL before submission -->
`https://github.com/your-username/crm-project`

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| PDF | jsPDF |
| Notifications | react-hot-toast |
| Icons | Lucide React |

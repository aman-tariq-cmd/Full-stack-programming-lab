const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

/* Middleware */
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

/* Database Connection */
connectDB();

/* Routes */
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);

/* Health check */
app.get("/", (req, res) => {
    res.json({ message: "MERN Patient API is running!" });
});

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}/api/patients`);
});

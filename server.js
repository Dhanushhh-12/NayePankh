import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ensure Database Directories and Files Exist
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initializeDatabaseFile = (filename, defaultContent) => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2), 'utf-8');
  }
};

// Seed initial video lessons list
const initialLessons = [
  {
    id: 1,
    targetClass: "Class 1-5",
    title: "Introduction to Fractions (Visual Math)",
    duration: "12 mins",
    videoURL: "https://www.youtube.com/embed/n0FZhQ_GkKw",
    category: "Math"
  },
  {
    id: 2,
    targetClass: "Class 6-8",
    title: "English Grammar: Tenses and Active Voice",
    duration: "18 mins",
    videoURL: "https://www.youtube.com/embed/tupT1nQe9cQ",
    category: "English"
  },
  {
    id: 3,
    targetClass: "Class 1-5",
    title: "Our Solar System & Planets Explained",
    duration: "15 mins",
    videoURL: "https://www.youtube.com/embed/libKVRa01L8",
    category: "Science"
  },
  {
    id: 4,
    targetClass: "Class 6-10",
    title: "Basics of Computer Logic & Coding with Scratch",
    duration: "22 mins",
    videoURL: "https://www.youtube.com/embed/2eHn3sV-TzY",
    category: "Technology"
  }
];

// Initialize JSON Database Files
initializeDatabaseFile('lessons.json', initialLessons);
initializeDatabaseFile('donations.json', []);
initializeDatabaseFile('volunteers.json', []);

// Helpers to read/write JSON databases
const readDatabase = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error(`Error reading database file: ${filename}`, err);
    return [];
  }
};

const writeDatabase = (filename, content) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing database file: ${filename}`, err);
    return false;
  }
};

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Lessons Endpoints
app.get('/api/lessons', (req, res) => {
  const lessons = readDatabase('lessons.json');
  res.json(lessons);
});

app.post('/api/lessons', (req, res) => {
  const { title, duration, category, targetClass, videoURL } = req.body;
  if (!title || !duration || !category || !targetClass || !videoURL) {
    return res.status(400).json({ error: "Missing required lesson fields." });
  }

  const lessons = readDatabase('lessons.json');
  const newLesson = {
    id: lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1,
    title,
    duration,
    category,
    targetClass,
    videoURL
  };

  lessons.unshift(newLesson); // add to top
  writeDatabase('lessons.json', lessons);
  res.status(201).json(newLesson);
});

// 2. Volunteer Onboarding Endpoints
app.get('/api/volunteers', (req, res) => {
  const volunteers = readDatabase('volunteers.json');
  res.json(volunteers);
});

app.post('/api/volunteers', (req, res) => {
  const { name, email, phone, college, skills, cause, message } = req.body;
  if (!name || !email || !phone || !college || !skills || !cause) {
    return res.status(400).json({ error: "Missing required volunteer details." });
  }

  const volunteers = readDatabase('volunteers.json');
  const newVolunteer = {
    id: volunteers.length + 1,
    name,
    email,
    phone,
    college,
    skills,
    cause,
    message: message || "",
    timestamp: new Date().toISOString()
  };

  volunteers.push(newVolunteer);
  writeDatabase('volunteers.json', volunteers);
  res.status(201).json(newVolunteer);
});

// 3. Donation Log Endpoints (Transparency Ledger)
app.get('/api/donations', (req, res) => {
  const donations = readDatabase('donations.json');
  res.json(donations);
});

app.post('/api/donations', (req, res) => {
  const { name, email, pan, amount, cause, method } = req.body;
  if (!name || !email || !amount || !cause || !method) {
    return res.status(400).json({ error: "Missing required donation fields." });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid donation amount." });
  }

  const donations = readDatabase('donations.json');
  const transactionId = "TXN" + Date.now() + Math.floor(Math.random() * 1000);
  const newDonation = {
    id: donations.length + 1,
    transactionId,
    name,
    email,
    pan: pan || "N/A",
    amount: parsedAmount,
    cause,
    method,
    timestamp: new Date().toISOString()
  };

  donations.unshift(newDonation); // Add to top
  writeDatabase('donations.json', donations);
  res.status(201).json(newDonation);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[Server] NayePankh API running on http://localhost:${PORT}`);
});

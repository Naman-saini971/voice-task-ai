VoiceDesk — Voice-First AI Task Manager
<!-- TODO: once deployed, uncomment and fill in your live demo badge [![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-violet?style=for-the-badge)](https://your-app.vercel.app) -->

A MERN-stack task manager where the primary input method is natural language voice. Speak a command like "Remind me to submit the quarterly report by next Friday" and the app extracts structured task data automatically — no forms required.

Built for the Senpiper Engineering Assignment (Option A: Voice-First Task App).

🌐 Live Demo
<!-- TODO: fill in after deploying frontend (Vercel) and backend (Render) -->

Frontend: coming soon Backend API: coming soon

🎯 Demo Account
<!-- TODO: after deploying, seed a demo user and fill in the credentials below, or delete this section if you don't want a public demo login -->
Email:    _not set up yet_
Password: _not set up yet_

Login with the demo account to explore a pre-populated dashboard instantly.

✨ Features
Voice-to-task extraction — speak naturally, the app parses title, priority, and due date automatically using the browser's native Speech Recognition API
Full task lifecycle — create, complete, delete, and delay/postpone tasks, all controllable by voice or manually
Spoken feedback — the assistant confirms actions out loud via text-to-speech
Structured voice command summary — see exactly what was parsed (action, priority, due date) before confirming
JWT authentication — secure per-user task data
Analytics dashboard — real KPIs computed from your actual tasks:
Completion Ratio
Tasks Completed On Time
Pending Tasks
Delayed Tasks
Weekly Productivity Graph (real completions per day, last 7 days)
Modern dark-mode UI — built with Tailwind CSS and Framer Motion
🖼️ Screenshots
Landing Page

Show Image

Authentication
<div style="display: flex; gap: 10px;"> <img src="./screenshots/LoginPage.png" alt="Login Page" width="49%"> <img src="./screenshots/RegisterPage.png" alt="Register Page" width="49%"> </div>
Dashboard

Show Image

Task Management

Show Image

Voice Assistant

Show Image

Analytics

Show Image

Mobile View

Show Image

🛠️ Tech Stack
Layer	Technology
Frontend	React (Vite), Tailwind CSS, Framer Motion, lucide-react, react-hot-toast, react-router-dom, axios
Backend	Node.js, Express, MongoDB, Mongoose
Auth	JSON Web Tokens (JWT)
Voice	Browser-native Web Speech API (SpeechRecognition + SpeechSynthesisUtterance) — no external voice API required
Command Parsing	Custom rule-based natural language parser (client-side)
🗣️ Voice Commands You Can Try
Say this	What happens
"Create task submit assignment tomorrow high priority"	Creates a new task with the extracted title, due date, and priority
"Complete grocery run"	Marks the matching task as completed
"Delete old task"	Removes the matching task
"Delay grocery task to tomorrow"	Postpones the matching task, sets a new target date
"Remind me to call the dentist next Monday"	Creates a task due next Monday

The parser understands relative dates (today, tomorrow, next week), weekdays (Friday, next Monday), and priority keywords (urgent, high priority, low priority).

📂 Project Structure
voice-task-ai/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # UI components (dashboard, tasks, voice, common)
│       ├── pages/         # Route-level pages (Dashboard, Login, Register, Landing)
│       ├── context/       # Auth context
│       └── services/      # Axios API client
└── server/          # Express backend
    ├── controllers/  # Route handlers (auth, tasks)
    ├── models/       # Mongoose schemas (User, Task)
    ├── routes/       # Express routes
    └── middleware/   # JWT auth middleware

Full architecture notes are in Architecture.md.

🚀 Getting Started (Quick Setup — 5 minutes)
Prerequisites
Node.js v18+ (download here)
MongoDB connection string:
Option 1 (Recommended): Free cloud database at MongoDB Atlas (no installation needed)
Option 2: Local MongoDB installed on your machine
1. Clone the repository
powershell
git clone https://github.com/Naman-saini971/voice-task-ai.git
cd voice-task-ai
2. Set up the backend
powershell
cd server
npm install

Create a .env file inside server/ folder:

env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/voice-task-ai?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_random_string_here_min_32_chars
NODE_ENV=development

🔑 Important:

Replace MONGODB_URI with your actual MongoDB connection string
Generate a strong random string for JWT_SECRET (at least 32 characters)
Never commit your .env file

Start the backend:

powershell
npm run dev

✅ Success message: You should see MongoDB Connected and Server running on http://localhost:5000

3. Set up the frontend

Open a new PowerShell terminal (keep the backend running):

powershell
cd voice-task-ai\client
npm install

Create a .env file inside client/ folder:

env
VITE_API_URL=http://localhost:5000/api

Start the frontend:

powershell
npm run dev

✅ Success: App available at http://localhost:5173

4. Use the app
Open Chrome or Edge browser (required for voice features)
Navigate to http://localhost:5173
Register a new account
Login with your credentials
Click the microphone icon 🎤 in the Voice Assistant panel
Try saying: "Create task buy groceries tomorrow high priority"
Explore the Analytics tab to see real-time task metrics
🐛 Troubleshooting

Issue: "Cannot connect to MongoDB"

Check your MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
Verify your connection string is correct in server/.env

Issue: "Voice input not working"

Use Chrome or Edge browser (Firefox/Safari don't support Web Speech API)
Allow microphone permissions when prompted
Check that your microphone is working in system settings

Issue: "Port already in use"

Backend: Change PORT in server/.env to a different number (e.g., 5001)
Frontend: Vite usually auto-assigns a new port if 5173 is busy

Issue: "JWT authentication failed"

Clear browser localStorage and register a new account
Verify JWT_SECRET is set in server/.env
🎙️ Browser Support Note

Voice input relies on the Web Speech API, which has the best support in Chrome and Edge. Firefox and Safari have limited or no support for SpeechRecognition.

🧭 Design Decisions Under Ambiguity

The assignment intentionally left some requirements open to interpretation. Key decisions made, with reasoning, are documented in rules.md. Highlights:

Task status model: added a dedicated status field (active/completed/cancelled/delayed) alongside the existing completed boolean, rather than replacing it — this kept all existing functionality working while adding support for the full lifecycle the assignment requires.
Task matching for voice actions (complete/delete/delay): since users don't speak a task ID, matching is done via word-overlap against existing task titles. This is simple and effective for the assignment's scope, with a known limitation for tasks with very similar titles.
🗺️ Future Scope
Smarter task matching (fuzzy matching / ranking instead of strict word-overlap)
Distinguish "Cancelled" from "Deleted" as separate states
Configurable voice settings (speech rate, language)
Push/email reminders for upcoming due dates
Deploy to Vercel (frontend) + Render (backend) for a live demo link ← fill in "Live Demo" section above once done
📄 License

This project was built as part of a technical assessment and is not currently licensed for reuse.

👤 Author

Naman Saini — GitHub
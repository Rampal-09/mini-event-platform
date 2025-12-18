Mini Event Platform 🎉
A full-stack MERN application where users can sign up, log in, create events, join events, and manage participation.
🚀 Features

User Signup & Login
Create, Edit & Delete Events
Join & Leave Events
Responsive UI
Client-side Routing using HashRouter

🛠 Tech Stack
Frontend

React (Vite)
React Router v6
Axios
CSS Modules

Backend

Node.js
Express.js
MongoDB
JWT Authentication

📁 Project Structure
textmini-event-platform/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
├── vite.config.js
└── package.json
▶️ How to Run
Backend
Bashcd backend
npm install
npm start
(Server runs on http://localhost:5000 by default)
Frontend
Bashcd frontend
npm install
npm run dev
(Frontend runs on http://localhost:5173 by default)
🛣 Routes

/ → Signup Page
/login → Login Page
/events → Event List (Protected)
/create-event → Create Event (Protected)
/event/:id → Event Details & Edit (Protected)

✅ Final Result

Signup → Successfully creates account and redirects to Login
Login → Authenticates user with JWT and redirects to Event List
No more 404 issues (thanks to proper HashRouter configuration and protected routes)
Clean, responsive, and fully functional event management system

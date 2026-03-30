# Disaster Alert & Reporting System (DARS)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-blue?style=for-the-badge&logo=vercel)](https://your-app-url.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DARS is a high-availability disaster management platform that provides real-time global alerts and enables citizen-driven reporting. Built with the MERN stack and an "Offline-First" fallback mechanism.

### 🚀 Key Features
- **Real-time Global Alerts**: Live data from USGS, GDACS, and ReliefWeb.
- **Citizen Reporting**: Submit and track local incidents.
- **Volunteer Network**: Join and manage verified emergency volunteers.
- **Emergency Directory**: Quick access to critical local contacts.
- **High Availability**: Seamless fallback to local storage if database fails.

---

### 📂 Project Structure
```text
DisasterAlertProject/
├── backend/            # Express.js Server & local database
├── frontend/           # React.js (Vite) User Interface
├── docs/               # Detailed documentation & guides
│   ├── ARCHITECTURE.md # System design & fallback logic
│   ├── API_REFERENCE.md# API documentation
│   └── SETUP_GUIDE.md  # Installation & deployment
├── package.json        # Root workspace management
└── render.yaml         # Blueprint for automated deployment
```

### 🛠️ Quick Start
1. Ensure you have **Node.js** installed.
2. Run `npm run install-all` to setup dependencies.
3. Configure `backend/.env` with your `MONGO_URI`.
4. Run `npm start` to launch the application.

---

### 📖 Documentation Links
- [**Full Architecture & Design**](./docs/ARCHITECTURE.md)
- [**API Endpoints & Usage**](./docs/API_REFERENCE.md)
- [**Detailed Setup & Deployment**](./docs/SETUP_GUIDE.md)

---
*Created by [Suraj Kanojia](https://github.com/Surajkanojia103)*

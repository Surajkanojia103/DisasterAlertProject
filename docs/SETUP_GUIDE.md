# Setup & Installation Guide

## Getting Started

### 1. Prerequisites
- **Node.js**: v16.x or later.
- **npm**: v8.x or later.
- **MongoDB**: Atlas account or local installation.

### 2. Local Installation

```bash
# Clone the repository
git clone https://github.com/Surajkanojia103/DisasterAlertProject.git
cd DisasterAlertProject

# Install all dependencies (Root, Frontend, Backend)
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
PORT=5000
```

### 4. Running the Project

```bash
# Start both Frontend and Backend concurrently
npm start
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## Deployment Instructions

### Backend (Render)
1. Link your repo to Render.
2. Set Root Directory to `backend`.
3. Set Build Command to `npm install`.
4. Set Start Command to `npm start`.

### Frontend (Vercel)
1. Link your repo to Vercel.
2. Set Root Directory to `frontend`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Add Environment Variable: `VITE_API_URL`.

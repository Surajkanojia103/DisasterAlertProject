# Disaster Alert & Reporting System (DARS)

A comprehensive disaster management platform that provides real-time alerts from global agencies and enables citizen reporting of local incidents.

## Features

- 🌍 **Real-time Global Alerts** - Fetches live disaster data from USGS, GDACS, ReliefWeb, and Open-Meteo
- 📝 **Citizen Reporting** - Users can submit disaster reports with location, severity, and details
- 👨‍💼 **Admin Panel** - Verify or reject citizen reports
- 🔐 **User Authentication** - Secure login/signup system with JWT
- 📱 **Emergency Contacts** - Quick access to emergency services
- 🛡️ **Safety Instructions** - Comprehensive disaster preparedness guides
- 💾 **Offline Fallback** - Works even without database connection using localStorage

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Lucide React (Icons)
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- MongoDB (with Mongoose)
- JWT Authentication
- bcryptjs
- CORS

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (optional - app works with localStorage fallback)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/DisasterAlertProject.git
cd DisasterAlertProject
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Configure environment variables**

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb://127.0.0.1:27017/dars_db
JWT_SECRET=your_secret_key_here
PORT=5000
```

4. **Run the application**
```bash
npm start
```

This will start both the backend server (port 5000) and frontend dev server (port 5173).

## Usage

### Admin Login
- Email: `admin@123` or `admin@123.com`
- Password: `12345678`

### User Flow
1. Sign up for a new account
2. Submit disaster reports
3. Track report status in User Dashboard
4. View verified reports on the home page

### Admin Flow
1. Login with admin credentials
2. Review pending reports in Admin Panel
3. Verify or reject reports
4. Monitor system statistics

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Reports
- `GET /api/reports` - Get all reports (Admin)
- `GET /api/reports/my-reports` - Get user's reports
- `POST /api/reports` - Submit new report
- `PUT /api/reports/:id/status` - Update report status (Admin)

### Alerts
- `GET /api/alerts` - Fetch global disaster alerts

## Project Structure

```
DisasterAlertProject/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── reports.js
│   │   └── alerts.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── .gitignore
├── package.json
└── README.md
```

## Deployment

### Deploy to Render (Recommended)

This project is configured for easy deployment to Render.

#### Prerequisites
1. A [Render](https://render.com) account (free)
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available)
3. Your GitHub repository

#### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Render access
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dars_db`)

#### Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `dars-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any random secret key (e.g., `mySecretKey123`)
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
6. Click **"Create Web Service"**
7. **Copy your backend URL** (e.g., `https://dars-backend.onrender.com`)

#### Step 3: Deploy Frontend to Render

1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name:** `dars-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://dars-backend.onrender.com/api` (your backend URL + /api)
5. Click **"Create Static Site"**

#### Step 4: Access Your Live Application

Your app will be live at: `https://dars-frontend.onrender.com`

**Note:** Free tier services may spin down after inactivity. First request might take 30-60 seconds.

### Alternative: Deploy Using render.yaml

This repo includes a `render.yaml` file for automated deployment:

1. Go to Render Dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect `render.yaml` and deploy both services
5. Add environment variables in the Render dashboard



## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- USGS for earthquake data
- GDACS for global disaster alerts
- ReliefWeb for humanitarian information
- Open-Meteo for weather data

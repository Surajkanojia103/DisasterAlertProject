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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- USGS for earthquake data
- GDACS for global disaster alerts
- ReliefWeb for humanitarian information
- Open-Meteo for weather data

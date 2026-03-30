import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/main/Home';
import Alerts from './pages/main/Alerts';
import Report from './pages/main/Report';
import Emergency from './pages/main/Emergency';
import Safety from './pages/main/Safety';
import Shelters from './pages/main/Shelters';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminPanel from './pages/admin/AdminPanel';
import UserPanel from './pages/dashboard/UserPanel';
import ReportDetails from './pages/dashboard/ReportDetails';
import Settings from './pages/dashboard/Settings';
import Volunteer from './pages/dashboard/Volunteer';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow max-w-screen-2xl mx-auto w-full px-6 py-8">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/alerts" element={<Alerts />} />
                            <Route path="/report" element={<Report />} />
                            <Route path="/emergency" element={<Emergency />} />
                            <Route path="/safety" element={<Safety />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/admin" element={<AdminPanel />} />
                            <Route path="/user-panel" element={<UserPanel />} />
                            <Route path="/report-details/:id" element={<ReportDetails />} />
                            <Route path="/shelters" element={<Shelters />} />
                            <Route path="/volunteer" element={<Volunteer />} />
                        </Routes>
                    </main>
                    <footer className="bg-slate-800 text-white py-4 text-center">
                        <p>&copy; 2026 Disaster Alert & Reporting System (DARS)</p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

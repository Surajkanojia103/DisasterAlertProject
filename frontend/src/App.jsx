import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Alerts from './pages/Alerts';
import Report from './pages/Report';
import Emergency from './pages/Emergency';
import Safety from './pages/Safety';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import ReportDetails from './pages/ReportDetails';
import Settings from './pages/Settings';
import Shelters from './pages/Shelters';
import Volunteer from './pages/Volunteer';

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

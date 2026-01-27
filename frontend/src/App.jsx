import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Report from './pages/Report';
import Emergency from './pages/Emergency';
import Safety from './pages/Safety';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import ReportDetails from './pages/ReportDetails';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-slate-50">
                    <Navbar />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/alerts" element={<Home />} />
                            <Route path="/report" element={<Report />} />
                            <Route path="/emergency" element={<Emergency />} />
                            <Route path="/safety" element={<Safety />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/admin" element={<AdminPanel />} />
                            <Route path="/user-panel" element={<UserPanel />} />
                            <Route path="/report-details/:id" element={<ReportDetails />} />
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

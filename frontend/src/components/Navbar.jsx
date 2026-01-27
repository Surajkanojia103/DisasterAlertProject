import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, FileText, Phone, Shield, LogIn, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to={user ? "/alerts" : "/"} className="flex items-center space-x-2">
                        <div className="bg-red-50 p-2 rounded-full text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-2xl font-bold text-red-500">DARS</span>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        {user && (
                            <>
                                <Link to="/alerts" className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                                    <AlertTriangle size={18} />
                                    <span>Alerts</span>
                                </Link>
                                <Link to="/report" className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                                    <FileText size={18} />
                                    <span>Report</span>
                                </Link>
                                <Link to="/emergency" className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                                    <Phone size={18} />
                                    <span>Emergency</span>
                                </Link>
                                <Link to="/safety" className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                                    <Shield size={18} />
                                    <span>Safety</span>
                                </Link>
                                <div className="border-l border-slate-700 h-6 mx-2"></div>
                            </>
                        )}

                        {user ? (
                            <div className="flex items-center space-x-4">
                                {user.role === 'admin' ? (
                                    <Link to="/admin" className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300">
                                        <Shield size={18} />
                                        <span>Admin Panel</span>
                                    </Link>
                                ) : (
                                    <Link to="/user-panel" className="flex items-center space-x-1 text-blue-400 hover:text-blue-300">
                                        <User size={18} />
                                        <span>My Dashboard</span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

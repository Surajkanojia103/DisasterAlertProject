import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AlertTriangle, FileText, Phone, Shield, LogIn, User, LogOut, Settings, Home, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm whitespace-nowrap ${isActive
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to={user ? "/alerts" : "/"} className="flex items-center gap-3 group shrink-0">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-[0_0_12px_rgba(79,70,229,0.5)] group-hover:scale-105 transition-all duration-200">
                            <AlertTriangle size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">DARS</span>
                    </Link>

                    {user && (
                        <div className="hidden md:flex items-center bg-[#0d1117] px-2 py-1.5 rounded-full border border-slate-800/60 shadow-inner gap-0.5">
                            <NavLink to="/alerts" className={navLinkClasses}>
                                <AlertTriangle size={15} strokeWidth={2.5} />
                                <span>Global Alerts</span>
                            </NavLink>
                            <NavLink to="/report" className={navLinkClasses}>
                                <FileText size={15} strokeWidth={2.5} />
                                <span>Report Incident</span>
                            </NavLink>
                            <NavLink to="/emergency" className={navLinkClasses}>
                                <Phone size={15} strokeWidth={2.5} />
                                <span>SOS</span>
                            </NavLink>
                            <NavLink to="/shelters" className={navLinkClasses}>
                                <Home size={15} strokeWidth={2.5} />
                                <span>Shelters</span>
                            </NavLink>
                            {user.role !== 'admin' && (
                                <NavLink to="/volunteer" className={navLinkClasses}>
                                    <Heart size={15} strokeWidth={2.5} />
                                    <span>Volunteer</span>
                                </NavLink>
                            )}
                            <NavLink to="/safety" className={navLinkClasses}>
                                <Shield size={15} strokeWidth={2.5} />
                                <span>Safety</span>
                            </NavLink>
                            <NavLink to="/settings" className={navLinkClasses}>
                                <Settings size={15} strokeWidth={2.5} />
                                <span>Settings</span>
                            </NavLink>
                        </div>
                    )}

                    {/* Right Side */}
                    <div className="flex items-center gap-3 shrink-0">
                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-bold px-4 py-2 rounded-xl border border-yellow-500/40 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all text-sm"
                                    >
                                        <Shield size={15} />
                                        <span>ADMIN</span>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/user-panel"
                                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold px-4 py-2 rounded-xl border border-indigo-500/40 bg-indigo-400/10 hover:bg-indigo-400/20 transition-all text-sm"
                                    >
                                        <User size={15} />
                                        <span>PROFILE</span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 text-sm"
                            >
                                <LogIn size={16} />
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

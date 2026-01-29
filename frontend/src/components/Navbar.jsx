import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AlertTriangle, FileText, Phone, Shield, LogIn, User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClasses = ({ isActive }) =>
        `flex items-center space-x-2.5 px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm tracking-wide ${isActive
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transform scale-105'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    <Link to={user ? "/alerts" : "/"} className="flex items-center space-x-4 group">
                        <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <AlertTriangle size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-white leading-none">DARS</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center bg-[#0f172a] p-2 rounded-[2rem] border border-slate-800/50 shadow-inner gap-1">
                        {user && (
                            <>
                                <NavLink to="/alerts" className={navLinkClasses}>
                                    <AlertTriangle size={18} strokeWidth={2.5} />
                                    <span>Alerts</span>
                                </NavLink>
                                <NavLink to="/report" className={navLinkClasses}>
                                    <FileText size={18} strokeWidth={2.5} />
                                    <span>Report</span>
                                </NavLink>
                                <NavLink to="/emergency" className={navLinkClasses}>
                                    <Phone size={18} strokeWidth={2.5} />
                                    <span>Emergency</span>
                                </NavLink>
                                <NavLink to="/safety" className={navLinkClasses}>
                                    <Shield size={18} strokeWidth={2.5} />
                                    <span>Safety</span>
                                </NavLink>
                                <NavLink to="/settings" className={navLinkClasses}>
                                    <Settings size={18} strokeWidth={2.5} />
                                    <span>Settings</span>
                                </NavLink>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {user.role === 'admin' ? (
                                    <Link to="/admin" className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 font-bold px-4 py-2 bg-yellow-400/10 rounded-xl border border-yellow-400/20 transition-all">
                                        <Shield size={16} />
                                        <span>ADMIN</span>
                                    </Link>
                                ) : (
                                    <Link to="/user-panel" className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 font-bold px-4 py-2 bg-indigo-400/10 rounded-xl border border-indigo-400/20 transition-all">
                                        <User size={16} />
                                        <span>PROFILE</span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5">
                                <LogIn size={18} />
                                <span>Access System</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

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
        `flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-xs uppercase tracking-widest whitespace-nowrap ${isActive
            ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to={user ? "/alerts" : "/"} className="flex items-center gap-3 group shrink-0">
                        <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-all duration-300">
                            <AlertTriangle size={22} strokeWidth={3} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white uppercase">DARS</span>
                    </Link>

                    {user && (
                        <div className="hidden lg:flex items-center bg-slate-900/40 px-2 py-1.5 rounded-full border border-slate-800/60 shadow-inner gap-1 backdrop-blur-md">
                            <NavLink to="/alerts" className={navLinkClasses}>
                                <div className="p-1 rounded bg-blue-500/10"><AlertTriangle size={14} /></div>
                                <span>Alerts</span>
                            </NavLink>
                            <NavLink to="/report" className={navLinkClasses}>
                                <div className="p-1 rounded bg-slate-500/10"><FileText size={14} /></div>
                                <span>Report</span>
                            </NavLink>
                            <NavLink to="/emergency" className={navLinkClasses}>
                                <div className="p-1 rounded bg-slate-500/10"><Phone size={14} /></div>
                                <span>Emergency</span>
                            </NavLink>
                            <NavLink to="/safety" className={navLinkClasses}>
                                <div className="p-1 rounded bg-slate-500/10"><Shield size={14} /></div>
                                <span>Safety</span>
                            </NavLink>
                            <NavLink to="/settings" className={navLinkClasses}>
                                <div className="p-1 rounded bg-slate-500/10"><Settings size={14} /></div>
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
                                        className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-black px-5 py-2.5 rounded-xl border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                                    >
                                        <Shield size={14} />
                                        <span>ADMIN</span>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/user-panel"
                                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black px-5 py-2.5 rounded-xl border border-blue-500/30 bg-blue-400/10 hover:bg-blue-400/20 transition-all text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                                    >
                                        <User size={14} />
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

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AlertTriangle, FileText, Phone, Shield, LogIn, User, LogOut, Settings, Home, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [user, logout] = [useAuth().user, useAuth().logout];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest ${isActive
            ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`;

    const mobileNavLinkClasses = ({ isActive }) =>
        `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] w-full ${isActive
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]'
            : 'text-slate-500 hover:text-white hover:bg-slate-900'
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
                            <NavLink to="/shelters" className={navLinkClasses}>
                                <div className="p-1 rounded bg-slate-500/10"><Home size={14} /></div>
                                <span>Shelters</span>
                            </NavLink>
                            {user.role !== 'admin' && (
                                <NavLink to="/volunteer" className={navLinkClasses}>
                                    <div className="p-1 rounded bg-rose-500/10"><Heart size={14} className="text-rose-500" /></div>
                                    <span>Volunteer</span>
                                </NavLink>
                            )}
                            <NavLink to="/settings" className={navLinkClasses}>
                                <div className="p-1 rounded bg-slate-500/10"><Settings size={14} /></div>
                                <span>Settings</span>
                            </NavLink>
                        </div>
                    )}

                    {/* Right Side */}
                    <div className="flex items-center gap-2 shrink-0">
                        {user ? (
                            <>
                                <div className="hidden sm:flex items-center gap-3">
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
                                </div>

                                {/* Mobile Menu Toggle */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="lg:hidden p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                                >
                                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 text-sm"
                            >
                                <LogIn size={16} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {user && isMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#020617]/95 backdrop-blur-2xl animate-fade-in border-t border-slate-800">
                    <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
                        <div className="grid grid-cols-1 gap-2">
                            <NavLink to="/alerts" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                <div className="p-2 rounded-xl bg-blue-500/10"><AlertTriangle size={18} /></div>
                                <span>Tactical Alerts</span>
                            </NavLink>
                            <NavLink to="/report" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                <div className="p-2 rounded-xl bg-slate-800"><FileText size={18} /></div>
                                <span>Incident Report</span>
                            </NavLink>
                            <NavLink to="/emergency" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                <div className="p-2 rounded-xl bg-slate-800"><Phone size={18} /></div>
                                <span>Emergency Ops</span>
                            </NavLink>
                            <NavLink to="/safety" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                <div className="p-2 rounded-xl bg-slate-800"><Shield size={18} /></div>
                                <span>Safety Protocols</span>
                            </NavLink>
                            <NavLink to="/shelters" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                <div className="p-2 rounded-xl bg-slate-800"><Home size={18} /></div>
                                <span>Secure Shelters</span>
                            </NavLink>
                            {user.role !== 'admin' && (
                                <NavLink to="/volunteer" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500"><Heart size={18} /></div>
                                    <span>Volunteer Enlistment</span>
                                </NavLink>
                            )}
                            <NavLink to="/settings" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                                <div className="p-2 rounded-xl bg-slate-800"><Settings size={18} /></div>
                                <span>System Settings</span>
                            </NavLink>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-800/60 pb-10">
                            {user.role === 'admin' ? (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-[2rem] text-yellow-500 font-black uppercase tracking-[0.2em] italic text-xs mb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <Shield size={20} />
                                        <span>Command Center</span>
                                    </div>
                                    <X size={14} className="rotate-45" />
                                </Link>
                            ) : (
                                <Link
                                    to="/user-panel"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between p-6 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] text-blue-400 font-black uppercase tracking-[0.2em] italic text-xs mb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <User size={20} />
                                        <span>User Profile</span>
                                    </div>
                                    <X size={14} className="rotate-45" />
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-3 p-5 bg-red-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-red-900/40"
                            >
                                <LogOut size={18} />
                                <span>Terminate Session</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

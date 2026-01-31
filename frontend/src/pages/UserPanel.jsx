import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, MapPin, PlusCircle, User } from 'lucide-react';

const UserPanel = () => {
    const { user, login } = useAuth(); // Assuming login updates the user state
    const navigate = useNavigate();
    const [myReports, setMyReports] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        gender: user?.gender || '',
        contact: user?.contact || ''
    });
    const [stats, setStats] = useState({
        total: 0,
        verified: 0,
        pending: 0
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        setProfileData({
            name: user.name || '',
            gender: user.gender || 'Prefer not to say',
            contact: user.contact || ''
        });

        const fetchReports = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const res = await axios.get(`${API_URL}/reports/my-reports`, config);
                setMyReports(res.data);

                const newStats = res.data.reduce((acc, report) => {
                    acc.total++;
                    if (report.status === 'Verified') acc.verified++;
                    if (report.status === 'Pending') acc.pending++;
                    return acc;
                }, { total: 0, verified: 0, pending: 0 });
                setStats(newStats);
            } catch (err) {
                console.error("Error fetching reports:", err);
                // Fallback to local storage
                const storedReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
                const userReports = storedReports.filter(r => r.userId === user.id);
                setMyReports(userReports);

                const newStats = userReports.reduce((acc, report) => {
                    acc.total++;
                    if (report.status === 'Verified') acc.verified++;
                    if (report.status === 'Pending') acc.pending++;
                    return acc;
                }, { total: 0, verified: 0, pending: 0 });
                setStats(newStats);
            }
        };

        fetchReports();
    }, [user, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await axios.put(`${API_URL}/auth/profile`, profileData, config);

            // We need to update the user context. 
            // Since we don't have a direct 'updateUser' method exposed in common AuthContext patterns,
            // we might need to reload or hack it. 
            // Ideally, AuthContext exposes a function to update user data.
            // For now, let's alert and update local state representation if we can't update context easily
            // or if 'login' creates a session we can re-use it.
            // Actually, usually user data is stored in localStorage too.

            // Update the correct localStorage key that AuthContext uses
            localStorage.setItem('dars_user', JSON.stringify(res.data.user));
            // Trigger a reload or if AuthContext listens to storage (unlikely), 
            // best way is to reload page to refresh context if no method exists.
            window.location.reload();

            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">My Dashboard</h1>
                    <p className="text-slate-400 mt-1">Welcome back, <span className="font-bold text-white">{user?.name}</span>. Manage your reports and track their status.</p>
                </div>
                <Link
                    to="/report"
                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-500 transition-all shadow-lg hover:shadow-red-900/30 font-bold"
                >
                    <PlusCircle size={20} />
                    <span>Report New Incident</span>
                </Link>
            </div>

            {/* User Stats & Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20">
                        <User size={40} />
                    </div>

                    {!isEditing ? (
                        <div className="text-center w-full">
                            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                            <p className="text-slate-500 text-sm font-medium">{user?.email}</p>
                            {user?.contact && <p className="text-slate-400 text-sm mt-1">{user.contact}</p>}
                            {user?.gender && <p className="text-slate-400 text-xs uppercase tracking-wider mt-1">{user.gender}</p>}

                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleProfileUpdate} className="w-full space-y-3 mt-2">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Name</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Gender</label>
                                <select
                                    value={profileData.gender}
                                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                                >
                                    <option value="Prefer not to say">Prefer not to say</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500">Contact</label>
                                <input
                                    type="text"
                                    value={profileData.contact}
                                    onChange={(e) => setProfileData({ ...profileData, contact: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button type="submit" className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-800 text-slate-400 text-xs font-bold py-2 rounded-lg">Cancel</button>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 w-full pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-black text-white">{stats.total}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Reports</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-green-500">{stats.verified}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Verified</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-slate-900/50 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">My Recent Reports</h2>
                        <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{myReports.length} Total</span>
                    </div>

                    <div className="divide-y divide-slate-800">
                        {myReports.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-500 mb-4">You haven't submitted any reports yet.</p>
                                <Link to="/report" className="text-red-500 font-bold hover:text-red-400 transition-colors">Submit your first report</Link>
                            </div>
                        ) : (
                            myReports.map((report) => (
                                <div key={report._id || report.id} className="p-6 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${report.status === 'Verified' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    report.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                    }`}>
                                                    {report.status}
                                                </span>
                                                <span className="text-slate-500 text-xs flex items-center font-bold uppercase tracking-wider">
                                                    <Clock size={12} className="mr-1" />
                                                    {new Date(report.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-200">{report.disasterType}</h3>
                                            <div className="flex items-center text-slate-400 text-sm font-medium">
                                                <MapPin size={14} className="mr-1 text-red-500" />
                                                {report.location}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Link
                                                to={`/report-details/${report._id}`}
                                                className="text-xs font-black text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;

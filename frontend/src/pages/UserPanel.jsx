import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, MapPin, PlusCircle, User } from 'lucide-react';

const UserPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [myReports, setMyReports] = useState([]);
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
                <div className="lg:col-span-1 bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20">
                        <User size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                    <p className="text-slate-500 text-sm font-medium">{user?.email}</p>
                    <div className="mt-6 w-full pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
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

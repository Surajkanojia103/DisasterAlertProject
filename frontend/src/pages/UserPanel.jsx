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
                const res = await axios.get('http://localhost:5000/api/reports/my-reports', config);
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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">My Dashboard</h1>
                    <p className="text-slate-600 mt-1">Welcome back, <span className="font-semibold text-slate-900">{user?.name}</span>. Manage your reports and track their status.</p>
                </div>
                <Link
                    to="/report"
                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 font-bold"
                >
                    <PlusCircle size={20} />
                    <span>Report New Incident</span>
                </Link>
            </div>

            {/* User Stats & Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <User size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
                    <p className="text-slate-500 text-sm">{user?.email}</p>
                    <div className="mt-6 w-full pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                            <p className="text-xs text-slate-500 font-medium uppercase">Reports</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
                            <p className="text-xs text-slate-500 font-medium uppercase">Verified</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">My Recent Reports</h2>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{myReports.length} Total</span>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {myReports.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-400 mb-4">You haven't submitted any reports yet.</p>
                                <Link to="/report" className="text-red-600 font-semibold hover:underline">Submit your first report</Link>
                            </div>
                        ) : (
                            myReports.map((report) => (
                                <div key={report._id || report.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${report.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                                    report.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {report.status}
                                                </span>
                                                <span className="text-slate-400 text-xs flex items-center">
                                                    <Clock size={12} className="mr-1" />
                                                    {new Date(report.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800">{report.disasterType}</h3>
                                            <div className="flex items-center text-slate-500 text-sm">
                                                <MapPin size={14} className="mr-1 text-red-500" />
                                                {report.location}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Link
                                                to={`/report-details/${report._id}`}
                                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
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

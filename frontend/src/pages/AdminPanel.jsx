import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, MapPin, Shield, FileText } from 'lucide-react';

const AdminPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        verified: 0,
        rejected: 0
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
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
                const res = await axios.get(`${API_URL}/reports`, config); // Assuming this endpoint returns all reports for admin
                setReports(res.data);

                const newStats = res.data.reduce((acc, report) => {
                    acc.total++;
                    acc[report.status.toLowerCase()]++;
                    return acc;
                }, { total: 0, pending: 0, verified: 0, rejected: 0 });

                setStats(newStats);
            } catch (err) {
                console.error("Error fetching admin reports:", err);
                // Fallback to local storage
                const storedReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
                setReports(storedReports);

                const newStats = storedReports.reduce((acc, report) => {
                    acc.total++;
                    acc[report.status.toLowerCase()]++;
                    return acc;
                }, { total: 0, pending: 0, verified: 0, rejected: 0 });
                setStats(newStats);
            }
        };

        fetchReports();
    }, [user, navigate]);

    const updateStatus = async (reportId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await axios.put(`${API_URL}/reports/${reportId}/status`, { status: newStatus }, config);

            // Update local state
            const updatedReports = reports.map(report =>
                report._id === reportId ? { ...report, status: newStatus } : report
            );
            setReports(updatedReports);

            // Update stats
            const newStats = updatedReports.reduce((acc, report) => {
                acc.total++;
                acc[report.status.toLowerCase()]++;
                return acc;
            }, { total: 0, pending: 0, verified: 0, rejected: 0 });
            setStats(newStats);

        } catch (err) {
            console.error("Error updating status:", err);
            // Fallback for demo: Update local state and local storage
            const updatedReports = reports.map(report =>
                report._id === reportId ? { ...report, status: newStatus } : report
            );
            setReports(updatedReports);

            // Update local storage
            const storedReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
            const updatedStoredReports = storedReports.map(report =>
                report._id === reportId ? { ...report, status: newStatus } : report
            );
            localStorage.setItem('dars_reports', JSON.stringify(updatedStoredReports));

            // Update stats
            const newStats = updatedReports.reduce((acc, report) => {
                acc.total++;
                acc[report.status.toLowerCase()]++;
                return acc;
            }, { total: 0, pending: 0, verified: 0, rejected: 0 });
            setStats(newStats);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.disasterType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || report.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-400">Overview of all disaster reports and system status.</p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-lg shadow-sm border border-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20">
                        <Shield size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Logged in as</p>
                        <p className="text-slate-200 font-bold text-sm">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Reports</p>
                    <p className="text-3xl font-black text-white mt-1">{stats.total}</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm">
                    <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Pending Review</p>
                    <p className="text-3xl font-black text-white mt-1">{stats.pending}</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm">
                    <p className="text-green-500 text-xs font-bold uppercase tracking-wider">Verified Reports</p>
                    <p className="text-3xl font-black text-white mt-1">{stats.verified}</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-800 backdrop-blur-sm">
                    <p className="text-red-500 text-xs font-bold uppercase tracking-wider">Rejected Reports</p>
                    <p className="text-3xl font-black text-white mt-1">{stats.rejected}</p>
                </div>
            </div>

            <div className="bg-slate-900/50 rounded-2xl shadow-xl overflow-hidden border border-slate-800 backdrop-blur-sm">
                <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold text-white">Incident Reports</h2>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64 text-white placeholder:text-slate-600"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Verified">Verified</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-slate-800">
                    {filteredReports.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                                <FileText size={32} />
                            </div>
                            <p className="text-slate-500">No reports found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredReports.map((report) => (
                            <div key={report._id || report.id} className="p-6 hover:bg-slate-800/50 transition-colors">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                                    <div className="flex-grow space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${report.status === 'Verified' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                report.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {report.status}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${report.severity === 'Critical' ? 'bg-red-600 text-white border-red-600' :
                                                report.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                    report.severity === 'Medium' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                        'bg-slate-800 text-slate-400 border-slate-700'
                                                }`}>
                                                {report.severity}
                                            </span>
                                            <span className="text-slate-500 text-xs flex items-center font-bold uppercase tracking-wider">
                                                <Clock size={12} className="mr-1" />
                                                {new Date(report.timestamp).toLocaleString()}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-white flex items-center">
                                                {report.disasterType}
                                                <span className="mx-2 text-slate-700">•</span>
                                                <span className="text-slate-400 font-medium flex items-center text-sm">
                                                    <MapPin size={14} className="mr-1 text-red-500" />
                                                    {report.location}
                                                </span>
                                            </h3>
                                            <p className="text-slate-400 mt-1 leading-relaxed text-sm">{report.description}</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/30 p-3 rounded-xl border border-slate-800">
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Reported By</p>
                                                <p className="text-sm text-slate-300 font-medium">{report.userName || 'Anonymous'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Affected</p>
                                                <p className="text-sm text-slate-300 font-medium">{report.affected || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Needs</p>
                                                <p className="text-sm text-slate-300 font-medium">{report.needs || 'None'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {report.status === 'Pending' && (
                                        <div className="flex lg:flex-col gap-2 shrink-0">
                                            <button
                                                onClick={() => updateStatus(report._id, 'Verified')}
                                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all shadow-sm hover:shadow-green-900/20 font-bold text-sm uppercase tracking-wider"
                                            >
                                                <CheckCircle size={16} />
                                                <span>Verify</span>
                                            </button>
                                            <button
                                                onClick={() => updateStatus(report._id, 'Rejected')}
                                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-slate-800 text-red-400 border border-slate-700 rounded-lg hover:bg-red-900/20 hover:border-red-500/30 transition-all font-bold text-sm uppercase tracking-wider"
                                            >
                                                <XCircle size={16} />
                                                <span>Reject</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

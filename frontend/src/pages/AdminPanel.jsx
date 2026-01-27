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
                const res = await axios.get('http://localhost:5000/api/reports', config); // Assuming this endpoint returns all reports for admin
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

            const res = await axios.put(`http://localhost:5000/api/reports/${reportId}/status`, { status: newStatus }, config);

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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                    <p className="text-slate-600">Overview of all disaster reports and system status.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <Shield size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Logged in as</p>
                        <p className="text-slate-800 font-semibold">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Total Reports</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-yellow-600 text-sm font-medium">Pending Review</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{stats.pending}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-green-600 text-sm font-medium">Verified Reports</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{stats.verified}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-red-600 text-sm font-medium">Rejected Reports</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{stats.rejected}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-semibold text-slate-800">Incident Reports</h2>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Verified">Verified</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {filteredReports.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <FileText size={32} />
                            </div>
                            <p className="text-slate-500">No reports found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredReports.map((report) => (
                            <div key={report._id || report.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                                    <div className="flex-grow space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${report.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                                report.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {report.status}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${report.severity === 'Critical' ? 'bg-red-600 text-white' :
                                                report.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                                                    report.severity === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                {report.severity}
                                            </span>
                                            <span className="text-slate-400 text-sm flex items-center">
                                                <Clock size={14} className="mr-1" />
                                                {new Date(report.timestamp).toLocaleString()}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 flex items-center">
                                                {report.disasterType}
                                                <span className="mx-2 text-slate-300">•</span>
                                                <span className="text-slate-600 font-medium flex items-center text-base">
                                                    <MapPin size={16} className="mr-1 text-red-500" />
                                                    {report.location}
                                                </span>
                                            </h3>
                                            <p className="text-slate-600 mt-1 leading-relaxed">{report.description}</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <div>
                                                <p className="text-xs text-slate-500 font-semibold uppercase">Reported By</p>
                                                <p className="text-sm text-slate-700 font-medium">{report.userName || 'Anonymous'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-semibold uppercase">Affected</p>
                                                <p className="text-sm text-slate-700 font-medium">{report.affected || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-semibold uppercase">Needs</p>
                                                <p className="text-sm text-slate-700 font-medium">{report.needs || 'None'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {report.status === 'Pending' && (
                                        <div className="flex lg:flex-col gap-2 shrink-0">
                                            <button
                                                onClick={() => updateStatus(report._id, 'Verified')}
                                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow-md font-semibold"
                                            >
                                                <CheckCircle size={18} />
                                                <span>Verify</span>
                                            </button>
                                            <button
                                                onClick={() => updateStatus(report._id, 'Rejected')}
                                                className="flex items-center justify-center space-x-2 px-6 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all shadow-sm hover:shadow-md font-semibold"
                                            >
                                                <XCircle size={18} />
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

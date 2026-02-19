import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, MapPin, Shield, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [volunteers, setVolunteers] = useState([]);
    const [activeTab, setActiveTab] = useState('reports'); // reports, volunteers

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(20);

    const fetchVolunteers = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await axios.get(`${API_URL}/auth/users`, config);
            // Filter volunteers or those requesting to be one
            const volList = res.data.filter(u => u.isVolunteer || u.volunteerStatus === 'pending');
            setVolunteers(volList);
        } catch (err) {
            console.error("Error fetching volunteers:", err);
            // Fallback
            const storedUsers = JSON.parse(localStorage.getItem('dars_users') || '[]');
            const volList = storedUsers.filter(u => u.isVolunteer || u.volunteerStatus === 'pending');
            setVolunteers(volList);
        }
    };

    const updateVolunteerStatus = async (userId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

            await axios.put(`${API_URL}/auth/admin/volunteer-status/${userId}`, { status: newStatus }, config);

            // Refresh list
            fetchVolunteers();
        } catch (err) {
            console.error("Error updating volunteer status:", err);
            // Fallback
            const storedUsers = JSON.parse(localStorage.getItem('dars_users') || '[]');
            const updatedUsers = storedUsers.map(u => {
                if (u.id === userId || u._id === userId) {
                    return { ...u, volunteerStatus: newStatus, isVolunteer: newStatus === 'approved' };
                }
                return u;
            });
            localStorage.setItem('dars_users', JSON.stringify(updatedUsers));
            // Trigger manual fetch or update state directly
            setVolunteers(updatedUsers.filter(u => u.isVolunteer || u.volunteerStatus === 'pending'));
        }
    };

    useEffect(() => {
        if (activeTab === 'volunteers') {
            fetchVolunteers();
        }
    }, [activeTab]);

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

                // Fetch paginated reports
                const res = await axios.get(`${API_URL}/reports?page=${currentPage}&limit=${itemsPerPage}`, config);

                if (res.data.reports) {
                    setReports(res.data.reports);
                    setTotalPages(res.data.totalPages);

                    if (res.data.stats) {
                        setStats(res.data.stats);
                    } else {
                        // Fallback if stats not provided (older backend?)
                        const newStats = res.data.reports.reduce((acc, report) => {
                            acc.total++;
                            acc[report.status.toLowerCase()]++;
                            return acc;
                        }, { total: 0, pending: 0, verified: 0, rejected: 0 });
                        setStats(newStats);
                    }
                } else {
                    // Fallback for older non-paginated API or local handling
                    setReports(res.data);
                }

            } catch (err) {
                console.error("Error fetching admin reports:", err);
                // Fallback to local storage
                const storedReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
                setReports(storedReports);
            }
        };

        fetchReports();
    }, [user, navigate, currentPage, itemsPerPage]);

    const updateStatus = async (reportId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.put(`${API_URL}/reports/${reportId}/status`, { status: newStatus }, config);

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
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.disasterType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All'
            ? true
            : filterStatus === 'Stuck' ? report.isStuck
                : filterStatus === 'ShelterRequest' ? report.shelterRequest
                    : report.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const [volunteerFilter, setVolunteerFilter] = useState('All');

    const filteredVolunteers = volunteers.filter(vol => {
        if (volunteerFilter === 'All') return true;
        if (volunteerFilter === 'Pending') return vol.volunteerStatus === 'pending';
        if (volunteerFilter === 'Active') return vol.isVolunteer;
        if (volunteerFilter === 'Rejected') return vol.volunteerStatus === 'rejected';
        return true;
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

            {/* Stats Grid - Note: Shows stats for current page only in this version */}
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

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-800">
                <button
                    onClick={() => setActiveTab('reports')}
                    className={`pb-4 px-4 font-bold text-sm tracking-wide transition-all ${activeTab === 'reports' ? 'text-red-500 border-b-2 border-red-500' : 'text-slate-400 hover:text-white'
                        }`}
                >
                    INCIDENT REPORTS
                </button>
                <button
                    onClick={() => setActiveTab('volunteers')}
                    className={`pb-4 px-4 font-bold text-sm tracking-wide transition-all ${activeTab === 'volunteers' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-slate-400 hover:text-white'
                        }`}
                >
                    VOLUNTEERS
                </button>
            </div>

            {activeTab === 'reports' ? (
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
                                <option value="Resolved">Resolved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Stuck">Stuck / Rescue Needed</option>
                                <option value="ShelterRequest">Shelter Requests</option>
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
                                            {(report.isStuck || report.shelterRequest) && (
                                                <div className="flex gap-2 mb-2">
                                                    {report.isStuck && (
                                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
                                                            SOS: STUCK
                                                        </span>
                                                    )}
                                                    {report.shelterRequest && (
                                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                            Need Shelter
                                                        </span>
                                                    )}
                                                </div>
                                            )}
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

                    <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                        <div className="text-sm text-slate-400">
                            Page <span className="font-bold text-white">{currentPage}</span> of <span className="font-bold text-white">{totalPages}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-900/50 rounded-2xl shadow-xl overflow-hidden border border-slate-800 backdrop-blur-sm">
                    <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Shield className="text-purple-500" size={24} />
                            Volunteer Applications
                            <span className="ml-2 bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">{filteredVolunteers.length}</span>
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={fetchVolunteers}
                                className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                                title="Refresh List"
                            >
                                <Clock size={20} className="w-5 h-5" />
                            </button>
                            <select
                                value={volunteerFilter}
                                onChange={(e) => setVolunteerFilter(e.target.value)}
                                className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Active">Active / Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    {filteredVolunteers.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            No volunteers or applications found.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {filteredVolunteers.map(vol => (
                                <div key={vol.id || vol._id} className="p-6 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                                        <div className="flex-grow space-y-3">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-white">{vol.name}</h3>
                                                {vol.volunteerStatus === 'pending' && (
                                                    <span className="bg-yellow-500/10 text-yellow-400 text-[10px] px-2 py-1 rounded-full border border-yellow-500/20 font-black uppercase tracking-wider animate-pulse transition-all">
                                                        Pending
                                                    </span>
                                                )}
                                                {vol.isVolunteer && (
                                                    <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded-full border border-green-500/20 font-black uppercase tracking-wider">
                                                        Active
                                                    </span>
                                                )}
                                                {vol.volunteerStatus === 'rejected' && (
                                                    <span className="bg-red-500/10 text-red-400 text-[10px] px-2 py-1 rounded-full border border-red-500/20 font-black uppercase tracking-wider">
                                                        Rejected
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-slate-400 mb-2">{vol.email}</div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/30 p-3 rounded-xl border border-slate-800">
                                                <div>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contact</p>
                                                    <p className="text-sm text-slate-300 font-medium">{vol.contact || 'N/A'} • {vol.location || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Profession/Exp</p>
                                                    <p className="text-sm text-slate-300 font-medium">{vol.profession || 'N/A'} • {vol.experience || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Motivation</p>
                                                    <p className="text-sm text-slate-300 font-medium italic truncate">{vol.reason ? `"${vol.reason}"` : 'N/A'}</p>
                                                </div>
                                            </div>



                                            <div className="flex flex-wrap gap-2 mt-4 bg-slate-950/20 p-2 rounded-lg">
                                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider self-center mr-1">Skills:</span>
                                                {vol.skills && vol.skills.map((skill, idx) => (
                                                    <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] uppercase font-bold px-2 py-1 rounded border border-slate-700">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {vol.volunteerStatus === 'pending' && (
                                            <div className="flex lg:flex-col gap-2 shrink-0">
                                                <button
                                                    onClick={() => updateVolunteerStatus(vol._id || vol.id, 'approved')}
                                                    className="flex items-center justify-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all shadow-sm hover:shadow-green-900/20 font-bold text-sm uppercase tracking-wider"
                                                >
                                                    <CheckCircle size={16} />
                                                    <span>Verify</span>
                                                </button>
                                                <button
                                                    onClick={() => updateVolunteerStatus(vol._id || vol.id, 'rejected')}
                                                    className="flex items-center justify-center space-x-2 px-6 py-2 bg-slate-800 text-red-400 border border-slate-700 rounded-lg hover:bg-red-900/20 hover:border-red-500/30 transition-all font-bold text-sm uppercase tracking-wider"
                                                >
                                                    <XCircle size={16} />
                                                    <span>Reject</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;

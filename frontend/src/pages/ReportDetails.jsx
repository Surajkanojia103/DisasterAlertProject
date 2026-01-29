import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, MapPin, AlertTriangle, CheckCircle, XCircle, ArrowLeft, Info, Users, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const res = await axios.get(`${API_URL}/reports/${id}`, config);
                setReport(res.data);
            } catch (err) {
                console.error("Error fetching report details:", err);

                // Fallback to local storage
                const storedReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
                const localReport = storedReports.find(r => (r._id === id || r.id === id));

                if (localReport) {
                    setReport(localReport);
                } else {
                    navigate('/user-panel');
                }
            }
        };

        if (id) {
            fetchReport();
        }
    }, [id, navigate]);

    if (!report) return null;

    const isVerified = report.status === 'Verified';
    const isRejected = report.status === 'Rejected';
    const isPending = report.status === 'Pending';

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in-up">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-wider text-sm"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </button>

            <div className="bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-slate-800 overflow-hidden">
                {/* Header Section */}
                <div className={`p-8 md:p-12 border-b border-slate-800 ${isVerified ? 'bg-green-900/10' : isRejected ? 'bg-red-900/10' : 'bg-yellow-900/10'
                    }`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${isVerified ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    isRejected ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {report.status}
                                </span>
                                <span className="text-slate-400 text-xs font-bold flex items-center uppercase tracking-wider">
                                    <Clock size={14} className="mr-2" />
                                    {new Date(report.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight">{report.disasterType}</h1>
                            <div className="flex items-center text-xl text-slate-300 font-medium">
                                <MapPin size={24} className="mr-2 text-red-500" />
                                {report.location}
                            </div>
                        </div>
                        <div className={`p-6 rounded-3xl ${isVerified ? 'bg-slate-800 text-green-500 border-green-500/30' :
                            isRejected ? 'bg-slate-800 text-red-500 border-red-500/30' :
                                'bg-slate-800 text-yellow-500 border-yellow-500/30'
                            } shadow-lg border`}>
                            {isVerified ? <CheckCircle size={48} /> : isRejected ? <XCircle size={48} /> : <Clock size={48} />}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                            <div className="flex items-center text-slate-500 mb-3">
                                <AlertTriangle size={16} className="mr-2" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Severity</span>
                            </div>
                            <p className={`text-2xl font-black ${report.severity === 'Critical' ? 'text-red-500' :
                                report.severity === 'High' ? 'text-orange-500' :
                                    'text-blue-500'
                                }`}>{report.severity}</p>
                        </div>
                        <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                            <div className="flex items-center text-slate-500 mb-3">
                                <Users size={16} className="mr-2" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Affected</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-200">{report.affected || 'Unknown'}</p>
                        </div>
                        <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                            <div className="flex items-center text-slate-500 mb-3">
                                <Package size={16} className="mr-2" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Needs</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-200">{report.needs || 'None specified'}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <Info size={20} className="mr-2 text-blue-500" />
                            Detailed Description
                        </h3>
                        <div className="bg-slate-950/30 p-8 rounded-[2rem] border border-slate-800 text-slate-300 leading-relaxed text-lg italic">
                            "{report.description}"
                        </div>
                    </div>

                    {isVerified && (
                        <div className="bg-green-900/20 p-8 rounded-[2rem] text-green-100 border border-green-500/20 shadow-lg shadow-green-900/10">
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-500/20 p-3 rounded-2xl text-green-400">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 text-green-400">Verified by Authorities</h4>
                                    <p className="text-green-200/80 leading-relaxed">This report has been reviewed and confirmed by the DARS administration team. Emergency services have been notified of the situation in {report.location}.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPending && (
                        <div className="bg-blue-900/20 p-8 rounded-[2rem] text-blue-100 border border-blue-500/20 shadow-lg shadow-blue-900/10">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 text-blue-400">Under Review</h4>
                                    <p className="text-blue-200/80 leading-relaxed">Our team is currently verifying the details of your report. You will see an update here once the status changes. Thank you for your contribution to community safety.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;

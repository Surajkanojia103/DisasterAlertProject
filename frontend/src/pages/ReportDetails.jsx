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
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
            </button>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                {/* Header Section */}
                <div className={`p-8 md:p-12 ${isVerified ? 'bg-green-50' : isRejected ? 'bg-red-50' : 'bg-yellow-50'
                    }`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${isVerified ? 'bg-green-100 text-green-700 border-green-200' :
                                    isRejected ? 'bg-red-100 text-red-700 border-red-200' :
                                        'bg-yellow-100 text-yellow-700 border-yellow-200'
                                    }`}>
                                    {report.status}
                                </span>
                                <span className="text-slate-500 text-sm font-bold flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    {new Date(report.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900">{report.disasterType}</h1>
                            <div className="flex items-center text-xl text-slate-600 font-medium">
                                <MapPin size={24} className="mr-2 text-red-500" />
                                {report.location}
                            </div>
                        </div>
                        <div className={`p-6 rounded-3xl ${isVerified ? 'bg-white text-green-600' :
                            isRejected ? 'bg-white text-red-600' :
                                'bg-white text-yellow-600'
                            } shadow-sm border border-slate-100`}>
                            {isVerified ? <CheckCircle size={48} /> : isRejected ? <XCircle size={48} /> : <Clock size={48} />}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <div className="flex items-center text-slate-400 mb-2">
                                <AlertTriangle size={18} className="mr-2" />
                                <span className="text-xs font-black uppercase tracking-wider">Severity</span>
                            </div>
                            <p className={`text-xl font-bold ${report.severity === 'Critical' ? 'text-red-600' :
                                report.severity === 'High' ? 'text-orange-600' :
                                    'text-blue-600'
                                }`}>{report.severity}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <div className="flex items-center text-slate-400 mb-2">
                                <Users size={18} className="mr-2" />
                                <span className="text-xs font-black uppercase tracking-wider">People Affected</span>
                            </div>
                            <p className="text-xl font-bold text-slate-800">{report.affected || 'Unknown'}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <div className="flex items-center text-slate-400 mb-2">
                                <Package size={18} className="mr-2" />
                                <span className="text-xs font-black uppercase tracking-wider">Immediate Needs</span>
                            </div>
                            <p className="text-xl font-bold text-slate-800">{report.needs || 'None specified'}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center">
                            <Info size={20} className="mr-2 text-blue-500" />
                            Detailed Description
                        </h3>
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-slate-700 leading-relaxed text-lg italic">
                            "{report.description}"
                        </div>
                    </div>

                    {isVerified && (
                        <div className="bg-green-600 p-8 rounded-[2rem] text-white shadow-lg shadow-green-100">
                            <div className="flex items-start space-x-4">
                                <div className="bg-white/20 p-3 rounded-2xl">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Verified by Authorities</h4>
                                    <p className="text-green-50">This report has been reviewed and confirmed by the DARS administration team. Emergency services have been notified of the situation in {report.location}.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPending && (
                        <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-lg shadow-blue-100">
                            <div className="flex items-start space-x-4">
                                <div className="bg-white/20 p-3 rounded-2xl">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Under Review</h4>
                                    <p className="text-blue-50">Our team is currently verifying the details of your report. You will see an update here once the status changes. Thank you for your contribution to community safety.</p>
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

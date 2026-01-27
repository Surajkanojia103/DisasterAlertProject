import { useState, useEffect } from 'react';
import { fetchAlerts } from '../services/api';
import AlertCard from '../components/AlertCard';
import { Loader, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [alerts, setAlerts] = useState([]);
    const [citizenReports, setCitizenReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchAlerts();
                // Data is already sorted by newest first in the service, but let's be sure
                const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setAlerts(sortedData);

                const storedReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
                const verifiedReports = storedReports.filter(r => r.status === 'Verified').reverse();
                setCitizenReports(verifiedReports);
            } catch (err) {
                console.error("Failed to load alerts:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-600 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>

                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-red-500/30">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span>LIVE MONITORING ACTIVE</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-gray-50">
                        Stay Informed. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Stay Safe.</span>
                    </h1>
                    <p className="text-base text-gray-200 mb-6 leading-relaxed max-w-2xl">
                        Real-time disaster tracking and community reporting system.
                        Get instant alerts from USGS and GDACS to protect what matters most.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/report" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 flex items-center space-x-2 text-sm">
                            <span>Report an Incident</span>
                            <AlertTriangle size={16} />
                        </Link>
                        <Link to="/safety" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-900/20 text-sm">
                            Safety Instructions
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div className="flex-grow">
                        <h2 className="text-3xl font-bold text-slate-800">Global Alerts</h2>
                        <p className="text-slate-500 mt-1">Real-time data from global monitoring stations</p>
                    </div>

                    <div className="hidden lg:flex flex-wrap items-center justify-end gap-3 text-[10px] font-bold text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 mt-auto">
                        <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span> USGS</span>
                        <span className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-1.5"></span> GDACS</span>
                        <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span> ReliefWeb</span>

                        <span className="flex items-center"><span className="w-2 h-2 bg-cyan-500 rounded-full mr-1.5"></span> Open-Meteo</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-80 bg-white rounded-[2rem] shadow-sm border border-slate-100">
                        <Loader className="animate-spin text-red-500 mb-4" size={48} />
                        <p className="text-slate-500 font-medium animate-pulse">Fetching global data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {alerts.length > 0 ? (
                            alerts.map((alert) => (
                                <AlertCard key={alert.id} alert={alert} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] shadow-sm border border-slate-100">
                                <p className="text-slate-400 text-lg">No recent global alerts found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Citizen Reports Section */}
            {citizenReports.length > 0 && (
                <div className="space-y-6 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Verified Citizen Reports</h2>
                            <p className="text-slate-500 mt-1">Confirmed incidents reported by the community</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                            <CheckCircle size={16} />
                            <span>VERIFIED BY DARS</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {citizenReports.map((report) => (
                            <div key={report._id || report.id} className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col h-full">
                                <div className="p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] bg-blue-50 text-blue-600 border border-blue-100">
                                            CITIZEN REPORT
                                        </div>
                                        <div className="text-green-500 bg-slate-50 p-2 rounded-xl">
                                            <CheckCircle size={20} />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-slate-800 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                                        {report.disasterType} in {report.location}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {report.description}
                                    </p>
                                </div>

                                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center mt-auto">
                                    <div className="flex items-center text-slate-400 text-xs font-bold">
                                        <Clock size={14} className="mr-2" />
                                        {new Date(report.timestamp).toLocaleDateString()}
                                    </div>

                                    <Link
                                        to={`/report-details/${report._id || report.id}`}
                                        className="flex items-center space-x-2 text-slate-900 hover:text-red-600 font-black text-xs uppercase tracking-wider transition-colors"
                                    >
                                        <span>View Status</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

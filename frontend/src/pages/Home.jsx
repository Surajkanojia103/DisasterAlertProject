import { useState, useEffect } from 'react';
import { fetchAlerts } from '../services/api';
import AlertCard from '../components/AlertCard';
import { Loader, AlertTriangle, CheckCircle, Clock, ArrowRight, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroRadar from '../assets/hero-radar.png';
import heroAnalytics from '../assets/hero-analytics.png';

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
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <div className="relative w-full py-12 animate-fade-in-up">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-600 rounded-full opacity-20 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-[100px]"></div>

                {/* Decorative Tech Images - Zoomed & Masked */}
                <img
                    src={heroRadar}
                    alt="Global Monitoring"
                    className="absolute top-1/2 left-0 -translate-y-1/2 w-96 md:w-[50rem] h-auto object-contain opacity-80 pointer-events-none mix-blend-screen hidden md:block"
                    style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 100%)' }}
                />
                <img
                    src={heroAnalytics}
                    alt="Data Analytics"
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-96 md:w-[50rem] h-auto object-contain opacity-80 pointer-events-none mix-blend-screen hidden md:block"
                    style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 100%)' }}
                />

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center space-x-3 bg-slate-950/50 backdrop-blur-md text-red-400 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 border border-red-500/20 shadow-lg">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="tracking-widest uppercase">Global Monitoring Active</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                        Disaster Alert And <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Reporting System</span>
                    </h1>
                    <p className="text-base text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto font-medium">
                        Advanced real-time tracking of seismic, weather, and emergency events worldwide.
                        Integrated with USGS, GDACS, and local citizen reporting.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <Link to="/report" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-900/40 flex items-center space-x-2 text-base group">
                            <AlertTriangle size={18} className="group-hover:animate-pulse" />
                            <span>Report Incident</span>
                        </Link>
                        <Link to="/safety" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg border border-slate-700 text-base">
                            Safety Protocols
                        </Link>
                    </div>

                    {/* Live Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/50 pt-8">
                        <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                            <div className="text-2xl font-black text-white mb-1">{alerts.length}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Alerts</div>
                        </div>
                        <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                            <div className="text-2xl font-black text-blue-400 mb-1">24/7</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monitoring</div>
                        </div>
                        <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                            <div className="text-2xl font-black text-green-400 mb-1">{citizenReports.length}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Citizen Reports</div>
                        </div>
                        <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                            <div className="text-2xl font-black text-orange-400 mb-1">Global</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Coverage</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8 animate-fade-in-up animation-delay-200 mt-12 relative z-20">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-6">
                    <div>
                        <h2 className="text-4xl font-black text-white flex items-center tracking-tight">
                            <Activity size={32} className="mr-4 text-blue-500" />
                            Live Global Feed
                        </h2>
                        <p className="text-slate-400 mt-3 text-lg font-medium">Real-time data stream from international monitoring stations</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex items-center text-[10px] font-black uppercase tracking-widest text-slate-300 shadow-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span> USGS
                        </span>
                        <span className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex items-center text-[10px] font-black uppercase tracking-widest text-slate-300 shadow-sm">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span> GDACS
                        </span>
                        <span className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex items-center text-[10px] font-black uppercase tracking-widest text-slate-300 shadow-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span> ReliefWeb
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96 bg-slate-900/50 rounded-[2rem] border border-slate-800 backdrop-blur-sm">
                        <Loader className="animate-spin text-red-500 mb-6" size={64} />
                        <p className="text-slate-400 font-medium animate-pulse tracking-widest uppercase text-sm">Initializing Data Streams...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alerts.length > 0 ? (
                            alerts.map((alert) => (
                                <AlertCard key={alert.id} alert={alert} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-slate-900/50 rounded-[2rem] border border-slate-800">
                                <p className="text-slate-500 text-lg">No active alerts detected in the monitored regions.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Citizen Reports Section */}
            {citizenReports.length > 0 && (
                <div className="space-y-8 pt-12 animate-fade-in-up animation-delay-300">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-white flex items-center">
                                <Users size={28} className="mr-3 text-green-500" />
                                Verified Citizen Reports
                            </h2>
                            <p className="text-slate-400 mt-2">On-ground situation reports confirmed by DARS admins</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {citizenReports.map((report) => (
                            <div key={report._id || report.id} className="group bg-slate-900/50 backdrop-blur-sm rounded-[2rem] border border-slate-800 hover:border-green-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-green-900/10">
                                <div className="p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] bg-green-500/10 text-green-400 border border-green-500/20">
                                            VERIFIED
                                        </div>
                                        <div className="text-green-500 bg-green-500/10 p-2 rounded-xl">
                                            <CheckCircle size={20} />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-100 mb-3 leading-tight group-hover:text-green-400 transition-colors">
                                        {report.disasterType} in {report.location}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {report.description}
                                    </p>
                                </div>

                                <div className="px-8 py-6 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center mt-auto">
                                    <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <Clock size={14} className="mr-2" />
                                        {new Date(report.timestamp).toLocaleDateString()}
                                    </div>

                                    <Link
                                        to={`/report-details/${report._id || report.id}`}
                                        className="flex items-center space-x-2 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
                                    >
                                        <span>Status</span>
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

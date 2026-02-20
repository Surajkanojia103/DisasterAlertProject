import { useState, useEffect } from 'react';
import { fetchAlerts } from '../services/api';
import AlertCard from '../components/AlertCard';
import { Loader, AlertTriangle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroRadar from '../assets/hero-radar.png';
import heroAnalytics from '../assets/hero-analytics.png';

const Home = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchAlerts();
                const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setAlerts(sortedData);
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
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-600 rounded-full opacity-20 blur-[100px] animate-blob"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-[100px] animate-blob animation-delay-4000"></div>

                <img
                    src={heroRadar}
                    alt="Global Monitoring"
                    className="absolute top-1/2 left-0 -translate-y-1/2 w-64 md:w-[42rem] h-auto object-contain opacity-80 pointer-events-none mix-blend-screen block"
                    style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 100%)' }}
                />
                <img
                    src={heroAnalytics}
                    alt="Data Analytics"
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-64 md:w-[42rem] h-auto object-contain opacity-80 pointer-events-none mix-blend-screen block"
                    style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 100%)' }}
                />

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center space-x-3 bg-slate-950/50 backdrop-blur-md text-red-400 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300 cursor-default">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="tracking-widest uppercase">Global Monitoring Active</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-white uppercase italic">
                        Disaster Alert And <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 not-italic">Reporting System</span>
                    </h1>
                    <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        Advanced real-time tracking of seismic, weather, and emergency events worldwide.
                        <span className="block text-slate-500 text-sm mt-2 uppercase tracking-widest font-bold">Integrated with USGS, GDACS, and local citizen reporting.</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <Link to="/report" className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center space-x-3 text-sm group">
                            <AlertTriangle size={20} className="group-hover:animate-pulse" />
                            <span>Report Incident</span>
                        </Link>
                        <Link to="/safety" className="bg-slate-900/50 backdrop-blur-md hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all border border-slate-700 hover:border-blue-500/50 text-sm shadow-xl">
                            Safety Protocols
                        </Link>
                    </div>

                    {/* Live Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto border-t border-slate-800/60 pt-10">
                        <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-slate-800 shadow-xl backdrop-blur-md transition-all hover:border-slate-700 group">
                            <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">128</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Active Alerts</div>
                        </div>
                        <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-slate-800 shadow-xl backdrop-blur-md transition-all hover:border-blue-500/30 group">
                            <div className="text-4xl font-black text-blue-500 mb-2 group-hover:scale-110 transition-transform">24/7</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Monitoring</div>
                        </div>
                        <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-slate-800 shadow-xl backdrop-blur-md transition-all hover:border-green-500/30 group">
                            <div className="text-4xl font-black text-green-500 mb-2 group-hover:scale-110 transition-transform">0</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Citizen Reports</div>
                        </div>
                        <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-slate-800 shadow-xl backdrop-blur-md transition-all hover:border-orange-500/30 group">
                            <div className="text-4xl font-black text-orange-500 mb-2 group-hover:scale-110 transition-transform text-transparent bg-clip-text bg-gradient-to-tr from-orange-400 to-orange-600">Global</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Coverage</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Alerts Section */}
            <div className="space-y-4 animate-fade-in-up animation-delay-200 mt-2 relative z-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-3 border-b border-slate-800/50">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all rounded-full"></div>
                            <Activity size={48} className="relative text-blue-500 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">Live Global Feed</h2>
                            <p className="text-slate-500 mt-1 text-sm font-medium">Real-time data stream from international monitoring stations</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-slate-900/80 px-5 py-2.5 rounded-2xl border border-slate-800 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 shadow-xl backdrop-blur-md">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse"></span> USGS
                        </span>
                        <span className="bg-slate-900/80 px-5 py-2.5 rounded-2xl border border-slate-800 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 shadow-xl backdrop-blur-md">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 shadow-[0_0_10px_rgba(249,115,22,0.6)] animate-pulse"></span> GDACS
                        </span>
                        <span className="bg-slate-900/80 px-5 py-2.5 rounded-2xl border border-slate-800 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 shadow-xl backdrop-blur-md">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></span> ReliefWeb
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96 bg-slate-900/50 rounded-[2rem] border border-slate-800 backdrop-blur-sm">
                        <Loader className="animate-spin text-red-500 mb-6" size={64} />
                        <p className="text-slate-400 font-medium animate-pulse tracking-widest uppercase text-sm">Initializing Data Streams...</p>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 mb-8 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse shadow-lg shadow-red-500/50"></span>
                                Critical Alerts
                            </h3>
                            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Live Updates</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {alerts.length > 0 ? (
                                alerts.map((alert) => (
                                    <AlertCard key={alert.id} alert={alert} />
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="text-slate-500 text-lg">No critical alerts at this moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default Home;

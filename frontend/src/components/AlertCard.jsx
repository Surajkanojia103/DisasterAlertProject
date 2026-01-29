import { ExternalLink, Calendar, AlertCircle, Clock, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AlertCard = ({ alert }) => {
    const isGDACS = alert.source === 'GDACS';

    return (
        <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1 flex flex-col h-full">
            {/* Colored Status Line */}
            <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-300 ${isGDACS ? 'bg-red-500' : 'bg-orange-500'}`}></div>

            <div className="p-6 pl-8 flex-grow relative">
                {/* Header: Source & Type */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${alert.source === 'GDACS' ? 'text-red-400 border-red-500/30 bg-red-500/5' :
                            alert.source === 'USGS' ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' :
                                'text-slate-400 border-slate-700 bg-slate-800'
                            }`}>
                            {alert.source}
                        </span>
                        <span className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-slate-700 text-slate-400 bg-slate-800/50">
                            {alert.type || 'ALERT'}
                        </span>
                    </div>
                    <div className="text-slate-500 group-hover:text-white transition-colors">
                        <Activity size={16} />
                    </div>
                </div>

                {/* Title & Icon */}
                <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-red-400 transition-colors">
                        {alert.title}
                    </h3>
                    <div className={`p-2 rounded-lg shrink-0 ${isGDACS ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                        <AlertCircle size={20} />
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-medium">
                    {alert.description}
                </p>
            </div>

            {/* Tech Footer */}
            <div className="pl-1.5">
                <div className="bg-slate-950 border-t border-slate-800 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500">
                        <span className="flex items-center">
                            <Calendar size={10} className="mr-1" />
                            {new Date(alert.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="w-px h-3 bg-slate-800"></span>
                        <span className="flex items-center text-slate-400">
                            <Clock size={10} className="mr-1" />
                            {new Date(alert.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/safety" className="text-slate-500 hover:text-white transition-colors" title="Safety Protocols">
                            <Shield size={16} />
                        </Link>
                        <a
                            href={alert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                            <span>View</span>
                            <ExternalLink size={10} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertCard;

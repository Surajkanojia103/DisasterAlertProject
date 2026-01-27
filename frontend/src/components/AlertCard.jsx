import { ExternalLink, Calendar, AlertCircle, Clock, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AlertCard = ({ alert }) => {
    const isGDACS = alert.source === 'GDACS';

    return (
        <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col items-start gap-2">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${alert.source === 'GDACS' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            alert.source === 'USGS' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                alert.source === 'ReliefWeb' ? 'bg-green-50 text-green-600 border-green-100' :
                                    alert.source === 'Open-Meteo' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                                        'bg-slate-50 text-slate-600 border-slate-100'
                            }`}>
                            {alert.source}
                        </div>

                        {/* Type Badge */}
                        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                            <Activity size={12} />
                            <span>{alert.type || 'General'}</span>
                        </div>
                    </div>

                    <div className={`${isGDACS ? 'text-red-500' : 'text-orange-500'} bg-slate-50 p-2 rounded-xl group-hover:scale-110 transition-transform duration-500`}>
                        <AlertCircle size={20} />
                    </div>
                </div>

                <h3 className="text-xl font-extrabold text-slate-800 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                    {alert.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {alert.description}
                </p>
            </div>

            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center mt-auto">
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <Calendar size={12} className="mr-1.5" />
                        {new Date(alert.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center text-slate-500 text-xs font-black">
                        <Clock size={12} className="mr-1.5 text-red-500" />
                        {new Date(alert.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        to="/safety"
                        className="flex items-center space-x-1 text-slate-500 hover:text-green-600 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                        <Shield size={14} />
                        <span>Safety</span>
                    </Link>
                    <a
                        href={alert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-slate-900 hover:text-red-600 font-black text-xs uppercase tracking-wider transition-colors"
                    >
                        <span>Details</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AlertCard;

import { useState, useEffect } from 'react';
import { fetchAlerts } from '../services/api';
import AlertCard from '../components/AlertCard';
import { Loader, AlertTriangle } from 'lucide-react';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAlerts = async () => {
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

        loadAlerts();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white flex items-center">
                        <AlertTriangle size={28} className="mr-3 text-red-500" />
                        Global Alerts
                    </h2>
                    <p className="text-slate-400 mt-2 font-medium">All active alerts from international monitoring stations</p>
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
                    {alerts.length} Active Alerts
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col justify-center items-center h-96">
                    <Loader className="animate-spin text-red-500 mb-6" size={48} />
                    <p className="text-slate-500 font-medium animate-pulse tracking-widest uppercase text-sm">Loading Global Alerts...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alerts.length > 0 ? (
                        alerts.map((alert) => (
                            <AlertCard key={alert.id} alert={alert} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
                            <p className="text-slate-500 text-lg">No active alerts reported at this time.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Alerts;

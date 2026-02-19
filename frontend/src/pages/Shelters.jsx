import { useState, useEffect } from 'react';
import { MapPin, Phone, Users, CheckCircle, XCircle, Home, Navigation } from 'lucide-react';
import axios from 'axios';

const Shelters = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, open, full

    useEffect(() => {
        fetchShelters();
    }, []);

    const fetchShelters = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await axios.get(`${API_URL}/shelters`);
            setShelters(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
            case 'Full': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
            case 'Closed': return 'text-red-400 bg-red-400/10 border-red-400/30';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/30';
        }
    };

    const filteredShelters = filter === 'all'
        ? shelters
        : shelters.filter(s => s.status.toLowerCase() === filter.toLowerCase());

    return (
        <div className="space-y-8 animate-fade-in-up section-padding">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-700/50 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <Home className="text-blue-500" size={40} />
                        Emergency Shelters
                    </h1>
                    <p className="text-slate-400 mt-2 text-lg">Find safe locations and relief centers near you.</p>
                </div>

                <div className="flex gap-2 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
                    {['All', 'Open', 'Full'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f.toLowerCase())}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f.toLowerCase()
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-400">Locating shelters...</p>
                </div>
            ) : filteredShelters.length === 0 ? (
                <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-700/50">
                    <Navigation size={48} className="mx-auto text-slate-600 mb-4" />
                    <p className="text-slate-400 text-xl">No shelters found catering to your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShelters.map((shelter) => (
                        <div key={shelter._id} className="glass-panel p-6 rounded-2xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(shelter.status)}`}>
                                    {shelter.status.toUpperCase()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 pr-20">{shelter.name}</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-start gap-3 text-slate-300">
                                    <MapPin size={18} className="text-blue-400 mt-1 shrink-0" />
                                    <span>{shelter.location.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Users size={18} className="text-blue-400 shrink-0" />
                                    <span>Capacity: {shelter.occupancy || 0} / {shelter.capacity}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Phone size={18} className="text-blue-400 shrink-0" />
                                    <span>{shelter.contact}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-700/50 pt-4 mt-auto">
                                <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Facilities</h4>
                                <div className="flex flex-wrap gap-2">
                                    {shelter.facilities.map((fac, idx) => (
                                        <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md border border-slate-700">
                                            {fac}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                                <Navigation size={18} />
                                Get Directions
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shelters;

import { useState } from 'react';
import { Home, Users, MapPin, Phone, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const Shelters = () => {
    const [shelters] = useState([
        {
            id: 1,
            name: "Central Community Hub",
            location: "Downtown, Sector 4",
            capacity: "500",
            occupied: "480",
            status: "Full",
            contact: "+1 234 567 8901",
            amenities: ["Food", "Water", "Medical", "Power"],
            lastUpdated: "5 mins ago",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Central+Community+Hub+Downtown"
        },
        {
            id: 2,
            name: "Westside Emergency Center",
            location: "Industrial Park, Block B",
            capacity: "300",
            occupied: "150",
            status: "Medium",
            contact: "+1 234 567 8902",
            amenities: ["Water", "Power", "Wi-Fi"],
            lastUpdated: "12 mins ago",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Industrial+Park+Emergency+Center"
        },
        {
            id: 3,
            name: "North Star Shelter",
            location: "Residential Area, North 2nd St",
            capacity: "250",
            occupied: "20",
            status: "Empty",
            contact: "+1 234 567 8903",
            amenities: ["Food", "Water", "Medical"],
            lastUpdated: "2 mins ago",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Residential+Area+North+Star+Shelter"
        },
        {
            id: 4,
            name: "Mainland Relief Point",
            location: "Harbor Road, Port Side",
            capacity: "400",
            occupied: "395",
            status: "Full",
            contact: "+1 234 567 8904",
            amenities: ["Food", "Water", "Clothes"],
            lastUpdated: "1 hour ago",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Harbor+Road+Relief+Point"
        },
        {
            id: 5,
            name: "Green Valley Base",
            location: "Valley Road, East Hill",
            capacity: "200",
            occupied: "100",
            status: "Medium",
            contact: "+1 234 567 8905",
            amenities: ["Power", "Wi-Fi", "Shelter"],
            lastUpdated: "30 mins ago",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Green+Valley+Base+East+Hill"
        }
    ]);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Full':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Medium':
                return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'Empty':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header section with Premium Glow */}
            <div className="text-center mb-4">
                <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">Safety <span className="text-blue-500">Shelters</span></h1>
                <p className="text-slate-400 mt-3 text-lg">Real-time status of emergency relief points and medical centers.</p>
            </div>



            {/* Shelter List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {shelters.map((shelter) => (
                    <div key={shelter.id} className="group relative bg-[#0d1117] rounded-[2.5rem] border border-slate-800 p-8 hover:border-blue-500/40 transition-all duration-500 shadow-xl overflow-hidden">
                        {/* Background subtle decoration */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <Home size={120} strokeWidth={1} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-6 flex-grow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{shelter.name}</h2>
                                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{shelter.location}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Occupancy</div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-black text-white">{shelter.occupied}</span>
                                            <span className="text-xs font-bold text-slate-600">/ {shelter.capacity}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <AlertCircle size={10} /> Contact
                                        </div>
                                        <div className="text-sm font-black text-blue-500">{shelter.contact}</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {shelter.amenities.map((amenity, idx) => (
                                        <span key={idx} className="bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 shadow-inner">
                                            <CheckCircle2 size={10} className="text-blue-500" /> {amenity}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={shelter.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-5 py-2.5 rounded-2xl border border-blue-500/30 font-black uppercase tracking-widest text-[10px] transition-all group/btn"
                                >
                                    <MapPin size={14} className="group-hover/btn:animate-bounce" />
                                    <span>Navigate to Shelter</span>
                                </a>
                            </div>

                            <div className="flex flex-col items-end gap-3 min-w-[120px]">
                                <span className={`px-6 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${getStatusStyles(shelter.status)}`}>
                                    Status: {shelter.status}
                                </span>
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/30 rounded-xl border border-slate-800/50">
                                    <Info size={12} className="text-slate-600" />
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{shelter.lastUpdated}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full mt-4 bg-slate-800/50 h-2 rounded-full overflow-hidden border border-slate-800">
                                    <div
                                        className={`h-full transition-all duration-1000 ${shelter.status === 'Full' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                            shelter.status === 'Medium' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' :
                                                'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                                            }`}
                                        style={{ width: `${(shelter.occupied / shelter.capacity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Shelters;

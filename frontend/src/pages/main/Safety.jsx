import { useState } from 'react';
import { Shield, AlertTriangle, CloudRain, Wind, Flame, Waves, Mountain, Sun, Briefcase } from 'lucide-react';

const Safety = () => {
    const guides = [
        {
            title: 'Earthquake Safety',
            icon: AlertTriangle,
            color: 'text-orange-500',
            steps: [
                'Drop, Cover, and Hold On.',
                'Stay away from glass, windows, and heavy furniture.',
                'If indoors, stay there. If outdoors, move to an open area.',
                'Do not use elevators.'
            ]
        },
        {
            title: 'Flood Safety',
            icon: CloudRain,
            color: 'text-blue-500',
            steps: [
                'Move to higher ground immediately.',
                'Do not walk or drive through flood waters.',
                'Disconnect electrical appliances if safe to do so.',
                'Listen to official warnings and evacuation orders.'
            ]
        },
        {
            title: 'Cyclone Safety',
            icon: Wind,
            color: 'text-teal-500',
            steps: [
                'Secure loose items around your home.',
                'Board up windows if necessary.',
                'Keep an emergency kit ready (food, water, flashlight).',
                'Stay indoors during the storm.'
            ]
        },
        {
            title: 'Fire Safety',
            icon: Flame,
            color: 'text-red-500',
            steps: [
                'Install smoke alarms on every level of your home.',
                'Plan two ways out of every room.',
                'Crawl low under smoke to escape.',
                'Stop, Drop, and Roll if your clothes catch fire.'
            ]
        },
        {
            title: 'Tsunami Safety',
            icon: Waves,
            color: 'text-blue-700',
            steps: [
                'Move to high ground immediately if you feel an earthquake near the coast.',
                'Stay away from the beach.',
                'Listen to emergency broadcasts.',
                'Do not return until officials say it is safe.'
            ]
        },
        {
            title: 'Landslide Safety',
            icon: Mountain,
            color: 'text-stone-600',
            steps: [
                'Stay alert during heavy rain.',
                'Listen for unusual sounds like trees cracking.',
                'Move away from the path of a landslide or debris flow.',
                'Curl into a tight ball and protect your head if you cannot escape.'
            ]
        },
        {
            title: 'Heatwave Safety',
            icon: Sun,
            color: 'text-yellow-500',
            steps: [
                'Stay hydrated, drink plenty of water.',
                'Avoid strenuous activity during the hottest part of the day.',
                'Wear light, loose-fitting clothing.',
                'Check on elderly neighbors and family members.'
            ]
        }
    ];

    return (
        <div className="space-y-12 animate-fade-in-up">
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-teal-500/10 text-teal-500 rounded-2xl mb-6 border border-teal-500/20">
                    <Shield size={32} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">Safety Instructions</h1>
                <p className="text-slate-400 mt-4 text-lg">Comprehensive guidelines to keep you and your loved ones safe during various disaster scenarios.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide, index) => (
                    <div key={index} className="bg-slate-900/50 backdrop-blur-sm rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-800 overflow-hidden group">
                        <div className="p-8 border-b border-slate-800 flex items-center space-x-4 bg-slate-950/30">
                            <div className={`p-3 rounded-xl bg-slate-900 shadow-sm border border-slate-700 ${guide.color}`}>
                                <guide.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-200">{guide.title}</h3>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4">
                                {guide.steps.map((step, idx) => (
                                    <li key={idx} className="flex items-start group/item">
                                        <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors border border-green-500/20">
                                            <Shield size={10} />
                                        </div>
                                        <span className="text-slate-400 font-medium leading-relaxed group-hover/item:text-slate-300 transition-colors">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Safety Kit Checklist Section */}
            <div className="bg-slate-900/80 rounded-[2.5rem] shadow-xl border border-slate-800 p-8 md:p-12 mt-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full opacity-10 blur-[80px] -mr-20 -mt-20"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center mb-10 gap-6">
                        <div className="bg-red-500/10 p-5 rounded-3xl text-red-500 shadow-sm border border-red-500/20">
                            <Briefcase size={40} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white">Emergency Survival Kit</h2>
                            <p className="text-slate-400 text-lg mt-2">Essential items to keep packed and ready at all times.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            "Water (one gallon per person per day)",
                            "Non-perishable food (3-day supply)",
                            "Battery-powered or hand-crank radio",
                            "Flashlight with extra batteries",
                            "First aid kit",
                            "Whistle (to signal for help)",
                            "Dust mask (to help filter contaminated air)",
                            "Moist towelettes, garbage bags for sanitation",
                            "Wrench or pliers (to turn off utilities)",
                            "Manual can opener for food",
                            "Local maps",
                            "Cell phone with chargers and a backup battery"
                        ].map((item, index) => (
                            <div key={index} className="flex items-center group">
                                <div className="w-2 h-2 rounded-full bg-red-500 mr-4 flex-shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                <span className="text-slate-300 font-medium text-lg group-hover:text-white transition-colors border-b border-transparent group-hover:border-red-500/30 pb-0.5">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Safety;

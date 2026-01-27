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
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-800">Safety Instructions</h1>
                <p className="text-slate-600 mt-2">Guidelines to keep you safe during disasters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
                            <guide.icon className={guide.color} size={28} />
                            <h3 className="text-xl font-bold text-slate-800">{guide.title}</h3>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3">
                                {guide.steps.map((step, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <Shield size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                        <span className="text-slate-600">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Safety Kit Checklist Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 mt-12">
                <div className="flex items-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full text-red-600 mr-4">
                        <Briefcase size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Emergency Survival Kit</h2>
                        <p className="text-slate-500">Essential items to keep packed and ready at all times.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-5 h-5 rounded border-2 border-slate-300 mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Safety;

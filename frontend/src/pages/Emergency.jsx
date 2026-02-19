import { Phone, Shield, Truck, Flame, Users, AlertCircle, Train, Map, Droplets, Wind, Zap, Heart, Globe, Radio, Anchor } from 'lucide-react';

const Emergency = () => {
    const criticalContacts = [
        { name: 'National Emergency', number: '112', icon: Phone, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/40', desc: 'Single emergency number for all services', priority: true },
        { name: 'Police', number: '100', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40', desc: 'Law enforcement & public safety' },
        { name: 'Fire Brigade', number: '101', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/40', desc: 'Fire, rescue & hazmat operations' },
        { name: 'Ambulance', number: '102', icon: Truck, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/40', desc: 'Emergency medical services' },
    ];

    const disasterContacts = [
        { name: 'NDMA Helpline', number: '1078', icon: Shield, color: 'text-indigo-400', bg: 'bg-indigo-500/20', border: 'border-indigo-500/40', desc: 'National Disaster Management Authority' },
        { name: 'NDRF Helpline', number: '9711077372', icon: Shield, color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/40', desc: 'National Disaster Response Force' },
        { name: 'Disaster Management', number: '108', icon: Radio, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40', desc: 'State emergency response services' },
        { name: 'Flood Control Room', number: '1070', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', desc: 'Flood & waterlogging emergencies' },
        { name: 'Cyclone Warning', number: '1800-180-1717', icon: Wind, color: 'text-teal-400', bg: 'bg-teal-500/20', border: 'border-teal-500/40', desc: 'IMD cyclone alerts & warnings' },
        { name: 'Earthquake Helpline', number: '1800-11-0909', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', desc: 'USGS / seismic event assistance' },
    ];

    const helplineContacts = [
        { name: 'Women Helpline', number: '1091', icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/40', desc: '24/7 support for women in distress' },
        { name: 'Child Helpline', number: '1098', icon: Heart, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', desc: 'Child abuse, missing & emergency' },
        { name: 'Senior Citizen', number: '14567', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40', desc: 'Elder helpline – NPSO' },
        { name: 'Mental Health', number: 'iCall: 9152987821', icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40', desc: 'Psychological first aid & counseling' },
        { name: 'Gas Leakage', number: '1906', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/40', desc: 'Gas leak emergency response' },
        { name: 'Electricity Fault', number: '1912', icon: Zap, color: 'text-yellow-300', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', desc: 'Power failures & electrical hazards' },
    ];

    const otherContacts = [
        { name: 'Road Accident', number: '1073', icon: Truck, color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/40', desc: 'Highway emergency & accident relief' },
        { name: 'Railway Enquiry', number: '139', icon: Train, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40', desc: 'Rail accidents & enquiries' },
        { name: 'Coast Guard', number: '1554', icon: Anchor, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', desc: 'Maritime distress & sea emergencies' },
        { name: 'Tourist Helpline', number: '1363', icon: Map, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40', desc: 'Tourist assistance across India' },
        { name: 'Blood Bank', number: '104', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/40', desc: 'Emergency blood requirement' },
        { name: 'Air Ambulance', number: '9540161344', icon: Globe, color: 'text-sky-400', bg: 'bg-sky-500/20', border: 'border-sky-500/40', desc: 'Critical aerial medical emergency' },
        { name: 'Cyber Crime', number: '1930', icon: Shield, color: 'text-indigo-400', bg: 'bg-indigo-500/20', border: 'border-indigo-500/40', desc: 'Online fraud & cybercrime' },
        { name: 'Anti-Poison', number: '1800-116-117', icon: AlertCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/40', desc: 'Poisoning & toxic exposure helpline' },
    ];

    const ContactCard = ({ contact }) => (
        <div className={`group relative overflow-hidden rounded-3xl border ${contact.border || 'border-slate-700/50'} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer ${contact.priority ? 'ring-2 ring-red-500/50' : ''}`}>
            {/* Subtle gradient background tint */}
            <div className={`absolute inset-0 ${contact.bg} opacity-30`}></div>
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

            {/* Glowing top edge accent */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${contact.bg} opacity-80`}></div>

            <div className="relative z-10 p-5 flex flex-col gap-3">
                {/* Icon + Priority badge row */}
                <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-2xl ${contact.bg} border ${contact.border} group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className={contact.color} size={24} />
                    </div>
                    {contact.priority && (
                        <span className="text-[9px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full border border-red-500/40 animate-pulse">
                            ● PRIORITY
                        </span>
                    )}
                </div>

                {/* Text block */}
                <div>
                    <h3 className="font-bold text-white text-sm leading-tight mb-1">{contact.name}</h3>
                    <p className="text-slate-500 text-xs leading-snug">{contact.desc}</p>
                </div>

                {/* Phone number — full-width tap target */}
                <a
                    href={`tel:${contact.number}`}
                    className={`block text-2xl font-black ${contact.color} hover:brightness-125 transition-all tracking-tight mt-1 group-hover:scale-105 origin-left`}
                >
                    {contact.number}
                </a>
            </div>
        </div>
    );

    const SectionHeader = ({ title, subtitle }) => (
        <div className="mb-5">
            <h2 className="text-xl font-black text-white tracking-tight">{title}</h2>
            <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-fade-in-up pb-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-500 rounded-2xl mb-5 border border-red-500/20">
                    <Phone size={28} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">Emergency Contacts</h1>
                <p className="text-slate-400 mt-3 text-base max-w-xl mx-auto">
                    Critical assistance numbers for all disaster and emergency situations in India. Tap any number to call directly.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm font-bold">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    All numbers are active 24/7
                </div>
            </div>

            {/* Critical Numbers */}
            <div>
                <SectionHeader title="🚨 Critical Emergency Numbers" subtitle="Call these first in any life-threatening situation" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {criticalContacts.map((c, i) => <ContactCard key={i} contact={c} />)}
                </div>
            </div>

            {/* Disaster Management */}
            <div>
                <SectionHeader title="🌊 Disaster Management" subtitle="Authorities handling floods, earthquakes, cyclones & national disasters" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {disasterContacts.map((c, i) => <ContactCard key={i} contact={c} />)}
                </div>
            </div>

            {/* Helplines */}
            <div>
                <SectionHeader title="🤝 Specialized Helplines" subtitle="Support for vulnerable groups and specific emergencies" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {helplineContacts.map((c, i) => <ContactCard key={i} contact={c} />)}
                </div>
            </div>

            {/* Other Services */}
            <div>
                <SectionHeader title="🔧 Other Emergency Services" subtitle="Additional services for transport, utility, and other crises" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {otherContacts.map((c, i) => <ContactCard key={i} contact={c} />)}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-600 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-3">Still can't reach help?</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        If you're in immediate danger and cannot reach these numbers, move to a safe location and alert nearby authorities or community leaders.
                    </p>
                    <a
                        href="tel:112"
                        className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-900/30 gap-3"
                    >
                        <Phone size={22} />
                        Call National Emergency — 112
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Emergency;

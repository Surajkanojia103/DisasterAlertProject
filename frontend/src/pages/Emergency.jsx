import { Phone, Shield, Truck, Flame, Users, AlertCircle, Train, Map } from 'lucide-react';

const Emergency = () => {
    const contacts = [
        { name: 'Police', number: '100', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Fire', number: '101', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100' },
        { name: 'Ambulance', number: '102', icon: Truck, color: 'text-red-600', bg: 'bg-red-100' },
        { name: 'Disaster Management', number: '108', icon: Phone, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Women Helpline', number: '1091', icon: Users, color: 'text-pink-600', bg: 'bg-pink-100' },
        { name: 'Child Helpline', number: '1098', icon: Users, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { name: 'Gas Leakage', number: '1906', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
        { name: 'Tourist Helpline', number: '1363', icon: Map, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Railway Enquiry', number: '139', icon: Train, color: 'text-blue-800', bg: 'bg-blue-50' },
        { name: 'Road Accident', number: '1073', icon: Truck, color: 'text-slate-700', bg: 'bg-slate-200' },
        { name: 'NDRF Helpline', number: '9711077372', icon: Shield, color: 'text-slate-600', bg: 'bg-slate-100' },
    ];

    return (
        <div className="space-y-12 animate-fade-in-up">
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-500 rounded-2xl mb-6 border border-red-500/20">
                    <Phone size={32} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">Emergency Contacts</h1>
                <p className="text-slate-400 mt-4 text-lg">Immediate assistance numbers for disaster situations in India. Tap any number to call directly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact, index) => (
                    <div key={index} className="group bg-slate-900/50 backdrop-blur-sm rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-800 overflow-hidden">
                        <div className="p-8 flex items-start space-x-6">
                            <div className={`p-4 rounded-2xl bg-slate-800 group-hover:scale-110 transition-transform duration-300 border border-slate-700`}>
                                <contact.icon className={contact.color} size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-300 mb-1">{contact.name}</h3>
                                <a href={`tel:${contact.number}`} className="text-3xl font-black text-white hover:text-red-500 transition-colors tracking-tight">
                                    {contact.number}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-600 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Can't find what you need?</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">If you are in immediate danger and cannot reach these numbers, please try to move to a safe location and alert nearby authorities or community leaders.</p>
                    <a href="tel:112" className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-900/30">
                        <Phone size={24} className="mr-3" />
                        Call National Emergency (112)
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Emergency;

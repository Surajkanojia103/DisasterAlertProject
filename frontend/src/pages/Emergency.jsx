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
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-800">Emergency Contacts (India)</h1>
                <p className="text-slate-600 mt-2">Immediate assistance numbers for disaster situations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                        <div className={`p-4 rounded-full ${contact.bg}`}>
                            <contact.icon className={contact.color} size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800">{contact.name}</h3>
                            <a href={`tel:${contact.number}`} className="text-2xl font-bold text-slate-900 hover:text-blue-600">
                                {contact.number}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Emergency;

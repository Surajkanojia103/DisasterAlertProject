import { useState } from 'react';
import axios from 'axios';
import { Send, MapPin, AlertTriangle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        disasterType: '',
        location: '',
        description: '',
        severity: 'Medium',
        contact: '',
        affected: '',
        needs: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login to submit a report.");
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            const reportData = {
                ...formData,
                userName: user.name
            };

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${API_URL}/reports`, reportData, config);

            console.log('Report Submitted');
            setSubmitted(true);
            resetForm();
        } catch (error) {
            console.error("Error submitting report:", error);
            // Fallback for demo: Simulate success if backend fails
            console.log("Using fallback submission (Backend unavailable)");

            // Save to local storage for demo persistence
            const newReport = {
                _id: 'local-' + Date.now(),
                ...formData,
                userName: user.name,
                userId: user.id,
                status: 'Pending',
                timestamp: new Date().toISOString()
            };

            const existingReports = JSON.parse(localStorage.getItem('dars_reports') || '[]');
            localStorage.setItem('dars_reports', JSON.stringify([newReport, ...existingReports]));

            setSubmitted(true);
            resetForm();
        }
    };

    const resetForm = () => {
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                disasterType: '',
                location: '',
                description: '',
                severity: 'Medium',
                contact: '',
                affected: '',
                needs: ''
            });
            navigate('/user-panel');
        }, 2000);
    };

    return (
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl font-black text-white mb-8 flex items-center border-b border-slate-800 pb-6">
                <div className="bg-red-500/10 p-3 rounded-2xl mr-4 text-red-500 border border-red-500/20">
                    <AlertTriangle size={32} />
                </div>
                Report an Incident
            </h2>

            {submitted ? (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-6 rounded-2xl mb-6 flex items-start shadow-sm" role="alert">
                    <div className="bg-green-500/20 p-2 rounded-full mr-4 text-green-400">
                        <Send size={24} />
                    </div>
                    <div>
                        <strong className="font-bold text-lg block mb-1">Report Submitted Successfully!</strong>
                        <span className="block text-green-200/80">Your report has been received and is pending verification. You will be redirected to your dashboard shortly.</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="disasterType">
                                Disaster Type
                            </label>
                            <div className="relative">
                                <select
                                    name="disasterType"
                                    id="disasterType"
                                    value={formData.disasterType}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-4 appearance-none transition-all font-medium"
                                    required
                                >
                                    <option value="" className="bg-slate-900">Select Type</option>
                                    <option value="Flood" className="bg-slate-900">Flood</option>
                                    <option value="Earthquake" className="bg-slate-900">Earthquake</option>
                                    <option value="Fire" className="bg-slate-900">Fire / Wildfire</option>
                                    <option value="Cyclone" className="bg-slate-900">Cyclone / Hurricane</option>
                                    <option value="Landslide" className="bg-slate-900">Landslide</option>
                                    <option value="Tsunami" className="bg-slate-900">Tsunami</option>
                                    <option value="Drought" className="bg-slate-900">Drought</option>
                                    <option value="Volcano" className="bg-slate-900">Volcanic Eruption</option>
                                    <option value="Storm" className="bg-slate-900">Severe Storm</option>
                                    <option value="Heatwave" className="bg-slate-900">Heatwave</option>
                                    <option value="Other" className="bg-slate-900">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="location">
                                Location
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin size={20} className="text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block pl-12 p-4 transition-all font-medium placeholder:text-slate-600"
                                    placeholder="City, Area, or Coordinates"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="severity">
                                Severity Level
                            </label>
                            <div className="relative">
                                <select
                                    name="severity"
                                    id="severity"
                                    value={formData.severity}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-4 appearance-none transition-all font-medium"
                                >
                                    <option value="Low" className="bg-slate-900">Low - Minor impact</option>
                                    <option value="Medium" className="bg-slate-900">Medium - Requires attention</option>
                                    <option value="High" className="bg-slate-900">High - Immediate danger</option>
                                    <option value="Critical" className="bg-slate-900">Critical - Life threatening</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="affected">
                                People Affected (Approx)
                            </label>
                            <input
                                type="text"
                                name="affected"
                                id="affected"
                                value={formData.affected}
                                onChange={handleChange}
                                className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-4 transition-all font-medium placeholder:text-slate-600"
                                placeholder="e.g., 50-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="needs">
                            Immediate Needs
                        </label>
                        <input
                            type="text"
                            name="needs"
                            id="needs"
                            value={formData.needs}
                            onChange={handleChange}
                            className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-4 transition-all font-medium placeholder:text-slate-600"
                            placeholder="Food, Water, Medical, Shelter..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-4 h-32 transition-all font-medium resize-none placeholder:text-slate-600"
                            placeholder="Describe the situation in detail..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-slate-400 text-xs font-bold ml-1 uppercase tracking-wider" htmlFor="contact">
                            Contact Number (Optional)
                        </label>
                        <input
                            type="tel"
                            name="contact"
                            id="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent block p-4 transition-all font-medium placeholder:text-slate-600"
                            placeholder="For verification purposes"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center shadow-lg shadow-red-900/40 transition-all transform hover:-translate-y-1"
                        >
                            <Send size={20} className="mr-2" />
                            Submit Report
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReportForm;

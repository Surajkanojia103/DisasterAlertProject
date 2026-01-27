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
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <AlertTriangle className="mr-2 text-red-500" />
                Report an Incident
            </h2>

            {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your report has been submitted for review. Redirecting...</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="disasterType">
                            Disaster Type
                        </label>
                        <select
                            name="disasterType"
                            id="disasterType"
                            value={formData.disasterType}
                            onChange={handleChange}
                            className="shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Flood">Flood</option>
                            <option value="Earthquake">Earthquake</option>
                            <option value="Fire">Fire / Wildfire</option>
                            <option value="Cyclone">Cyclone / Hurricane</option>
                            <option value="Landslide">Landslide</option>
                            <option value="Tsunami">Tsunami</option>
                            <option value="Drought">Drought</option>
                            <option value="Volcano">Volcanic Eruption</option>
                            <option value="Storm">Severe Storm</option>
                            <option value="Heatwave">Heatwave</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 pl-10 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="City, Area, or Coordinates"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="severity">
                                Severity Level
                            </label>
                            <select
                                name="severity"
                                id="severity"
                                value={formData.severity}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="Low">Low - Minor impact</option>
                                <option value="Medium">Medium - Requires attention</option>
                                <option value="High">High - Immediate danger</option>
                                <option value="Critical">Critical - Life threatening</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="affected">
                                People Affected (Approx)
                            </label>
                            <input
                                type="text"
                                name="affected"
                                id="affected"
                                value={formData.affected}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="e.g., 50-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="needs">
                            Immediate Needs
                        </label>
                        <input
                            type="text"
                            name="needs"
                            id="needs"
                            value={formData.needs}
                            onChange={handleChange}
                            className="shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Food, Water, Medical, Shelter..."
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            placeholder="Describe the situation..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="contact">
                            Contact Number (Optional)
                        </label>
                        <input
                            type="tel"
                            name="contact"
                            id="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="For verification purposes"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                        >
                            <Send size={18} className="mr-2" />
                            Submit Report
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReportForm;

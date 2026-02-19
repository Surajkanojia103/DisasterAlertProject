import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { HandHeart, CheckCircle, ShieldCheck, Award, Clock } from 'lucide-react';
import axios from 'axios';

const Volunteer = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        skills: '',
        availability: true,
        location: '',
        contact: '',
        profession: '',
        experience: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                skills: user.skills ? user.skills.join(', ') : '',
                availability: user.availability !== undefined ? user.availability : true,
                location: user.location || '',
                contact: user.contact || '',
                profession: user.profession || '',
                experience: user.experience || '',
                reason: user.reason || ''
            });
        }
    }, [user]);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


            const payload = {
                skills: skillsArray,
                availability: formData.availability,
                location: formData.location,
                contact: formData.contact,
                profession: formData.profession,
                experience: formData.experience,
                reason: formData.reason
            };

            // Only request pending status if not already a volunteer
            if (!user.isVolunteer) {
                payload.applyForVolunteer = true;
            }

            const res = await axios.put(`${API_URL}/auth/profile`, payload, {
                headers: { 'x-auth-token': token }
            });

            if (res.data.user) {
                updateUser(res.data.user);
            }

            setSuccess(true);
            setLoading(false);
            if (isEditing) setIsEditing(false);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-white mb-4">Join the Cause</h2>
                <p className="text-slate-400 mb-8">Please log in to register as a volunteer.</p>
            </div>
        );
    }

    // Pending Status View
    if (user.volunteerStatus === 'pending' && !success) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up section-padding">
                <div className="glass-panel p-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500"></div>
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto text-yellow-500 mb-6 border border-yellow-500/20">
                        <Clock size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-4">Application Pending</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Your volunteer application is currently under review by our administrators. We will verify your details and get back to you soon.
                    </p>
                    <div className="mt-8">
                        <p className="text-sm text-slate-500">Thank you for your patience and willingness to help.</p>
                    </div>
                </div>
            </div>
        );
    }

    const [isEditing, setIsEditing] = useState(false);

    if (user.isVolunteer && !success && !isEditing) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up section-padding">
                <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"></div>
                    <Award size={64} className="mx-auto text-emerald-400 mb-6" />
                    <h1 className="text-4xl font-black text-white mb-4">You are a Hero!</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Thank you for being a registered volunteer. Your skills in <span className="text-white font-bold">{user.skills && user.skills.join(', ')}</span> help save lives.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up section-padding">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto text-purple-400 mb-6 border border-purple-500/20 shadow-lg shadow-purple-900/20">
                    <HandHeart size={40} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight mb-3">Become a Volunteer</h1>
                <p className="text-slate-400 text-lg">Join our network of responders and help your community during disasters.</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
                {success && !user.isVolunteer && (
                    <div className="absolute inset-0 bg-slate-900/95 z-10 flex items-center justify-center backdrop-blur-sm animate-fade-in">
                        <div className="text-center p-8">
                            <CheckCircle size={64} className="mx-auto text-emerald-400 mb-6" />
                            <h3 className="text-3xl font-bold text-white mb-2">{user.volunteerStatus === 'pending' ? 'Application Submitted!' : 'Registration Complete!'}</h3>
                            <p className="text-slate-400 mb-8">
                                {user.volunteerStatus === 'pending'
                                    ? 'Your application has been submitted for review.'
                                    : 'Thank you for updating your profile.'}
                            </p>
                            <button
                                onClick={() => {
                                    setSuccess(false);
                                    setIsEditing(false);
                                }}
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wider">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                placeholder="e.g. +91 9876543210"
                                className="w-full bg-slate-900/50 text-white border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wider">
                                Location (City/Area)
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. Mumbai, Andheri West"
                                className="w-full bg-slate-900/50 text-white border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wider">
                            Profession / Occupation
                        </label>
                        <input
                            type="text"
                            value={formData.profession}
                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                            placeholder="e.g. Doctor, Firefighter, Student, Engineer"
                            className="w-full bg-slate-900/50 text-white border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-500 transition-all placeholder-slate-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wider">
                            Relevant Experience (Years/Description)
                        </label>
                        <input
                            type="text"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="e.g. 2 years in Red Cross, Certified First Responder"
                            className="w-full bg-slate-900/50 text-white border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wider">
                            Why do you want to join?
                        </label>
                        <textarea
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            placeholder="Briefly describe your motivation..."
                            className="w-full bg-slate-900/50 text-white border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600 h-24 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wider">
                            Your Skills (comma separated)
                        </label>
                        <input
                            type="text"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            placeholder="e.g. First Aid, CPR, Search & Rescue, Medical, Driving"
                            className="w-full bg-slate-900/50 text-white border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <input
                            type="checkbox"
                            id="availability"
                            checked={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                            className="w-6 h-6 rounded border-slate-600 text-purple-600 focus:ring-purple-500 bg-slate-700"
                        />
                        <label htmlFor="availability" className="text-white font-medium cursor-pointer select-none">
                            I am currently available to help
                        </label>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <ShieldCheck className="text-blue-400 shrink-0 mt-1" size={20} />
                        <p className="text-sm text-blue-200/80 leading-relaxed">
                            By registering, you agree to submit your details for verification. You will be contacted once your application is approved.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                    >
                        {loading ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <HandHeart size={20} />
                                {user.volunteerStatus === 'pending' || user.isVolunteer ? 'Update Application' : 'Submit Application'}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Volunteer;

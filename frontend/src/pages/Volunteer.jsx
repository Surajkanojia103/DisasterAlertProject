import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { HandHeart, CheckCircle, Clock, MapPin, Phone, Award, User as UserIcon, Briefcase, ShieldCheck, HeartPulse, Send, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Volunteer = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        bloodGroup: '',
        profession: '',
        skills: '',
        contact: '',
        availability: true,
        reason: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                address: user.location || '',
                bloodGroup: user.bloodGroup || '',
                profession: user.profession || '',
                skills: user.skills ? user.skills.join(', ') : '',
                contact: user.contact || '',
                availability: user.availability !== undefined ? user.availability : true,
                reason: user.reason || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

            const payload = {
                name: formData.name,
                location: formData.address,
                bloodGroup: formData.bloodGroup,
                profession: formData.profession,
                skills: skillsArray,
                contact: formData.contact,
                availability: formData.availability,
                reason: formData.reason,
                applyForVolunteer: !user.isVolunteer
            };

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
            setError(err.response?.data?.message || 'Failed to update. Please check your data.');
            setLoading(false);
        }
    };



    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center">
                <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">Volunteer <span className="text-rose-500">Registration</span></h1>
                <p className="text-slate-400 mt-3 text-lg">Provide your tactical details for emergency deployment verification.</p>
            </div>

            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent"></div>

                {!user ? (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto text-rose-500 mb-6 border border-rose-500/20">
                            <HandHeart size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-4 italic uppercase">Tactical Auth Required</h2>
                        <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium">Please login to the DARS network to access the enlistment portal.</p>
                        <a href="/login" className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-900/30 text-xs">Connect to Network</a>
                    </div>
                ) : success ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-emerald-400 flex flex-col items-center text-center animate-fade-in shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <div className="bg-emerald-500/20 p-5 rounded-full border border-emerald-500/30 mb-6">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tighter">Registration Transmitted</h3>
                        <p className="text-emerald-200/70 mb-8 max-w-sm font-medium">Your tactical profile has been received. DARS Command is processing your deployment eligibility.</p>
                        <button
                            onClick={() => { setSuccess(false); setIsEditing(false); }}
                            className="px-10 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/40 text-[10px]"
                        >
                            Return to Grid
                        </button>
                    </div>
                ) : user.volunteerStatus === 'pending' && !isEditing ? (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto text-yellow-500 mb-8 border border-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                            <Clock size={48} className="animate-pulse" />
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Tactical <span className="text-yellow-500">Vetting</span></h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md mx-auto font-medium">
                            Your credentials have been submitted. DARS Command is currently verifying your expertise for deployment.
                        </p>
                        <div className="inline-flex flex-col items-center gap-4">
                            <div className="px-8 py-3 bg-slate-950 border border-yellow-500/30 text-yellow-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                Vetting Progress: 65%
                            </div>
                            <button onClick={() => setIsEditing(true)} className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors mt-2">Update Tactical Profile</button>
                        </div>
                    </div>
                ) : user.isVolunteer && !isEditing ? (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 mb-8 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                            <Award size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Operative <span className="text-emerald-500">Verified</span></h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md mx-auto font-medium">
                            You are currently enlisted as a DARS Responder. Your profile is active in our tactical grid.
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-10 py-4 bg-slate-950 text-emerald-500 rounded-2xl font-black uppercase tracking-widest transition-all border border-emerald-500/30 hover:bg-emerald-500 hover:text-white text-[10px] shadow-xl"
                        >
                            Update Tactical Profile
                        </button>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-3xl mb-10 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest">
                                <AlertCircle size={20} /> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Part 1: Identity */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                                    <UserIcon size={18} className="text-rose-500" />
                                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Operative Identity</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Enlistment Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter full name"
                                            className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm shadow-inner"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Blood Group</label>
                                        <div className="relative">
                                            <HeartPulse className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-500/50" size={18} />
                                            <select
                                                value={formData.bloodGroup}
                                                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                                className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm shadow-inner appearance-none cursor-pointer"
                                                required
                                            >
                                                <option value="">Select Group</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Current Deployment Address / Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-500/50" size={18} />
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Street, City, Sector"
                                            className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Part 2: Expertise */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                                    <Briefcase size={18} className="text-rose-500" />
                                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Tactical Expertise</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Current Occupation</label>
                                        <input
                                            type="text"
                                            value={formData.profession}
                                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                            placeholder="e.g. Doctor, Firefighter"
                                            className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm shadow-inner"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Contact Channel (Phone)</label>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-500/50" size={18} />
                                            <input
                                                type="text"
                                                value={formData.contact}
                                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                placeholder="Mobile Number"
                                                className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm shadow-inner"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Tactical Specialization / Skills</label>
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-5 top-5 text-rose-500/50" size={18} />
                                        <textarea
                                            value={formData.skills}
                                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                            placeholder="First Aid, Search & Rescue, High-Stress Driving... (comma separated)"
                                            className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-[2rem] pl-12 pr-6 py-5 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm h-32 resize-none shadow-inner leading-relaxed"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Motivation / Professional Bio</label>
                                    <div className="relative">
                                        <HeartPulse className="absolute left-5 top-5 text-rose-500/50" size={18} />
                                        <textarea
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            placeholder="Why do you want to join the DARS Response Force? (Your bio will be visible to Command)"
                                            className="w-full bg-slate-900/50 text-white border border-slate-800 rounded-[2rem] pl-12 pr-6 py-5 focus:outline-none focus:border-rose-500/50 transition-all font-bold text-sm h-32 resize-none shadow-inner leading-relaxed"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 bg-slate-950/50 p-6 rounded-[2rem] border border-slate-800/80 shadow-inner group-hover:border-rose-500/20 transition-all duration-700">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.availability}
                                        onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-8 bg-slate-800 rounded-full peer peer-checked:bg-rose-600 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full border border-slate-700/50 shadow-sm"></div>
                                </label>
                                <div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Deployment Readiness</span>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Operative is ready for tactical response</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center shadow-lg shadow-rose-900/40 transition-all transform hover:-translate-y-1"
                                >
                                    <Send size={20} className="mr-2" />
                                    {loading ? 'Transmitting Data...' : 'Finalize Enlistment'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Volunteer;

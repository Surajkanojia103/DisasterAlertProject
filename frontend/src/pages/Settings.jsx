import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Shield, User, Smartphone, Moon } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [isProfileEditing, setIsProfileEditing] = useState(false);

    // Profile Data State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        gender: user?.gender || '',
        contact: user?.contact || ''
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // Initialize profile data (and update if user changes)
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                gender: user.gender || 'Prefer not to say',
                contact: user.contact || ''
            });
        }
    }, [user]);

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            // Use axios directly, ensure it is imported
            const res = await axios.put(`${API_URL}/auth/profile`, profileData, config);

            // Update localStorage and reload to refresh context
            localStorage.setItem('dars_user', JSON.stringify(res.data.user));
            window.location.reload();

            setIsProfileEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        }
    };

    const handlePasswordUpdate = async () => {
        // ... (existing implementation)
        setMessage({ type: '', text: '' });

        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setMessage({ type: 'error', text: 'All fields are required.' });
            return;
        }

        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        if (passwords.new.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // For demo purposes: fail if current password is 'wrong'
            if (passwords.current === 'wrong') {
                setMessage({ type: 'error', text: 'Incorrect current password.' });
            } else {
                setMessage({ type: 'success', text: 'Password updated successfully.' });
                setPasswords({ current: '', new: '', confirm: '' });
                // Optional: Close the form after success
                // setIsPasswordEditing(false);
            }
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white flex items-center">
                    <SettingsIcon size={32} className="mr-4 text-indigo-500" />
                    Settings
                </h1>
                <p className="text-slate-400 mt-2">Manage your account preferences and notification settings.</p>
            </div>

            <div className="grid gap-6">
                {/* Account Settings */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <User size={24} className="mr-3 text-blue-500" />
                        Account
                    </h2>
                    <div className="space-y-4">
                        {/* Profile Information Section */}
                        <div className="bg-slate-950/50 rounded-xl border border-slate-800/50 overflow-hidden transition-all duration-300">
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <h3 className="text-white font-medium">Profile Information</h3>
                                    <p className="text-sm text-slate-400">Update your name and contact details</p>
                                </div>
                                <button
                                    onClick={() => setIsProfileEditing(!isProfileEditing)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-colors"
                                >
                                    {isProfileEditing ? 'Cancel' : 'Edit'}
                                </button>
                            </div>

                            {/* Collapsible Content */}
                            <div className={`border-t border-slate-800/50 transition-all duration-300 ${isProfileEditing || !isProfileEditing ? 'block' : 'hidden'}`}>
                                <div className="p-4 space-y-4">
                                    {!isProfileEditing ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Name</span>
                                                <span className="text-white font-medium">{user?.name}</span>
                                            </div>
                                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Email</span>
                                                <span className="text-slate-300 font-medium">{user?.email}</span>
                                            </div>
                                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Contact</span>
                                                <span className="text-white font-medium">{user?.contact || 'Not set'}</span>
                                            </div>
                                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Gender</span>
                                                <span className="text-white font-medium">{user?.gender || 'Not set'}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleProfileUpdate} className="space-y-4 animate-fade-in-down">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Gender</label>
                                                    <select
                                                        value={profileData.gender}
                                                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                                                    >
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Contact</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.contact}
                                                        onChange={(e) => setProfileData({ ...profileData, contact: e.target.value })}
                                                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                                        placeholder="+1 234 567 890"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-2">
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Password Section (Unchanged) */}
                        <div className="bg-slate-950/50 rounded-xl border border-slate-800/50 overflow-hidden transition-all duration-300">
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <h3 className="text-white font-medium">Password & Security</h3>
                                    <p className="text-sm text-slate-400">Change your password and security questions</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsPasswordEditing(!isPasswordEditing);
                                        setMessage({ type: '', text: '' });
                                        setPasswords({ current: '', new: '', confirm: '' });
                                    }}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-colors"
                                >
                                    {isPasswordEditing ? 'Cancel' : 'Update'}
                                </button>
                            </div>

                            {isPasswordEditing && (
                                <div className="p-4 border-t border-slate-800/50 space-y-4 animate-fade-in-down">
                                    {message.text && (
                                        <div className={`px-4 py-3 rounded-lg text-sm font-bold flex items-center ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                            {message.type === 'error' ? <SettingsIcon size={16} className="mr-2" /> : <Shield size={16} className="mr-2" />}
                                            {message.text}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Current Password</label>
                                        <input
                                            type="password"
                                            name="current"
                                            value={passwords.current}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">New Password</label>
                                            <input
                                                type="password"
                                                name="new"
                                                value={passwords.new}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirm"
                                                value={passwords.confirm}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            onClick={handlePasswordUpdate}
                                            disabled={loading}
                                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* App Settings */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Smartphone size={24} className="mr-3 text-purple-500" />
                        App Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                            <div className="flex items-center">
                                <Moon size={20} className="mr-3 text-slate-400" />
                                <div>
                                    <h3 className="text-white font-medium">Dark Mode</h3>
                                    <p className="text-sm text-slate-400">Toggle application theme</p>
                                </div>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-indigo-600">
                                <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow-sm"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

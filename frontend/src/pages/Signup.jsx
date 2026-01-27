import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, AlertTriangle } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await signup(name, email, password);
        if (result.success) {
            navigate('/user-panel');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="flex justify-center mb-8">
                        <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-inner">
                            <UserPlus size={40} />
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
                        <p className="text-slate-500 mt-2">Join DARS to help your community</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center">
                            <AlertTriangle size={16} className="mr-2 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 font-bold text-lg"
                        >
                            <UserPlus size={22} />
                            <span>Sign Up</span>
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 font-bold hover:underline">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

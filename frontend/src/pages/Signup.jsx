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
            <div className="max-w-md w-full glass-panel p-10 rounded-[2rem] animate-fade-in-up">
                <div className="flex justify-center mb-8">
                    <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500 shadow-inner border border-blue-500/20">
                        <UserPlus size={40} />
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
                    <p className="text-slate-400 mt-2 font-medium">Join the DARS network today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-bold flex items-center">
                        <AlertTriangle size={16} className="mr-2 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600 font-medium"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600 font-medium"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600 font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center space-x-2 font-bold text-lg group"
                    >
                        <UserPlus size={22} className="group-hover:translate-x-1 transition-transform" />
                        <span>Sign Up</span>
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-500 font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 font-bold hover:text-blue-300 transition-colors hover:underline">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

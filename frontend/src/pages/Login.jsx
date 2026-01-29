import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertTriangle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                if (result.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/user-panel');
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full glass-panel p-10 rounded-[2rem] animate-fade-in-up">
                <div className="flex justify-center mb-8">
                    <div className="bg-red-500/10 p-4 rounded-2xl text-red-500 shadow-inner border border-red-500/20">
                        <AlertTriangle size={40} />
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
                    <p className="text-slate-400 mt-2 font-medium">Sign in to access the command center</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-bold flex items-center">
                        <AlertTriangle size={16} className="mr-2 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="name@example.com"
                            required
                            disabled={isLoggingIn}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs text-red-400 hover:text-red-300 font-bold transition-colors">Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                            required
                            disabled={isLoggingIn}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-500 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center space-x-2 font-bold text-lg group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoggingIn ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <>
                                <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-500 font-medium">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-red-400 font-bold hover:text-red-300 transition-colors hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

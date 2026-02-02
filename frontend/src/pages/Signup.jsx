import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsSigningUp(true);

        try {
            const result = await signup(name, email, password);
            if (result.success) {
                navigate('/user-panel');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1E202E] flex items-center justify-center p-4 font-sans text-white relative overflow-hidden">

            {/* Static Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                    alt="Background"
                    className="w-full h-full object-cover opacity-40"
                />
                {/* Overlay to ensure readability */}
                <div className="absolute inset-0 bg-[#1E202E]/70 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E202E]/50 to-[#1E202E]"></div>
            </div>

            {/* Background Blob Effects (Static) */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FF3B60]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="w-full max-w-[440px] relative z-10">
                {/* Glass Card Container */}
                <div className="bg-[#242736]/60 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-12 shadow-[0_0_40px_-5px_rgba(0,0,0,0.3)] relative">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black text-white tracking-wider uppercase relative inline-block">
                            Sign Up
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FF3B60] rounded-full shadow-[0_0_10px_#FF3B60]"></span>
                        </h1>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-[#FF3B60] text-[#FF3B60] p-3 rounded-xl text-xs font-medium text-center mb-6">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* First Name Input */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF3B60] transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#1E202E] border border-slate-600 focus:border-[#FF3B60] rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(255,59,96,0.15)]"
                                placeholder="Full Name"
                                required
                                disabled={isSigningUp}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF3B60] transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1E202E] border border-slate-600 focus:border-[#FF3B60] rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(255,59,96,0.15)]"
                                placeholder="Email"
                                required
                                disabled={isSigningUp}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF3B60] transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1E202E] border border-slate-600 focus:border-[#FF3B60] rounded-2xl py-4 pl-12 pr-16 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(255,59,96,0.15)]"
                                placeholder="Password"
                                required
                                disabled={isSigningUp}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF3B60] transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-[#1E202E] border border-slate-600 focus:border-[#FF3B60] rounded-2xl py-4 pl-12 pr-16 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(255,59,96,0.15)]"
                                placeholder="Confirm Password"
                                required
                                disabled={isSigningUp}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center space-x-2 text-xs px-1">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        required
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 border-2 border-slate-600 rounded bg-transparent peer-checked:bg-[#FF3B60] peer-checked:border-[#FF3B60] transition-all"></div>
                                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-slate-400 group-hover:text-white transition-colors">I Agree with <a href="#" className="text-[#FF3B60] hover:text-[#FF204E] font-medium transition-colors hover:underline decoration-[#FF3B60]/30 underline-offset-4">privacy</a> and <a href="#" className="text-[#FF3B60] hover:text-[#FF204E] font-medium transition-colors hover:underline decoration-[#FF3B60]/30 underline-offset-4">policy</a></span>
                            </label>
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className="w-full bg-gradient-to-r from-[#FF3B60] to-[#FF204E] hover:from-[#FF204E] hover:to-[#FF0F3E] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_25px_-5px_rgba(255,59,96,0.5)] transition-all transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 relative overflow-hidden"
                        >
                            <span className="relative z-10">{isSigningUp ? 'Signing Up...' : 'Sign up'}</span>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center pt-6 border-t border-slate-700/50 mt-6">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#FF3B60] font-bold hover:text-white transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;

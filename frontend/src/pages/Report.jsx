import ReportForm from '../components/ReportForm';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const Report = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center">
                <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">Citizen <span className="text-red-500">Reporting</span></h1>
                <p className="text-slate-400 mt-3 text-lg">Help us track disasters by reporting incidents in your area.</p>
            </div>

            {!user ? (
                <div className="glass-panel p-12 rounded-[2.5rem] text-center space-y-8 border border-slate-800">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20 shadow-lg shadow-red-900/20">
                        <LogIn size={48} />
                    </div>
                    <div className="max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-white">Account Required</h2>
                        <p className="text-slate-400 mt-4 text-lg leading-relaxed">To ensure the accuracy of our data and prevent spam, you must be logged in to submit a disaster report.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link
                            to="/login"
                            className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-900/30 text-lg"
                        >
                            Login Now
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-slate-800 text-slate-300 border border-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-700 hover:text-white transition-all text-lg"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            ) : (
                <ReportForm />
            )}
        </div>
    );
};

export default Report;

import ReportForm from '../components/ReportForm';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const Report = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Citizen Reporting</h1>
                <p className="text-slate-600 mt-3 text-lg">Help us track disasters by reporting incidents in your area.</p>
            </div>

            {!user ? (
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center space-y-6">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600">
                        <LogIn size={40} />
                    </div>
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-slate-800">Account Required</h2>
                        <p className="text-slate-600 mt-2">To ensure the accuracy of our data, you must be logged in to submit a disaster report.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link
                            to="/login"
                            className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                        >
                            Login Now
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
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

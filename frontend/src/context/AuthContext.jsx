import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios base URL (optional, but good practice)
    // axios.defaults.baseURL = 'http://localhost:5000/api'; 
    // For now, we'll use full URLs or proxy. Let's use full URLs for clarity.
    const API_URL = `${BASE_URL}/auth`;

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('dars_user');

            if (token && storedUser) {
                // Ideally, verify token with backend here
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['x-auth-token'] = token;
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('dars_user', JSON.stringify(res.data.user));

            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setUser(res.data.user);

            return { success: true, role: res.data.user.role };
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed. Check server connection.'
            };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, { name, email, password });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('dars_user', JSON.stringify(res.data.user));

            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setUser(res.data.user);

            return { success: true };
        } catch (error) {
            console.error("Signup error:", error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed.'
            };
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('dars_user', JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('dars_user');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

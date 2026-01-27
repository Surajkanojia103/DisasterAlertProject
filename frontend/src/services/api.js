import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchAlerts = async () => {
    try {
        const response = await axios.get(`${API_URL}/alerts`);
        const alerts = response.data;

        if (alerts.length === 0) {
            return [{
                id: 'fallback-1',
                title: 'System Notice: Live Data Unavailable',
                description: 'Unable to fetch real-time alerts from global agencies. Please check your internet connection or try again later.',
                link: '#',
                date: new Date().toISOString(),
                source: 'System',
                type: 'General'
            }];
        }

        return alerts;
    } catch (error) {
        console.error("Failed to fetch alerts from backend:", error);
        return [{
            id: 'fallback-error',
            title: 'System Notice: Connection Error',
            description: 'Could not connect to the alert server. Please ensure the backend is running.',
            link: '#',
            date: new Date().toISOString(),
            source: 'System',
            type: 'General'
        }];
    }
};


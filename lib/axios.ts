import axios from 'axios';

const api = axios.create({
    // Production aur Local dono ke liye automatic switch
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    // Timeout set karna achi practice hai takay request phansi na rahe
    timeout: 10000,
});

// --- Interceptors (Optional but VIP) ---
// Agar kabhi token bhejni paray admin dashboard ke liye to ye kaam aayega
api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
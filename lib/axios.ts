import axios from 'axios';

const api = axios.create({
    // Aapka backend local server URL
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Agar aapne images upload karni hain (FormData ke liye), 
// to axios khud hi boundary set kar leta hai, tension nahi leni.

export default api;
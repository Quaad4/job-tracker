import axios from 'axios'

// Single reusable Axios instance shared across the app.
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default apiClient
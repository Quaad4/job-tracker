import axios from 'axios'

// Single reusable Axios instance shared across the app.
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Attach token to every request if it exists in localStorage
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle expired or invalid tokens globally
apiClient.interceptors.response.use(
    // Success — just return the response as normal
    (response) => response,
    // Error — check if token is invalid/expired
    (error) => {
        if (error.response?.status === 401) {
            // Clear invalid token and redirect to login
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default apiClient
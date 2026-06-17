import apiClient from './axios'

export const authLogin = (credentials) => {
    return apiClient.post('auth/login', credentials)
}

export const authRegister = (userData) => {
    return apiClient.post('auth/register', userData)
}

import apiClient from './axios'

export const authLogin = (credentials) => {
    return apiClient.post('auth/login', credentials)
}
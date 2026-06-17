import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authLogin, authRegister, authLogout } from '../api/auth'

export const useAuthStore = defineStore('auth', () => {

    // state
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const token = ref(localStorage.getItem('token') || null)

    // computed
    const isAuthenticated = computed(() => !!token.value)

    const login = async (userData) => {
        try {
            const response = await authLogin(userData)
            token.value = response.data.token
            user.value = response.data.user
            localStorage.setItem('token', token.value)
            localStorage.setItem('user', JSON.stringify(response.data.user)) 
        } catch (error) {
            console.error('Login failed:', error)
            throw error // LoginView can catch it
        }
    }

    const register = async (userData) => {
        try {
            const response = await authRegister(userData)
            token.value = response.data.token
            user.value = response.data.user
            localStorage.setItem('token', token.value)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch (error) {
            console.error('Registration failed:', error)
            throw error // RegisterView can catch it
        }
    }

    const logout = async () => {
        try {
            await authLogout()
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            token.value = null
            user.value = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout
    }
})
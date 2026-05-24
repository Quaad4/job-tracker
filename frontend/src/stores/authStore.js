import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authLogin } from '../api/auth'

export const useAuthStore = defineStore('auth', () => {

    // state
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)

    // computed
    const isAuthenticated = computed(() => !!token.value)

    const login = async (userData) => {
        try {
            const response = await authLogin(userData)
            token.value = response.data.token
            user.value = response.data.user
            localStorage.setItem('token', token.value)
        } catch (error) {
            console.error('Login failed:', error)
            throw error // LoginView can catch it
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
    }
})
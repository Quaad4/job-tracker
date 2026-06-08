<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-sm p-8 w-full max-w-md">

            <!-- Header -->
            <div class="mb-6 text-center">
                <h1 class="text-2xl font-bold text-gray-800">Job Tracker</h1>
                <p class="text-gray-500 text-sm mt-1">Sign in to your account</p>
            </div>

            <!-- Error message -->
            <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-600 text-sm">{{ errorMessage }}</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        v-model="email"
                        type="email"
                        placeholder="you@example.com"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="••••••••"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
            </form>

            <!-- Register link -->
            <p class="text-center text-sm text-gray-500 mt-4">
                Don't have an account?
                <RouterLink to="/register" class="text-blue-600 hover:text-blue-800 font-medium">Register</RouterLink>
            </p>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
    errorMessage.value = ''
    loading.value = true
    try {
        await authStore.login({ email: email.value, password: password.value })
        router.push('/')
    } catch (error) {
        errorMessage.value = 'Invalid email or password. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>
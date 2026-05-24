<template>
    <div>
        <main class="max-w-4xl mx-auto px-4 py-8">
            <div class="flex items-center justify-center min-h-screen">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <form @submit.prevent="handleLogin">
                        <input v-model="email" type="email" placeholder="Email" />
                        <input v-model="password" type="password" placeholder="Password" />
                        <button type="submit" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" v-if="!authStore.isAuthenticated">Login</button>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = () => {
    authStore.login({ email: email.value, password: password.value })
}
</script>
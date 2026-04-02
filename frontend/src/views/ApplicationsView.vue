<template>
    <div class="bg-blue-100 min-h-screen">        

        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
                <h1 class="text-2x1 font-bold text-gray-800">🗂 Job Tracker</h1>
                <button class="bg-blue-600 hover:bg-blue-709 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">+ Add Application</button>
            </div>
        </header>

    </div>    
</template>

<script setup>

import { onMounted } from 'vue';
import { useApplicationStore } from '@/stores/applicationStore';

const store = useApplicationStore()

onMounted(() => {
    store.fetchApplications()
})

</script>
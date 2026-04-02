<template>
    <div class="bg-blue-100 min-h-screen">        

        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
                <h1 class="text-2x1 font-bold text-gray-800">🗂 Job Tracker</h1>
                <button class="bg-blue-600 hover:bg-blue-709 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">+ Add Application</button>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex gap-2 mb-6">
                <button @click="store.setFilter(null)" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === null ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">All</button>
                <button @click="store.setFilter('applied')"  class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'applied' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Applied</button>
                <button @click="store.setFilter('interview')" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'interview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Interview</button>
                <button @click="store.setFilter('offer')" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'offer' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Offer</button>
                <button @click="store.setFilter('rejected')" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'rejected' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Rejected</button>
            </div>
        </main>

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
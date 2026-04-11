<template>
    <div class="bg-blue-100 min-h-screen"> 
        
        <ApplicationModal ref="modal"/>

        <!-- Header and Add applications button -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
                <h1 class="text-2x1 font-bold text-gray-800">🗂 Job Tracker</h1>
                <button @click="modal.openCreate()" class="bg-blue-600 hover:bg-blue-709 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">+ Add Application</button>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-8">

            <!-- Filters -->
            <div class="flex gap-2 mb-6">
                <button @click="store.setFilter(null)" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === null ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">All</button>
                <button @click="store.setFilter('applied')"  class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'applied' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Applied</button>
                <button @click="store.setFilter('interview')" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'interview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Interview</button>
                <button @click="store.setFilter('offer')" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'offer' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Offer</button>
                <button @click="store.setFilter('rejected')" class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" :class="store.filters.status === 'rejected' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'">Rejected</button>
            </div>

            <!-- Loading state -->
            <div v-if="store.loading" class="text-center py-12 text-gray-500">
                Loading...
            </div>
    
            <!-- Applications grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                    v-for="application in store.applications"
                    :key="application.id"
                    class="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
                    @click="modal.openEdit(application)"
                >
                    <h2 class="font-semibold text-gray-800 text-lg">{{ application.company }}</h2>
                    <p class="text-gray-500 text-sm mt-1">{{ application.role }}</p>
                    
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-xs text-gray-400">{{ application.date_applied }}</span>
                        <span 
                            class="px-2 py-1 rounded-full text-xs font-medium"
                            :class="{
                                'bg-blue-100 text-blue-700': application.status === 'applied',
                                'bg-yellow-100 text-yellow-700': application.status === 'interview',
                                'bg-green-100 text-green-700': application.status === 'offer',
                                'bg-red-100 text-red-700': application.status === 'rejected',
                            }"
                        >
                            {{ application.status }}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Empty state -->
            <div 
                v-if="!store.loading && store.applications.length === 0"

                class="text-center py-12"
            >
                <p class="text-gray-500 text-lg">No applications found</p>
                <p class="text-gray-400 text-sm mt-2">Try a different filter or add a new application</p>
            </div>
            
            <!-- Pagination -->
            <div class="mt-8 flex justify-center items-center gap-4">
                <button
                    :disabled="store.pagination.currentPage === 1"
                    @click="store.setPage(store.pagination.currentPage - 1)"
                    class="px-4 py-2 rounded-lg bg-white shadow-sm text-sm text-gray-600 cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>
                <span class="text-sm text-gray-600">
                    Page {{ store.pagination.currentPage }} of {{ store.pagination.lastPage }}
                </span>
                <button
                    :disabled="store.pagination.currentPage === store.pagination.lastPage"
                    @click="store.setPage(store.pagination.currentPage + 1)"
                    class="px-4 py-2 rounded-lg bg-white shadow-sm text-sm text-gray-600 cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next →
                </button>
            </div>


        </main>

    </div>    
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useApplicationStore } from '@/stores/applicationStore';
import ApplicationModal from '../components/ApplicationModal.vue'

const store = useApplicationStore()
const modal = ref(null)  

onMounted(() => {
    store.fetchApplications()
})

</script>
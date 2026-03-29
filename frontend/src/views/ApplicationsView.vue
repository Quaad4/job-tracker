<template>
    <div>
        <h1>Job Tracker</h1>
        <p v-if="store.loading">Loading...</p>
        <ul v-else>
            <li v-for="application in store.applications" 
                :key="application.id">
                {{ application.company }} — {{ application.role }}
            </li>
        </ul>
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
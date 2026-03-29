import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getApplications } from '../api/applications'

export const useApplicationStore = defineStore('applications', () => {

    const applications = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchApplications = async () => {

        loading.value = true
        try {            
            const response = await getApplications()
            applications.value = response.data.data
        } catch(err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    const getApplicationById = (id) => {
        return applications.value.find(app => app.id === id)
    }

    return {
        applications,
        loading,
        error,
        fetchApplications,
        getApplicationById,
    }
})
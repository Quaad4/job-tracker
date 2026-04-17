import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getApplications, storeApplication, updateApplication, destroyApplication } from '../api/applications'

export const useApplicationStore = defineStore('applications', () => {

    const applications = ref([])
    const loading = ref(false)
    const filters = ref({
        status: null,
    })
    const pagination = ref({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 10,
    })
    const feedback = ref('')
    const feedbackType = ref('') // 'success' or 'error'

    //Temp feedback flash
    const setFeedback = (message, type='success') => {
        feedbackType.value = type
        feedback.value = message
        setTimeout(() => {
            feedback.value = ''
            feedbackType.value = ''
        }, 5000)
    }

    const setPage = (page) => {
        pagination.value.currentPage = page
        fetchApplications()
    }

    // Reset to page 1 — filter changes the dataset size so current page may no longer exist
    const setFilter = (filter) => {
        filters.value.status = filter
        pagination.value.currentPage = 1
        fetchApplications()
    }

    // Only include status if active — prevents empty ?status= being sent to the API
    const fetchApplications = async () => {

        loading.value = true
        try {            
            const params = {
                page: pagination.value.currentPage,
                ...(filters.value.status && { status: filters.value.status }),
            }

            const response = await getApplications(params)
            applications.value = response.data.data
            pagination.value = {
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
            }
        } catch(err) {
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    // Rethrow so ApplicationModal can catch 422 errors and display field-level validation messages
    const createApplication = async (application) => {
        loading.value = true
        feedback.value = ''
        try {
            await storeApplication(application)
            await fetchApplications()
            setFeedback("Application created successfully")
        } catch (err) {
            console.error(err)
            setFeedback("Something went wrong — please try again", "error")
            throw err
        } finally {
            loading.value = false
        }
    }

    // Local update only — editing doesn't affect pagination, avoids unnecessary API call
    const editApplication = async (id, data) => {
        loading.value = true
        feedback.value = ''
        try{
            const response = await updateApplication(id, data)
            applications.value = applications.value.map(app => {
                return app.id === id ? response.data : app
            })
            setFeedback("Application updated successfully")
        } catch (err) {
            console.log(err)
            setFeedback("Something went wrong — please try again", "error")
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteApplication = async (id) => {
        loading.value = true
        feedback.value = ''
        try {
            await destroyApplication(id)
            await fetchApplications()
            setFeedback("Application deleted successfully")
        } catch (err) {
            console.error(err)
            setFeedback("Something went wrong — please try again", "error")
        } finally {
            loading.value = false
        }
    }

    // Find locally — data already loaded in store
    const getApplicationById = (id) => {
        return applications.value.find(app => app.id === id)
    }

    return {
        applications,
        loading,
        filters,
        pagination,
        feedback,
        feedbackType,
        setPage,
        setFilter,
        fetchApplications,
        getApplicationById,
        createApplication,
        editApplication,
        deleteApplication,
    }
})
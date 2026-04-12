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

    const setPage = (page) => {
        pagination.value.currentPage = page
        fetchApplications()
    }

    const setFilter = (filter) => {
        filters.value.status = filter
        pagination.value.currentPage = 1
        fetchApplications()
    }

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

    const createApplication = async (application) => {
        loading.value = true
        try {
            await storeApplication(application)
            await fetchApplications()
        } catch (err) {
            console.error(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const editApplication = async (id, data) => {
        loading.value = true
        try{
            const response = await updateApplication(id, data)
            applications.value = applications.value.map(app => {
                return app.id === id ? response.data : app
            })
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteApplication = async (id) => {
        loading.value = true
        try {
            await destroyApplication(id)
            await fetchApplications()
        } catch (err) {
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
        filters,
        pagination,
        setPage,
        setFilter,
        fetchApplications,
        getApplicationById,
        createApplication,
        editApplication,
        deleteApplication,
    }
})
import apiClient from './axios'

export const getApplications = () => {
    return apiClient.get('/applications')
}

// Available for direct API fetching if needed
// Currently handled locally via getApplicationById in the store
export const showApplication = (id) => {
    return apiClient.get(`/applications/${id}`)
}

export const storeApplication = (data) => {
    return apiClient.post('/applications', data)
}

export const updateApplication = (id, data) => {
    return apiClient.put(`/applications/${id}`, data)
}

export const destroyApplication = (id) => {
    return apiClient.delete(`/applications/${id}`)
}
import apiClient from './axios'

// status is only included when active — prevents empty ?status= in URL
export const getApplications = (params = {}) => {
    return apiClient.get('/applications', { params })
}

// Available for direct fetching if needed — currently resolved locally via store
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
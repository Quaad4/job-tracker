import apiClient from './axios'

export const getApplications = () => {
    return apiClient.get('/applications')
}

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
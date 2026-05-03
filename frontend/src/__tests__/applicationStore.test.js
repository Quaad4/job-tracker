import { vi, describe, it, expect, beforeEach } from 'vitest'     
import { setActivePinia, createPinia } from 'pinia'
import { useApplicationStore } from "@/stores/applicationStore";
import { getApplications, storeApplication, updateApplication, destroyApplication  } from "@/api/applications";

// Mock the entire api/applications module
vi.mock('../api/applications')

describe('applicationStore', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('fetchApplications maps pagination correctly', async () => {

        getApplications.mockResolvedValue({
            data: {
                data: [{ id: 1, company: 'Google' }],
                meta: {
                    current_page: 1,
                    last_page: 5,
                    total: 50,
                    per_page: 10,
                }
            }
        })

        const store = useApplicationStore()
        store.pagination.currentPage = 1

        await store.fetchApplications()

        expect(getApplications).toHaveBeenCalledWith({
            page: 1,
        })
        expect(store.applications).toEqual([{ id: 1, company: 'Google' }])
        expect(store.pagination.currentPage).toBe(1)
        expect(store.pagination.lastPage).toBe(5)
        expect(store.pagination.total).toBe(50)
    })

    it('setFilter sets status and resets page to 1', async () => {

        getApplications.mockResolvedValue({
            data: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                    total: 0,
                    per_page: 10,
                }
            }
        })

        const store = useApplicationStore()
        store.pagination.currentPage = 3

        store.setFilter('applied')

        expect(getApplications).toHaveBeenCalledWith({
            page: 1,
            status: 'applied',
        })
        expect(store.filters.status).toBe('applied')
        expect(store.pagination.currentPage).toBe(1)
    })
    
    it('setPage sets page to 2', async () => {

        getApplications.mockResolvedValue({
            data: {
                data: [],
                meta: {
                    current_page: 2,
                    last_page: 1,
                    total: 0,
                    per_page: 10,
                }
            }
        })

        const store = useApplicationStore()
        store.pagination.currentPage = 1

        store.setPage(2)

        expect(getApplications).toHaveBeenCalledWith({
            page: 2,
        })
        expect(store.pagination.currentPage).toBe(2)
    })


    it('createApplication calls storeApplication and refetches', async () => {

        getApplications.mockResolvedValue({
            data: {
                data: [{ id: 1, company: 'Google' }],
                meta: { current_page: 1, last_page: 1, total: 1, per_page: 10 }
            }
        })

        const store = useApplicationStore()

        await store.createApplication({ company: 'Google', role: 'Developer' })

        expect(storeApplication).toHaveBeenCalledWith({ company: 'Google', role: 'Developer' })
        expect(store.feedback).toBe('Application created successfully')
        expect(store.applications).toEqual([{ id: 1, company: 'Google' }])
    })

    it('editApplication calls updateApplication and updates the application list locally', async () => {

        updateApplication.mockResolvedValue({
            data: { id: 1, company: 'Apple', role: 'Developer' }
        })
        
        const store = useApplicationStore()

        store.applications = [{ id: 1, company: 'Google', role: 'Developer' }, { id: 2, company: 'Microsoft', role: 'Developer' }]

        await store.editApplication( 1, { company: 'Apple', role: 'Developer' })

        expect(updateApplication).toHaveBeenCalledWith(1, { company: 'Apple', role: 'Developer' })
        expect(store.feedback).toBe('Application updated successfully')
        expect(store.applications).toEqual([{ id: 1, company: 'Apple', role: 'Developer' }, { id: 2, company: 'Microsoft', role: 'Developer' }])

    })

    it('deleteApplication calls destroyApplication and refetches', async () => {

        getApplications.mockResolvedValue({
            data: {
                data: [],
                meta: { current_page: 1, last_page: 1, total: 0, per_page: 10 }
            }
        })
        
        const store = useApplicationStore()

        store.applications = [{ id: 1, company: 'Google', role: 'Developer' }]

        await store.deleteApplication(1)

        expect(destroyApplication).toHaveBeenCalledWith(1)
        expect(store.feedback).toBe('Application deleted successfully')
        expect(store.applications).toEqual([])
    })

})
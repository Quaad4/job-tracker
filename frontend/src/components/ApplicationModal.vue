<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        @click.self="close"
    >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-800">
                    {{ isEditing ? 'Edit Application' : 'Add Application' }}
                </h2>
                <button
                    @click="close"
                    class="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                    ✕
                </button>
            </div>
            <form @submit.prevent="handleSubmit" class="px-6 py-4 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                        v-model="form.company"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="errors.company ? 'border-red-500' : 'border-gray-300'"
                        placeholder="Google"
                    />
                    <p v-if="errors.company" class="text-red-500 text-xs mt-1">
                        {{ errors.company[0] }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                        v-model="form.role"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="errors.role ? 'border-red-500' : 'border-gray-300'"
                        placeholder="Manager"
                    />
                    <p v-if="errors.role" class="text-red-500 text-xs mt-1">
                        {{ errors.role[0] }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        v-model="form.status"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="errors.status ? 'border-red-500' : 'border-gray-300'"
                    >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <p v-if="errors.status" class="text-red-500 text-xs mt-1">
                        {{ errors.status[0] }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
                    <input 
                        v-model="form.date_applied"
                        type="date"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="errors.date_applied ? 'border-red-500' : 'border-gray-300'"
                    />
                    <p v-if="errors.date_applied" class="text-red-500 text-xs mt-1">
                        {{ errors.date_applied[0] }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Salary (min)</label>
                    <input
                        v-model="form.salary_min"
                        type="number" 
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="errors.salary_min ? 'border-red-500' : 'border-gray-300'"
                        placeholder="38000"
                    />
                    <p v-if="errors.salary_min" class="text-red-500 text-xs mt-1">
                        {{ errors.salary_min[0] }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                        v-model="form.notes"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="errors.notes ? 'border-red-500' : 'border-gray-300'"
                        placeholder="Applied via LinkedIn"
                        rows="3"
                    >
                    </textarea>
                    <p v-if="errors.notes" class="text-red-500 text-xs mt-1">
                        {{ errors.notes[0] }}
                    </p>
                </div>

                <div class="flex justify-end gap-3 mt-4">
                    <button
                        v-if="isEditing"
                        type="button"
                        @click.stop="deleteApplication"
                        class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        @click="close"
                        class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                        {{ isEditing ? 'Save Changes' : 'Add Application' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import { useApplicationStore } from '@/stores/applicationStore'

    const store = useApplicationStore()

    // Modal visibility and mode
    const isOpen = ref(false)
    const isEditing = ref(false)
    const editingId = ref(null)
    const errors = ref({})

    // data
    const form = reactive({
        company: '',
        role: '',
        status: 'applied',
        date_applied: '',
        notes: '',
        salary_min: '',
    })

    // Open modal in create mode
    const openCreate = () => {
        isEditing.value = false
        Object.assign(form, {
            company: '',
            role: '',
            status: 'applied',
            date_applied: '',
            notes: '',
            salary_min: '',
        })
        isOpen.value = true
    }

    // Open modal in edit mode
    const openEdit = (application) => {
        isEditing.value = true
        editingId.value = application.id
        Object.assign(form, {
            company: application.company,
            role: application.role,
            status: application.status,
            date_applied: application.date_applied,
            notes: application.notes,
            salary_min: application.salary_min,
        })
        isOpen.value = true
    }

    const deleteApplication = async () => {
        await store.deleteApplication(editingId.value)
        close()
    }

    // Close modal
    const close = () => {
        isOpen.value = false
        isEditing.value = false
        editingId.value = null
    }

    const handleSubmit = async () => {
        errors.value = {}
        try {
            if(isEditing.value) {
                await store.editApplication(editingId.value, form)
            } else {
                await store.createApplication(form)
            }
            close()
        } catch(err) {
            if(err.response?.status === 422) {
                errors.value = err.response.data.errors
            }
        }
    }

    // Expose openCreate and openEdit so ApplicationsView can trigger them
    defineExpose({ openCreate, openEdit })
</script>
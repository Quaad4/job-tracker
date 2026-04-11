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
                        placeholder="Google"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                        v-model="form.role"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Manager"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        v-model="form.status"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
                    <input 
                        v-model="form.date_applied"
                        type="date"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Salary (min)</label>
                    <input
                        v-model="form.salary_min"
                        type="number" 
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="38000"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                        v-model="form.notes"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Applied via LinkedIn"
                        rows="3"
                    >
                    </textarea>
                </div>

                <div class="flex justify-end gap-3 mt-4">
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

    // Modal visibility and mode
    const isOpen = ref(true)
    const isEditing = ref(false)

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

    // Close modal
    const close = () => {
        isOpen.value = false
    }

    // Expose openCreate and openEdit so ApplicationsView can trigger them
    defineExpose({ openCreate, openEdit })
</script>
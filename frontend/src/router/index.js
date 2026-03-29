import { createRouter, createWebHistory } from 'vue-router'
import ApplicationsView from '../views/ApplicationsView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'applications',
            component: ApplicationsView,
        },
    ],
})

export default router

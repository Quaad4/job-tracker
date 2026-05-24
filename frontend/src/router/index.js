import { createRouter, createWebHistory } from 'vue-router'
import ApplicationsView from '../views/ApplicationsView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'applications',
            component: ApplicationsView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ],
})

export default router

export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/auth') {
        return navigateTo('/auth/login')
    }
})
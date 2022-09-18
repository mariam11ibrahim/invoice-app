import { createRouter, createWebHistory } from "vue-router";
import LandingPage from './../Pages/LandingPage.vue';
import InvoicesPage from '../Pages/InvoicesPage.vue';
import DetailsPage from './../Pages/DetailsPage.vue';
import NotFoundPage from './../Pages/NotFoundPage.vue';
import store from '../store/index';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LandingPage,
            meta: { transition: "slide-left" }
        },
        {
            path: '/invoices',
            component: InvoicesPage,
            meta: { transition: "slide-right" }
        },
        {
            path: '/invoice/:id',
            component: DetailsPage,
            props: true,
            meta: { transition: "slide-left" },
           
        },
        {
            path: '/notfound',
            component: NotFoundPage,
        },
    ]

})
router.beforeEach((to, _, next) => {
    if (to.path == '/') { next(); return; }

    if (store.getters['auth/isAuthenticated']) next()
    else next('/')

})
export default router;
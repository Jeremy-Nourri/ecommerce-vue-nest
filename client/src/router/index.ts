import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import CategoryView from "../views/CategoryView.vue"
import ProductView from "../views/ProductView.vue"
import LoginView from "../views/LoginView.vue"
import UserAccountView from "@/views/UserAccountView.vue"
import { useAuthStore } from "../store/useAuthStore"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/categorie/:categoryName",
            name: "category",
            component: CategoryView
        },
        {
            path: "/produit/:productId",
            name: "product",
            component: ProductView
        },
        {
            path: "/login",
            name: "login",
            component: LoginView
        },
        {
            path: "/my-account",
            name: "my-account",
            component: UserAccountView
        }
    ]
})

// router.beforeEach(async (to) => {
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth = useAuthStore();

//     if (authRequired && !auth.user) {
//         auth.returnUrl = to.fullPath;
//         return '/login';
//     }
// });

export default router

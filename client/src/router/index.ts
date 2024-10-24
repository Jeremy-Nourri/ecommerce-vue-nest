import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import CategoryView from "../views/CategoryView.vue"
import ProductView from "../views/ProductView.vue"
import LoginView from "../views/LoginView.vue"
import UserAccountView from "@/views/UserAccountView.vue"
import CartView from "@/views/CartView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/category/:categoryName",
            name: "category",
            component: CategoryView
        },
        {
            path: "/product/:productId",
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
        },
        {
            path: "/cart",
            name: "cart",
            component: CartView
        }
    ]
})


export default router

import { AuthService } from "@/services/AuthService"
import type User from "@/types/interfaces/User"
import { defineStore } from "pinia"
import { ref } from "vue"
import FetchError from "@/utils/error/FetchError"
import router from "@/router"

export const useAuthStore = defineStore("authStore", () => {
    
    //////// States ////////

    const token = ref<string | null>(null)
    const user = ref<User | null>(null)
    const returnUrl = ref<string | null>(null)
    const loading = ref<boolean>(false)
    const errorMessage = ref<string | null>(null)

    //////// Services ////////
    
    const authService = new AuthService()

    //////// Methods ////////

    const login = async (username: string, password: string) => {
        loading.value = true

        try {
            const response = await authService.login(username, password)

            if (response) {
                user.value = response
                localStorage.setItem("user", JSON.stringify(response.accessToken))

                errorMessage.value = null

                router.push(returnUrl.value || "/")
            } else {
                errorMessage.value = "Identifiants incorrects."
            }
        } catch (error: unknown) {
            errorMessage.value = error instanceof FetchError ? error.message : "Erreur lors de la connexion."
        }

        loading.value = false

    }

    const logout = () => {
        user.value = null
        localStorage.removeItem("user")
        router.push("/login")
    }

    return {
        token,
        user,
        returnUrl,
        loading,
        errorMessage,
        login,
        logout
    }
})
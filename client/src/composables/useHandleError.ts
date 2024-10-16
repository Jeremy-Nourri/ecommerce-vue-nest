import { type Ref } from "vue"
import FetchError from "@/utils/error/FetchError"

export const useHandleError = (errorMessage: Ref<string | null>) => {
    return (error: unknown) => {
        errorMessage.value = error instanceof FetchError ? error.message : "Erreur lors de la récupération des données."
    }
}

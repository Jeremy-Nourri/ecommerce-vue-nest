import { defineStore } from "pinia"
import { ref } from "vue"
import { PhoneService } from "@/services/PhoneService"
import { TabletService } from "@/services/TabletService"
import type { ProductCollection } from "@/interfaces/ProductCollection"

export const useProductStore = defineStore("productStore", () => {
  const products = ref<ProductCollection>({
    phones: [],
    tablets: []
  })

  const loading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)

  const phoneService = new PhoneService()
  const tabletService = new TabletService()

  const fetchPhones = async () => {
    loading.value = true
    try {
      const response = await phoneService.getPhones()
      products.value.phones = Array.isArray(response) ? response : []
      if (!products.value.phones.length) {
        errorMessage.value = "Aucun téléphone disponible."
      } else {
        errorMessage.value = null
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Erreur lors de la récupération des téléphones."
    } finally {
      loading.value = false
    }
  }

  const fetchTablets = async () => {
    loading.value = true
    try {
      const response = await tabletService.getTablets()
      products.value.tablets = Array.isArray(response) ? response : []
      if (!products.value.tablets.length) {
        errorMessage.value = "Aucune tablette disponible."
      } else {
        errorMessage.value = null
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Erreur lors de la récupération des tablettes."
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    errorMessage,
    fetchPhones,
    fetchTablets
  }
})

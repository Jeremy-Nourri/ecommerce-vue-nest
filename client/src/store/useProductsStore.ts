import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { SmartphoneService } from "@/services/SmartphoneService"
import { TabletService } from "@/services/TabletService"
import { CategoryService } from "@/services/CategoryService"
import { ProductService } from "@/services/ProductService"
import type { ProductCollection } from "@/interfaces/ProductCollection"
import type { Product } from "@/interfaces/ProductsResponse"
import type { SortProduct } from "@/types/SortProduct"

export const useProductStore = defineStore("productStore", () => {

    //// States ////

    const products = ref<ProductCollection>({
        phones: [],
        tablets: []
    })

    const productsByCategory = ref<Product[] | []>([])

    //
    const product = ref<Product | null>(null)

    const sortCriteria = ref<SortProduct>("Aucun tri")

    const loading = ref<boolean>(false)
    const errorMessage = ref<string | null>(null)

    //// Services ////

    const phoneService = new SmartphoneService()
    const tabletService = new TabletService()
    const categoryService = new CategoryService()
    const productService = new ProductService()

    //// Methods ////

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

    const fetchProductsByCategory = async (categoryName: string) => {

        loading.value = true

        try {
            const response = await categoryService.getProductsByCategory(categoryName)
            productsByCategory.value = Array.isArray(response) ? response : []

            if (!productsByCategory.value.length) {
                errorMessage.value = `Aucun produit de la catégorie ${categoryName} disponible.`
            } else {
                errorMessage.value = null
            }

        } catch (error: any) {
            errorMessage.value =
                error.message ||
                `Erreur lors de la récupération des produits de la catégorie ${categoryName}.`
        
        } finally {
            loading.value = false
        }
    }

    const fetchProductById = async (id: number) => {

        loading.value = true

        try {
            const response = await productService.getProductById(id)
            
            product.value = response

        } catch (error: any) {
            errorMessage.value = error.message || "Erreur lors de la récupération du produit."

        } finally {
            loading.value = false
        }
    }

    const setSortCriteria = (criteria: SortProduct) => {
        sortCriteria.value = criteria
    }

    const sortedProductsByCategory = computed(() => {
        return [...productsByCategory.value].sort((a, b) => {
            switch (sortCriteria.value) {
            case "Prix croissant":
                return a.price - b.price
            case "Prix décroissant":
                return b.price - a.price
            case "Nom A-Z":
                return a.title.localeCompare(b.title)
            case "Nom Z-A":
                return b.title.localeCompare(a.title)
            default:
                return 0
            }
        })
    })

    return {
        products,
        productsByCategory,
        product,
        loading,
        errorMessage,
        fetchPhones,
        fetchTablets,
        fetchProductsByCategory,
        fetchProductById,
        setSortCriteria,
        sortedProductsByCategory
    }
})

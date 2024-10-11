import type { Phone } from "@/interfaces/phone/Phone"
import type { ProductsResponse } from "@/interfaces/ProductsResponse"
import { URL_API_CATEGORY, URL_API_PRODUCTS } from "@/env"

export class SmartphoneService {
    public async getPhones(): Promise<ProductsResponse | []> {
        try {
            const response = await fetch(`${URL_API_CATEGORY}smartphones`)

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const data = await response.json()
            return data.products
        } catch (error) {
            console.error("Erreur lors de la récupération des smartphones", error)
            return []
        }
    }

    public async getPhoneById(id: string): Promise<Phone | undefined> {
        try {
            const response = await fetch(`${URL_API_PRODUCTS}/products/${id}`)

            if (!response.ok) {
                const errorData = await response.json()

                if (response.status === 404) {
                    console.error(`Produit introuvable: ${errorData.message}`)
                    return undefined
                }

                throw new Error(`Erreur HTTP: ${response.status}`)
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération du smartphone à l'ID : ${id}`, error)
            return undefined
        }
    }
}

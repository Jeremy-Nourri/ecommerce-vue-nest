import { URL_API_PRODUCTS } from "@/env"
import { type Product } from "@/types/ProductType"

export class ProductService {
    public async getProductById(id: number): Promise<Product | null> {
        try {
            const response = await fetch(`${URL_API_PRODUCTS}${id}`)

            if (!response.ok) {
                const errorData = await response.json()

                if (response.status === 404) {
                    console.error(`Produit introuvable: ${errorData.message}`)
                    return null
                }

                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error(`Erreur lors de la récupération du produit à l'ID : ${id}`, error)
            return null
        }
    }
}

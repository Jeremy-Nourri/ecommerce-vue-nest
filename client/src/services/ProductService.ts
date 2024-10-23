import { type Product } from "@/types/ProductType"
import FetchError from "@/utils/error/FetchError";

const URL_API_PRODUCTS = import.meta.env.VITE_URL_API_PRODUCTS

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

                throw new FetchError(response.statusText, response.status, errorData)
            }

            return await response.json()
        } catch (error) {
            console.error(`Erreur lors de la récupération du produit à l'ID : ${id}`, error)
            return null
        }
    }
}

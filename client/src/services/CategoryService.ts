import { URL_API_CATEGORY } from "@/env"
import type { ProductsResponse } from "@/interfaces/ProductsResponse"

export class CategoryService {
    public async getProductsByCategory(categoryName: string): Promise<ProductsResponse | []> {
        try {
            const response = await fetch(`${URL_API_CATEGORY}${categoryName}`)

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const data = await response.json()
            return data.products

        } catch (error) {
            console.error(`Erreur lors de la récupération des produits de la catégorie ${categoryName}`, error)
            return []
        }
    }
}
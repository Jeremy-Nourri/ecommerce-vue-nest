import type { Product } from "@/types/ProductType";
import FetchError from "@/utils/error/FetchError";

const URL_API_CATEGORY = import.meta.env.VITE_URL_API_CATEGORY;

export class CategoryService {

    public async getProductsByCategory(categoryName: string): Promise<Product[] | []> {
        try {

            const response = await fetch(`${URL_API_CATEGORY}${categoryName}`)

            if (!response.ok) {
                throw new FetchError(response.statusText, response.status, await response.json())
            }

            return await response.json()
            
        } catch (error) {
            console.error(
                `Erreur lors de la récupération des produits de la catégorie ${categoryName}`,
                error
            )
            return []
        }
    }
}

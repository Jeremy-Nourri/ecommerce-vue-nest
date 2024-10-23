import type ProductsResponse from "@/types/interfaces/ProductsResponse"
import FetchError from "@/utils/error/FetchError";


const URL_API_CATEGORY = import.meta.env.VITE_URL_API_CATEGORY;

console.log(URL_API_CATEGORY);




export class CategoryService {

    public async getProductsByCategory(categoryName: string): Promise<ProductsResponse | []> {
        try {
            console.log(`${URL_API_CATEGORY}${categoryName}`);
            const response = await fetch(`${URL_API_CATEGORY}${categoryName}`)

            if (!response.ok) {
                throw new FetchError(response.statusText, response.status, await response.json())
            }

            const data = await response.json()
            return data.products
        } catch (error) {
            console.error(
                `Erreur lors de la récupération des produits de la catégorie ${categoryName}`,
                error
            )
            return []
        }
    }
}

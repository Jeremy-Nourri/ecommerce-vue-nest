import type Tablet from "@/types/interfaces/tablet/Tablet"
import type { Product } from "@/types/ProductType";
import FetchError from "@/utils/error/FetchError";

const URL_API_CATEGORY = import.meta.env.VITE_URL_API_CATEGORY
const URL_API_PRODUCTS = import.meta.env.VITE_URL_API_PRODUCTS

export class TabletService {

    public async getTablets(): Promise<Product[] | []> {
        try {
            const response = await fetch(`${URL_API_CATEGORY}tablets`)

            if (!response.ok) {
                throw new FetchError(response.statusText, response.status, await response.json())
            }

            return await response.json()

        } catch (error) {
            console.error("Erreur lors de la récupération des tablettes", error)
            return []
        }
    }

    public async getTabletById(id: string): Promise<Tablet | null> {
        try {
            const response = await fetch(`${URL_API_PRODUCTS}/products/${id}`)

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
            console.error(`Erreur lors de la récupération de la tablette à l'ID : ${id}`, error)
            return null
        }
    }
}

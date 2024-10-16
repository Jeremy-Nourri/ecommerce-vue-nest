import type Tablet from "@/types/interfaces/tablet/Tablet"
import type ProductsResponse from "@/types/interfaces/ProductsResponse"
import { URL_API_CATEGORY, URL_API_PRODUCTS } from "@/env"
import FetchError from "@/utils/error/FetchError";

export class TabletService {

    public async getTablets(): Promise<ProductsResponse | []> {
        try {
            const response = await fetch(`${URL_API_CATEGORY}tablets`)

            if (!response.ok) {
                throw new FetchError(response.statusText, response.status, await response.json())
            }

            const data = await response.json()
            return data.products
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

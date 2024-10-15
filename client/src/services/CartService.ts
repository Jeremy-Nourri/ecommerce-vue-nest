import type Cart from "@/types/interfaces/cart/Cart";
import type LineCart from "@/types/interfaces/cart/LineCart";
import FetchError from "@/utils/error/FetchError";

export class CartService {

    public async createNewCart(userId: number, products: LineCart[]): Promise<Cart | null> {
        try {
            const response = await fetch("https://dummyjson.com/carts/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    userId,
                    products
                })
            })

            if (!response.ok) {
                throw new FetchError(response.statusText, response.status, await response.json())
            }

            return await response.json()

        } catch (error) {
            console.error("Erreur lors de la création du panier", error)
            return null
        }

    }

}
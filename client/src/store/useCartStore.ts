import { defineStore } from 'pinia'
import { ref } from 'vue'

interface CartDummy {
    userId: number
    products : {
        id: number
        quantity: number
    }[]
}

export const useCartStore = defineStore("cartStore", () => {

    //////// State ////////
    const cart = ref<CartDummy | null>(null)

    //////// Methods ////////

    const createCartInStore = (userId: number) => {
        cart.value = {
            userId,
            products: []
        }
    }

    const addProductToCart = (userId: number, productId: number, quantity: number) => {

        if (!cart.value) {
            createCartInStore(userId)
        }

        const productIndex = cart.value?.products.findIndex(product => product.id === productId) ?? -1

        if (productIndex !== -1) {
            if (cart.value) {
                cart.value.products[productIndex].quantity += quantity
            }
        } else {
            cart.value?.products.push({
                id: productId,
                quantity
            })
        }
    }

    return {
        cart,
        createCartInStore,
        addProductToCart
    }






})
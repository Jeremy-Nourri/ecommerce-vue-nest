<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { useCartStore } from '@/store/useCartStore'
import { ProductService } from '@/services/ProductService';
import type { Product } from '@/types/ProductType';

import type LineCart from '@/types/interfaces/cart/LineCart';

const cartStore = useCartStore();
const productService = new ProductService();

const fullCart = ref<Product[]>([]);
const suubTotal = ref<number>(0);

const fetchFullCart = async () => {
    if (cartStore.cart && cartStore.cart.products) {
        const productPromises = (cartStore.cart.products as LineCart[]).map(async (lineItem: LineCart) => {
            try {
                const product = await productService.getProductById(lineItem.id);
                return {
                    ...product,
                    quantity: lineItem.quantity
                } as Product;
            } catch (error) {
                console.error(`Erreur lors de la récupération du produit avec l'id ${lineItem.id}:`, error);
                return null;
            }
        });

        fullCart.value = (await Promise.all(productPromises)).filter(p => p !== null) as Product[];
        console.log(fullCart.value);
        
    }
};

const calculateSubtotal = () => {
    suubTotal.value = fullCart.value.reduce((acc, product) => acc + product.price * (product.quantity ?? 0), 0);
};

onMounted(() => {
    fetchFullCart();
    calculateSubtotal();
});

watch(fullCart, () => {
    calculateSubtotal();
});

</script>

<template>

    <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div class="flex items-start justify-between">
                
            </div>

            <div class="mt-8">
                <div class="flow-root">
                    <ul role="list" class="-my-6 divide-y divide-gray-200">
                        <li v-for="product in fullCart" :key="product.id" class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img :src="product.thumbnail" :alt="product.title"
                                    class="h-full w-full object-cover object-center" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <router-link :to="`/produit/${product.id}`">{{ product.title }}</router-link>
                                        </h3>
                                        <p class="ml-4">{{ product.price }}</p>
                                    </div>
                                    <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                    <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                    <div class="flex">
                                        <button type="button" class="font-medium text-secondary hover:opacity-80">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 

        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div class="mt-6">
                <router-link to="#">
                    class="flex items-center justify-center rounded-md border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-80">
                    Checkout
                </router-link>
            </div>
            
        </div>
    </div>
</template>

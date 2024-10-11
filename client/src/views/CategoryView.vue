<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { type Product } from '@/interfaces/ProductsResponse'
import { useProductStore } from '@/store/useProductsStore'
import FilterInput from '@/components/FilterInput.vue'

const useProductsStore = useProductStore()

const route = useRoute();

const productsData = ref<Product[]>([]);

const getCategoryName = () => {
    return Array.isArray(route.params.categoryName) ? route.params.categoryName[0] : route.params.categoryName;
};

onMounted(
    async () => {
        await useProductsStore.fetchProductsByCategory(getCategoryName());
        productsData.value = useProductsStore.productsByCategory;
    }
);

watch(
    () => route.params.categoryName,
    async () => {
        await useProductsStore.fetchProductsByCategory(getCategoryName());
        productsData.value = useProductsStore.productsByCategory;
    }
);

const handleSortUpdate = () => {
    productsData.value = useProductsStore.sortedProductsByCategory;
};

</script>

<template>
    <div class="bg-white">

        <FilterInput @update-sort="handleSortUpdate" />

        <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">

            <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ getCategoryName().toUpperCase() }}</h2>
            <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="product in productsData" :key="product.id" class="group relative bg-white">

                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img :src="product.thumbnail" :alt="product.title"
                            class="h-full w-full object-center object-cover lg:w-full lg:h-full" />
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <router-link :to="`/produit/${product.id}`" >
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ product.title }}
                                </router-link>
                            </h3>
                        </div>
                        <p class="text-sm font-medium text-gray-900">{{ product.price }} €</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/useProductsStore';
import calculateTheReviewAverage from '@/utils/calculateTheReviewAverage';
import { StarIcon } from '@heroicons/vue/20/solid'

const productStore= useProductStore();
const route = useRoute();

const getProductId = () => {
    return Array.isArray(route.params.productId) ? route.params.productId[0] : route.params.productId;

};

watch(
    () => route.params.productId,
    async () => {
        await productStore.fetchProductById(Number(getProductId()));
    },
    { immediate: true }
);
const reviewsAverage = computed(() => calculateTheReviewAverage(productStore.product?.reviews ?? []));

</script>

<template>
    <div class="bg-white">
        <div v-if="productStore.product === null">
            <p>chargement</p>
        </div>
        <div v-else class="pt-6">
            <nav aria-label="Breadcrumb">
                <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div class="flex items-center">
                            <router-link :to="`/categorie/${productStore.product?.category}`"
                                class="mr-2 text-sm font-medium text-gray-900">
                                {{ productStore.product?.category.charAt(0).toUpperCase() + productStore.product?.category.slice(1) }}
                            </router-link>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                class="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li class="text-sm">
                        <p aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ productStore.product?.title }}
                        </p>
                    </li>
                </ol>
            </nav>

            <!-- Image gallery -->
            <div class="mx-auto mt-4 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div class="aspect-h-4 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg mb-6">
                    <img :src="productStore.product?.images[0]" :alt="productStore.product?.title"
                        class="h-full w-full object-contain object-center" />
                </div>
                <div class="aspect-h-4 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img :src="productStore.product?.images[1]" :alt="productStore.product?.title"
                        class="h-full w-full object-contain object-center" />
                </div>
                <div class="aspect-h-4 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img :src="productStore.product?.images[2]" :alt="productStore.product?.title"
                        class="h-full w-full object-contain object-center" />
                </div>
            </div>

            <!-- product info -->
            <div
                class="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-6">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ productStore.product?.title }}</h1>
                </div>

                <!-- Options -->
                <div class="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 class="sr-only">Informations</h2>
                    <p class="text-3xl tracking-tight text-gray-900">{{ productStore.product?.price }}</p>

                    <!-- Reviews -->
                    <div class="mt-6">
                        <h3 class="sr-only">Reviews</h3>
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                    :class="[reviewsAverage > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                                    aria-hidden="true" />
                            </div>
                            <p class="sr-only">{{ reviewsAverage }} out of 5 stars</p>
                            <p
                                class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{{
                                productStore.product?.reviews ? productStore.product?.reviews.length : 0 }} reviews</p>
                        </div>
                        <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-secondary px-8 py-3 text-base font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:bg-secondary focus:ring-offset-2">Add to bag</button>

                    </div>
                </div>

                <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <!-- Description and details -->
                    <div>
                        <h3 class="sr-only">Description</h3>
                        <div class="space-y-6">
                            <p class="text-base text-gray-900">{{ productStore.product?.description }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { useProductStore } from '@/store/useProductsStore';
import { useRoute } from 'vue-router';
import calculateTheReviewAverage from '@/utils/calculateTheReviewAverage';

const { fetchProductById, product } = useProductStore()


const route = useRoute();


const getProductId = () => {
    return Array.isArray(route.params.productId) ? route.params.productId[0] : route.params.productId;
}


onMounted(
    async () => {
        await fetchProductById(Number(getProductId()));
    }
);

const reviewsAverage = calculateTheReviewAverage(product?.reviews ?? []);

</script>

<template>

    <div  class="bg-white">
        <div class="pt-6">
            <nav aria-label="Breadcrumb">
                <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div class="flex items-center">
                            <router-link :to="`/categorie/${product?.category}`"
                                class="mr-2 text-sm font-medium text-gray-900">{{ product?.category }}</router-link>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                class="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li class="text-sm">
                        <p aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ product?.title }}
                        </p>
                    </li>
                </ol>
            </nav>

            <!-- Image gallery -->
            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img :src="product?.images[0]" :alt="product?.title"
                        class="h-full w-full object-cover object-center" />
                </div>
                <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="product?.images[1]" :alt="product?.title"
                            class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img :src="product?.images[2]" :alt="product?.title"
                            class="h-full w-full object-cover object-center" />
                    </div>
                </div>
                <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img :src="product?.images[3]" :alt="product?.title"
                        class="h-full w-full object-cover object-center" />
                </div>
            </div>

            <!-- Product? info -->
            <div
                class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product?.title }}</h1>
                </div>

                <!-- Options -->
                <div class="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 class="sr-only">Product? information</h2>
                    <p class="text-3xl tracking-tight text-gray-900">{{ product?.price }}</p>

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
                                product?.reviews ? product?.reviews.length : 0 }} reviews</p>
                        </div>
                    </div>


                </div>

                <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <!-- Description and details -->
                    <div>
                        <h3 class="sr-only">Description</h3>

                        <div class="space-y-6">
                            <p class="text-base text-gray-900">{{ product?.description }}</p>
                        </div>
                    </div>

                    <!-- <div class="mt-10">
                        <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

                        <div class="mt-4">
                            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                                <li v-for="highlight in product.highlights" :key="highlight" class="text-gray-400">
                                    <span class="text-gray-600">{{ highlight }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-10">
                        <h2 class="text-sm font-medium text-gray-900">Details</h2>

                        <div class="mt-4 space-y-6">
                            <p class="text-sm text-gray-600">{{ product.details }}</p>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

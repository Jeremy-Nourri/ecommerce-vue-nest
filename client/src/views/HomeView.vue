<script setup lang="ts">
import { onMounted } from 'vue';
import { type ProductCollection } from '@/interfaces/ProductCollection';
import { useProductStore } from '@/store/useProductsStore';

const useProductsStore = useProductStore();

onMounted(() => {
  useProductsStore.fetchPhones();
  useProductsStore.fetchTablets();
});

const productsData: ProductCollection = useProductsStore.products;

</script>

<template>
  <div class="bg-white">


    <div v-for="(categories, categoryName) in productsData" :key="categoryName"
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ categoryName.toUpperCase() }}</h2>
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in categories" :key="product.id" class="group relative bg-white">

          
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="product.thumbnail" :alt="product.title"
              class="h-full w-full object-cover lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.title">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.title }}
                </a>
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
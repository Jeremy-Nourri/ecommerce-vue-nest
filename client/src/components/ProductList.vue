
<script setup lang="ts" >
import { type PropType } from 'vue';
import { type ProductCollection } from '@/interfaces/ProductCollection';

const props = defineProps({
    productsData: {
        type: Object as PropType<ProductCollection>,
        required: true,
    },
});

</script>

<template>
  <div class="bg-white">
    
    <div v-for="(categories, index) in props.productsData" :key="index" class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in categories" :key="product.id" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="product.thumbnail" :alt="product.title" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.title">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.title }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.weight }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


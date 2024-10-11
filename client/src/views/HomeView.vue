<script setup lang="ts">
import smartphoneImg from '@/assets/img/iphone.jpg'
import tabletImg from '@/assets/img/tablette-samsung.jpg'

const categoriesPage = [
    {
        thumbnail: smartphoneImg,
        title: 'smartphones',
    },
    {
        thumbnail: tabletImg,
        title: 'tablets',
    }
]

</script>

<template>
    <div class="bg-white">

        <div v-for="(categorie, index) in categoriesPage" :key="index"
            class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">

            <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ categorie.title.toUpperCase() }}</h2>
            <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div class="group relative bg-white">

                    <router-link :to="`/categorie/${categorie.title}`" class="group relative bg-white">
                        <div
                            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img :src="categorie.thumbnail" :alt="categorie.title"
                                class="h-full w-full object-center object-cover lg:w-full lg:h-full" />
                        </div>
                    </router-link>

                </div>
            </div>
        </div>

    </div>

</template>
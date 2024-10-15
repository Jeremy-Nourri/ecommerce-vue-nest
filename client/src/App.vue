<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderApp from './components/HeaderApp.vue'
import FooterApp from './components/FooterApp.vue';
import { useProductStore } from './store/useProductsStore'

const productsStore = useProductStore()

import { onMounted } from 'vue'

onMounted(
    () => {
        productsStore.fetchPhones()
        productsStore.fetchTablets()
    }
)


</script>

<template>
    <HeaderApp :productsData="productsStore.products" />
    <RouterView />
    <FooterApp />
</template>

<style scoped></style>

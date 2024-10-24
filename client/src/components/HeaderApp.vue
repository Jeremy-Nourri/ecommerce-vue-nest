<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

import Logo from '@/assets/img/logo.jpg'

import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'
import type ProductCollection from '@/types/interfaces/ProductCollection'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()

const props = defineProps({
    productsData: {
        type: Object as PropType<ProductCollection>,
        required: true,
    },
})

const open = ref(false)

const navigation = {
    categories: [
        {
            id: "Smartphones",
            name: "Smartphones",
        },
        {
            id: "Tablets",
            name: "Tablets",
        }
    ],
}

const productsInBag = computed(() => {
    const cart = cartStore.cart;
    if (cart && cart.products) {
        return cart.products.reduce((acc, product) => acc + product.quantity, 0);
    }
    return 0;
});


</script>

<template>
    <div class="bg-white">
        <!-- Mobile menu -->
        <TransitionRoot as="template" :show="open">

            <Dialog class="relative z-40 lg:hidden" @close="open = false">

                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">

                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">

                        <DialogPanel
                            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                            <div class="flex px-4 pb-2 pt-5">
                                <button type="button"
                                    class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    @click="open = false">
                                    <span class="absolute -inset-0.5" />
                                    <span class="sr-only">Fermer le menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <div class="flex justify-end items-center px-6 h-10">
                                <div class="mr-6">
                                    <router-link to="/cart" class="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            class="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true" />
                                        <span
                                            class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{
                                                productsInBag }}</span>
                                        <span class="sr-only">articles, voir le panier</span>
                                    </router-link>
                                </div>

                                <!-- User -->

                                <router-link to="/login" class="min group flex flex-col items-center text-gray-400">
                                    <div class="relative">
                                        <UserCircleIcon
                                            :class="[authStore.user ? 'text-primary' : 'text-gray-400', 'h-8 w-8 flex-shrink-0']"
                                            aria-hidden="true" />
                                        <CheckIcon v-if="authStore.user"
                                            class="absolute h-4 w-4 text-green-700 bottom-0 right-0 transform translate-x-1 translate-y-1"
                                            aria-hidden="true" />
                                    </div>

                                    <span class="sr-only">Compte</span>

                                    <!-- Affichage du nom de l'utilisateur ou du texte "Sign in" -->

                                    <p v-if="authStore.user" class="text-xs">{{ authStore.user.username }}</p>

                                    <p v-else class="text-xs">Sign in</p>
                                </router-link>


                            </div>

                            <!-- Links -->
                            <TabGroup as="div" class="mt-2">

                                <div class="border-b border-gray-200">
                                    <TabList class="-mb-px flex space-x-8 px-4">
                                        <Tab as="template" v-for="category in navigation.categories"
                                            :key="category.name" v-slot="{ selected }">
                                            <button
                                                :class="[selected ? 'border-primary text-primary' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{
                                                    category.name }}</button>
                                        </Tab>
                                    </TabList>
                                </div>

                                <TabPanels as="template">
                                    <TabPanel v-for="category in navigation.categories" :key="category.name"
                                        class="space-y-10 px-4 pb-8 pt-10">

                                        <ul role="list" class="mt-6 flex flex-col space-y-6">
                                            <li v-for="item in (category.name === 'Smartphones' ? props.productsData.phones : props.productsData.tablets)"
                                                :key="item.id" class="flex">
                                                <router-link :to="`/product/${item.id}`" class="hover:text-gray-800">{{
                                                    item.title }}</router-link>
                                            </li>
                                        </ul>
                                    </TabPanel>
                                </TabPanels>

                            </TabGroup>

                        </DialogPanel>

                    </TransitionChild>
                </div>

            </Dialog>

        </TransitionRoot>

        <!-- Desktop -->
        <header class="relative bg-white z-30">
            <p
                class="flex h-16 items-center justify-center bg-gradient-to-r from-secondary to-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                Site Ecommerce
            </p>

            <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div class="w-full flex justify-between h-16 border-b border-gray-200">

                    <div class="w-full flex justify-between">
                        <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            @click="open = true">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Ouvrir le menu</span>
                            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <!-- Logo -->
                        <div class="ml-4 flex lg:ml-0">
                            <router-link to="/">
                                <span class="sr-only">Ecommerce</span>
                                <img :src="Logo" alt="Ecommerce" class="h-14 w-auto" />
                            </router-link>
                        </div>
                    </div>

                    <!-- Flyout menus -->
                    <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
                        <div class="flex h-full space-x-8">
                            <Popover v-for="category in navigation.categories" :key="category.id" class="flex"
                                v-slot="{ open }">
                                <div class="relative flex">
                                    <PopoverButton
                                        :class="[open ? 'border-primary text-primary' : 'border-transparent text-gray-700 hover:text-secondary', 'relative z-10 flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">
                                        {{ category.name }}</PopoverButton>
                                </div>

                                <transition enter-active-class="transition ease-out duration-200"
                                    enter-from-class="opacity-0" enter-to-class="opacity-100"
                                    leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">

                                    <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500">

                                            <div class="bg-gray-50 text-sm py-6 px-8">
                                                <ul role="list" class="flex flex-wrap items-center ">
                                                    <li v-for="item in (category.name === 'Smartphones' ? props.productsData.phones : props.productsData.tablets)"
                                                        :key="item.id" class="p-4 flex items-center justify-center">
                                                        <router-link :to="`/product/${item.id}`"
                                                            class="hover:text-gray-800">{{ item.title }}
                                                        </router-link>
                                                    </li>
                                                </ul>
                                            </div>

                                    </PopoverPanel>
                                </transition>
                            </Popover>

                        </div>
                    </PopoverGroup>

                    <div class="ml-auto flex items-center">

                        <!-- Search -->
                        <div class="hidden md:flex lg:ml-6 ">
                            <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Recherche</span>
                                <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>

                        <div class="hidden md:flex justify-end items-center px-6 h-10">
                            <div class="mr-6">
                                <router-link to="/cart" class="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        class="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true" />
                                    <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{
                                        productsInBag }}</span>
                                    <span class="sr-only">articles, voir le panier</span>
                                </router-link>
                            </div>

                            <!-- User -->

                            <router-link :to="authStore.user ? '/my-account' : '/login'"
                                class="group flex flex-col items-center min-w-12 text-gray-400">
                                <div class="relative">
                                    <UserCircleIcon
                                        :class="[authStore.user ? 'text-primary' : 'text-gray-400', 'h-8 w-8 flex-shrink-0']"
                                        aria-hidden="true" />
                                    <CheckIcon v-if="authStore.user"
                                        class="absolute h-4 w-4 text-green-700 bottom-0 right-0 transform translate-x-1 translate-y-1"
                                        aria-hidden="true" />
                                </div>

                                <span class="sr-only">Compte</span>

                                <p v-if="authStore.user" class="text-xs">{{ authStore.user.username }}</p>
                                <p v-else class="text-xs">Sign in</p>
                            </router-link>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    </div>
</template>

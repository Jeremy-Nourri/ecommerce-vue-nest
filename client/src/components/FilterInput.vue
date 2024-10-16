<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProductStore } from '@/store/useProductsStore';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import type { SortProduct } from '@/types/SortProductType';

const sortingChoiceArray: SortProduct[] = ["Aucun tri", "Prix croissant", "Prix décroissant", "Nom A-Z", "Nom Z-A"]

const { setSortCriteria } = useProductStore()

const selected = ref<SortProduct>('Aucun tri')

const emit = defineEmits(['update-sort'])

watch(selected, (newVal) => {
    emit('update-sort', newVal)
})

</script>

<template>

    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <Listbox as="div" v-model="selected" class="max-w-56">

            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Trier par</ListboxLabel>

            <div class="relative mt-2">

                <ListboxButton
                    class="relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm 
                    ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 hover:cursor-pointer">
                    <span class="flex items-center">
                        <span class="ml-3 block truncate">{{ selected }}</span>
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">

                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                        <ListboxOption as="template" v-for="item in sortingChoiceArray" :key="item" :value="item"
                            v-slot="{ active, selected }" class="hover:cursor-pointer">

                            <li
                                :class="[active ? 'bg-secondary text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                <div class="flex items-center">
                                    <span
                                        :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                                            item }}</span>
                                </div>

                                <span v-if="selected"
                                    :class="[active ? 'text-white' : 'text-primary', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>

                        </ListboxOption>

                    </ListboxOptions>

                </transition>

            </div>

        </Listbox>
    </div>

</template>

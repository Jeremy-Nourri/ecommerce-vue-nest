<script setup lang="ts">

import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'update:quantity', value: number): void;
}>()

const quantity = ref(1)

const emitQuantity = () => {
    emit('update:quantity', quantity.value);
}

const increment = () => {
    quantity.value++
}

const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}



</script>

<template>
    <div>
        <label for="Quantity" class="sr-only"> Quantity </label>

        <div class="flex items-center gap-1">
            <button @click="decrement" type="button"
                class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                &minus;
            </button>

            <input type="number" id="Quantity" name="Quantity" v-model="quantity" min="1" max="99" @input="emitQuantity"
                class="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />

            <button @click="increment" type="button"
                class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                &plus;
            </button>
        </div>
    </div>
</template>

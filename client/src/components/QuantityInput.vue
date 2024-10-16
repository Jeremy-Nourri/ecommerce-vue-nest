<script setup lang="ts">

import { ref, watch } from 'vue'

const emit = defineEmits(['update-quantity'])

const quantity = ref(1)
const errorMessage = ref('')

const increment = () => {
    quantity.value++
    console.log(quantity.value);
}

const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

watch(quantity, (newVal, oldVal) => {
    
    if (newVal !== oldVal) {

        if (newVal < 1) {
            quantity.value = 1
            errorMessage.value = 'La quantité minimale est 1.'
        } else if (newVal > 99) {
            quantity.value = 99
            errorMessage.value = 'La quantité maximale est 99.'
        } else {
            errorMessage.value = ''
            emit('update-quantity', newVal)
        }
    }
});

</script>

<template>
    <div class="flex items-center justify-around mb-3 border rounded-md  ">
        <label for="Quantity" class="sr-only"> Quantity </label>
        <p class="text-md font-bold">Quantity :</p>

        <div class="flex items-center gap-1">
            <button @click="decrement" type="button"
                class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                &minus;
            </button>

            <input type="number" id="Quantity" name="Quantity" v-model="quantity" min="1" max="99" 
                class="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
            <p class="text-red-600 text-sm">
                {{ errorMessage }}
            </p>

            <button @click="increment" type="button"
                class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                &plus;
            </button>
        </div>
    </div>
</template>

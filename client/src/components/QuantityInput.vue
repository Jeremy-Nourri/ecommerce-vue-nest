<script setup lang="ts">

import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue'])

const errorMessage = ref('')
const quantity = ref(props.modelValue)

const increment = () => {
    if(quantity.value < 99) {
        quantity.value++
        emit('update:modelValue', quantity.value)
    }
}

const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--
        emit('update:modelValue', quantity.value)
    }
}

watch(quantity, (newValue) => {
    if (newValue < 1) {
        quantity.value = 1;
    } else if (newValue > 99) {
        quantity.value = 99;
    }
    emit('update:modelValue', quantity.value);
});


watch(
    () => props.modelValue,
    (newVal) => {
        quantity.value = newVal;
    }
);


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

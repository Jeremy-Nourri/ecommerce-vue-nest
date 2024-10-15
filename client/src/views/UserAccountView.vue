<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore';
const authStore = useAuthStore();

</script>

<template>

    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">

        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Mon compte
        </h2>

        <div class="mt-3 sm:mx-auto">
            <p>
                <span class="font-semibold">Username:</span> {{ authStore.user?.username }}
            </p>
            <p>
                <span class="font-semibold">Email:</span> {{ authStore.user?.email }}
            </p>
            <p>
                <span class="font-semibold">First name:</span> {{ authStore.user?.firstName }}
            </p>
            <p>
                <span class="font-semibold">Last name:</span> {{ authStore.user?.lastName }}
            </p>
            <button @click="authStore.logout" class="mt-6 w-full bg-secondary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded">
            Logout
            </button>
        </div>

    </div>
        


</template>
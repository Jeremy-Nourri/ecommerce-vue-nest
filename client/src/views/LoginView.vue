<script setup lang="ts">
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useAuthStore } from '@/store/useAuthStore';

const authStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm({
    initialValues: {
        username: '',
        password: '',
    },
    validationSchema: toTypedSchema(
        object({
            username: string().required('Le nom d\'utilisateur est requis.'),
            password: string().required('Le mot de passe est requis.'),
        })
    ),
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
    await authStore.login(values.username, values.password);
});


</script>
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-4" @submit.prevent="onSubmit">
                <div>
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div class="mt-2">
                        <input v-model="username" v-bind="usernameAttrs" id="userName" name="userName" type="text"
                            autocomplete="username" required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-00 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
                        <p v-if="errors.username" class="mt-2 text-xs text-red-600">{{ errors.username }}</p>
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input v-model="password" v-bind="passwordAttrs" id="password" name="password" type="password"
                            autocomplete="current-password" required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
                        <div class="text-right">
                            <a href="#" class="font-semibold text-secondary hover:opacity-80 text-[0.6rem]">Forgot
                                password?</a>
                        </div>
                        <p v-if="errors.password" class="mt-2 text-xs text-red-600">{{ errors.password }}</p>
                    </div>
                </div>
                <div>
                    <button type="submit" :disabled="authStore.loading"
                        class="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span v-if="authStore.loading">Loading...</span>
                        <span v-else>Sign in</span>
                    </button>
                </div>
                <div v-if="authStore.errorMessage" class="mt-2 p-2 text-center text-red-600 bg-red-100 rounded">
                    {{ authStore.errorMessage }}
                </div>
            </form>

            <p class="mt-6 text-center text-sm text-gray-500">
                Not a member?
                <a href="#" class="font-semibold leading-6 text-secondary hover:opacity-80">Sign up</a>
            </p>
        </div>
    </div>
</template>

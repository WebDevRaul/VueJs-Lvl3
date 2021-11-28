<template>
    <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="{ hidden: !state }">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center 
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="onToggle">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center" @click.prevent="tab = !tab">
              <a class="block rounded py-3 px-4 transition" :class="{
                'hover:text-white text-white bg-blue-600' : tab,
                'hover:text-blue' : !tab
              }" href="#">Login</a>
            </li>
            <li class="flex-auto text-center" @click.prevent="tab = !tab">
              <a class="block rounded py-3 px-4 transition" :class="{
                'hover:text-white text-white bg-blue-600' : !tab,
                'hover:text-blue' : tab
              }" 
                href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <VeeForm v-show="tab" :validation-schema="loginSchema" @submit="onSubmitLogin">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField 
                name='email' 
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" 
                type="email"
              />
                <ErrorMessage class="text-red-600" name='email' />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <VeeField 
                name="password" 
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" 
                type="password"
              />
                <ErrorMessage class="text-red-600" name='password' />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </VeeForm>
          <!-- Registration Form -->
          <VeeForm v-show="!tab" :validation-schema="schema" :initial-values="values" @submit="onSubmitRegister">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <VeeField 
                name="name" 
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" 
                type="text"
              />
              <ErrorMessage class="text-red-600" name='name' />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField
                name="email" 
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" 
                type="email"
              />
              <ErrorMessage class="text-red-600" name='email' />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <VeeField
                name='age'
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded" 
                type="number"
                />
              <ErrorMessage class="text-red-600" name='age' />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <VeeField name="password" :bails="false" v-slot="{ field, errors }">
                <input 
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password" 
                  type="password"
                  v-bind="field"
                />
                <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
              </VeeField>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <VeeField
                name="confirm-password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
                type="password"
                />
                <ErrorMessage class="text-red-600" name='confirm_passowrd' />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <VeeField 
                as="select"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antartica">Antartica</option>
              </VeeField>
              <ErrorMessage class="text-red-600" name='country' />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <VeeField name="tos" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" value="1" />
              <label class="inline-block">Accept terms of service</label>
              <ErrorMessage class="text-red-600 block" name='tos' />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'Auth',
    data() {
      return {
        tab: true,
        schema: {
          name: 'required|min:2|max:100|alpha_spaces',
          email: 'required|min:2|max:100|email',
          age: 'required|min_value:18|max_value:100',
          password: 'required|min:8|max:100',
          confirm_password: 'confirmed:@password',
          country: 'required|country_excluded:Antartica',
          tos: 'tos'
        },
        loginSchema: {
          email: 'required|min:2|max:100|email',
          password: 'required|min:8|max:100'
        },
        values: {
          country: 'USA'
        }
      };
    },
    methods: {
      ...mapMutations({ onToggle: 'toggleAuthModal' }),
      onSubmitLogin(values) {
        console.log(values);
        try {
          this.$store.dispatch('login', (values));
        } catch (e) {
          console.log(e);
        }
      },
      onSubmitRegister(values) {
        console.log(values);
      }
    },
    computed: {
      ...mapState({ state: 'modal' })
    }
  };
</script>

<style>

</style>
<template>
  <div class="fixed inset-0 bg-black flex z-50">
    <div class="w-[20%] p-4">
      <button @click="closeSearch" class="text-white mb-4">Back to Browse</button>
      <div class="relative mb-4">
        <input 
          v-model="query" 
          type="text" 
          placeholder="Search for movies or TV shows" 
          class="w-full p-2 text-2xl text-black"
        />
        <div class="absolute top-0 right-0 p-2 cursor-pointer" @click="clearSearch">
          <CloseIcon fillColor="#FFFFFF" :size="30"/>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 text-white">
        <button v-for="key in keys" :key="key" @click="appendKey(key)" class="p-2 bg-gray-700 rounded">{{ key }}</button>
      </div>
      <div class="mt-4 text-white">
        <div v-for="suggestion in suggestions" :key="suggestion" class="py-1">{{ suggestion }}</div>
      </div>
    </div>
    <div class="w-[80%] p-4 overflow-y-auto">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="result in results" :key="result.id" class="bg-gray-800 p-2">
          <img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" alt="" class="w-full h-auto"/>
          <div class="text-white mt-2">{{ result.title || result.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CloseIcon from 'vue-material-design-icons/Close.vue'

const query = ref('')
const results = ref([])
const suggestions = ref(['Sugegstion 1', 'Suggestion 2', 'Suggestion 3', 'Suggestion 4', 'Suggestion 5'])
const keys = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])

const router = useRouter()

const closeSearch = () => {
  query.value = ''
  results.value = []
  router.push('/')
}

const clearSearch = () => {
  query.value = ''
}

const appendKey = (key) => {
  query.value += key
}
</script>

<style>
</style>

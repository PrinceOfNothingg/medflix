<template>
  <div class="fixed inset-0 bg-black flex z-50">
    <div class="w-[20%] p-4">
      <button @click="closeSearch" class="text-white mb-4">Back to Browse</button>
      <div class="relative mb-4">
        <input 
          v-model="query" 
          @input="searchMovies"
          type="text" 
          placeholder="Search for movies or TV shows" 
          class="w-full p-2 text-1xl text-black"
        />
        <div class="absolute top-0 right-0 p-2 cursor-pointer" @click="clearSearch">
          <CloseIcon fillColor="#000000" :size="30"/>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-2 text-white">
        <button v-for="key in keys" :key="key" @click="appendKey(key)" class="p-2 bg-gray-800 rounded">{{ key }}</button>
      </div>
      <div class="mt-4 text-white">
        <!-- GENRES FILTER -->
      </div>

    </div>

    <!-- MOVIES DISPLAYED -->
    <div class="w-[80%] p-4 overflow-y-auto hide-scrollbar">
      <div v-if="results.length === 0" class="text-white
      ">No results found</div>
      <h1  v-if="results.length > 0" class="text-white" >Search Results</h1>
      <div class="grid grid-cols-5 gap-2">
        <div v-for="result in results" :key="result.id" class="p-1">
          <img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" alt="" class="w-full h-[85%]"/>
          <div class="text-white mt-1">{{ result.title || result.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '../stores/movie'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { storeToRefs } from 'pinia'

const query = ref('')
const results = ref([])
const keys = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])

const router = useRouter()
const useMovie = useMovieStore()
const { searchResults } = storeToRefs(useMovie)

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

const searchMovies = async () => {
  if (query.value.trim() !== '') {
    await useMovie.searchMovies(query.value)
    results.value = searchResults.value
  } else {
    results.value = []
    
  }
}
watch(query, searchMovies)
</script>

<style>
</style>

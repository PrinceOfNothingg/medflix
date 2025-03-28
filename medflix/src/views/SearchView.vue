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

      <!-- SPACE AND BACKSPACE -->
      <div class="grid grid-cols-2 gap-2 text-white mb-2">
        <button v-for="key in otherKeys" :key="key.key" @click="handleOtherKey(key.key)" class="p-2 bg-gray-800 rounded">{{ key.icon }}</button>
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
        <div v-for="result in results" :key="result.id" class="p-1 cursor-pointer" @click="selectMovie(result)">
          <img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" alt="" class="w-full h-[85%]"/>
          <div class="text-white mt-1">{{ result.title || result.name }}</div>
        </div>
      </div>
    </div>

    <div v-if="showFullVideo" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-100">
      <iframe 
        :src="videoUrl" 
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="w-full h-full"
      ></iframe>
      <div @click="closeFullVideo" class="absolute top-4 left-4 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer">
        <ChevronLeft fillColor="#000000" :size="40"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '../stores/movie'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import { storeToRefs } from 'pinia'

const query = ref('')
const results = ref([])
const showFullVideo = ref(false)
const videoUrl = ref(null)
const keys = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
const otherKeys = ref([
  { key: 'space', label: 'Space', icon: '␣' },
  { key: 'backspace', label: 'Backspace', icon: '⌫' }
])

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

const selectMovie = async (result) => {
  if (result.media_type === 'movie') {
    await useMovie.fetchMovieDetails(result.id)
  } else if (result.media_type === 'tv') {
    await useMovie.fetchTvDetails(result.id)
  }
  videoUrl.value = useMovie.videoUrl
  showFullVideo.value = true
}

const closeFullVideo = () => {
  showFullVideo.value = false
}

watch(query, searchMovies)
const handleOtherKey = (key) => {
  if (key === 'space') {
    handleSpace()
  } else if (key === 'backspace') {
    handleBackSpace()
  }
}

const handleSpace = () => {
  query.value += ' '
}

const handleBackSpace = () => {
  query.value = query.value.slice(0, -1)
}
</script>

<style>
</style>

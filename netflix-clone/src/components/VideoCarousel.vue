<template>
  <div class="min-w-[1200px] relative">
    <div class="flex justify-between mr-6">
      <div class="flex items-center font-semibold text-white text-2xl cursor-pointer">
        {{ category }}
      </div>
    </div>

    <Carousel 
      ref="carousel" 
      v-model="currentSlide"
      :items-to-show="8" 
      :items-to-scroll="1"
      :wrap-around="true"
      :transition="500"
      snapAlign="start"
      class="bg-transparent"
    >
      <Slide 
        v-for="(slide, index) in movies" 
        :key="slide.id" 
        class="flex items-center object-cover text-white bg-transparent"
      >
        <div 
          @click="selectMovie(slide.id)"
          class="object-cover h-[100%] hover:brightness-125 cursor-pointer" 
          :class="
            currentSlide !== index ? 'border-4 border-transparent' : 'border-4 border-white',
            currentSlideObject(slide, index)
          "
        >
          <img 
            style="user-select: none" 
            class="pointer-events-none h-[100%] z-[-1]" 
            :src="'https://image.tmdb.org/t/p/w500' + slide.poster_path"
          >
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import { useMovieStore } from '../stores/movie'
import { storeToRefs } from 'pinia';
const useMovie = useMovieStore()
const { movie, showFullVideo } = storeToRefs(useMovie)

let currentSlide = ref(0)

const props = defineProps({ category: String, movies: Array })
const { movies, category } = toRefs(props)

const currentSlideObject = (slide, index) => {
  if (index === currentSlide.value) {
    movie.value = slide
  }
}

const fullScreenVideo = (index) => {
  currentSlide.value = index
  setTimeout(() => showFullVideo.value = true, 500)
}

const emit = defineEmits(['selectMovie'])

const selectMovie = (movieId) => {
  emit('selectMovie', movieId)
}
</script>

<style>
.carousel__prev, 
.carousel__next, 
.carousel__prev:hover, 
.carousel__next:hover {
  color: white;
}
</style>
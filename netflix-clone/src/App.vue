<script setup>
import { onMounted, ref } from 'vue';
import { useMovieStore } from './stores/movie'
import { storeToRefs } from 'pinia';

import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import Television from 'vue-material-design-icons/Television.vue';
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

import VideoCarousel from '@/components/VideoCarousel.vue';
import MovieDetails from '@/components/MovieDetails.vue';

const useMovie = useMovieStore()
const { movie, showFullVideo, popularMovies, topRatedMovies, upcomingMovies, videoUrl, trendingMovies, newReleases, documentaries } = storeToRefs(useMovie)

onMounted(() => {
  useMovie.fetchMovies()
})

const selectMovie = (movieId) => {
  useMovie.fetchMovieDetails(movieId)
}
</script>

<template>
  <div class="fixed w-full h-screen bg-black">
    <div v-if="!showFullVideo" id="SideNav" class="flex z-40 items-center w-[120px] h-screen bg-black relative">
      <img class="absolute top-0 w-[90px] mt-6 ml-3" src="/images/netflix.png" alt="">
      <div>
        <div class="py-2 mx-10 my-6">
          <Magnify fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6 border-b-4 border-b-red-500">
          <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <TrendingUp fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <Television fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <MovieOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
        <div class="py-2 mx-10 my-6">
          <Plus fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
        </div>
      </div>
    </div>

    <div v-if="!showFullVideo">
      <div class="fixed flex z-25 top-0 right-0 w-full h-[50%] bg-black pl-[120px] bg-clip-border ">
        <div class="absolute z-20 h-[600px] left-[120px] w-[77%] right-0 top-0 bg-gradient-to-r from-black via-black" />
        
        <MovieDetails v-if="movie" :movie="movie" />

        <iframe 
          v-if="videoUrl" 
          :src="videoUrl" 
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          class="absolute z-0 h-[600px] right-0 top-0 w-full"
        ></iframe>
      </div>

      <div class="fixed z-30 bottom-0 right-0 w-full h-[50%] pl-[120px] overflow-y-auto hide-scrollbar" >
        <VideoCarousel class="pb-5 pt-5" category="Popular Movies" :movies="popularMovies" @selectMovie="selectMovie" />
        <VideoCarousel class="pb-5 pt-5" category="Top Rated Movies" :movies="topRatedMovies" @selectMovie="selectMovie" />
        <VideoCarousel class="pb-5 pt-5" category="Upcoming Movies" :movies="upcomingMovies" @selectMovie="selectMovie" />
        <VideoCarousel class="pb-5 pt-5" category="Now Trending" :movies="trendingMovies" @selectMovie="selectMovie" />
        <VideoCarousel class="pb-5 pt-5" category="New Releases" :movies="newReleases" @selectMovie="selectMovie" />
        <VideoCarousel class="pb-5 pt-5" category="Documentaries" :movies="documentaries" @selectMovie="selectMovie" />

      </div>

      <div class="absolute z-20 h-[70%] left-[120px] w-[100%] right-0 bottom-0 bg-gradient-to-t from-black via-black" />
    </div>

      <iframe 
        :src="videoUrl" 
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="absolute z-0 w-[100vw] h-full object-fit"
      ></iframe>
    </div>
</template>
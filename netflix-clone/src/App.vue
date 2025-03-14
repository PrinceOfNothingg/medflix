<script setup>
import { onMounted, ref } from 'vue';

import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import Television from 'vue-material-design-icons/Television.vue';
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

import { useMovieStore } from './stores/movie';
import { storeToRefs } from 'pinia';
const useMovie = useMovieStore();
const { movie, showFullVideo } = storeToRefs(useMovie);

</script>

<template>
  <div class="fixed w-full h-screen bg-blue-900">
      <div v-if="!showFullVideo" id="SideNav" class="flex z-40 items-center w{120px} h-screen bg-black relative">
        <h1 class="text-white text-2xl font-bold ml-4">Netflix</h1>
      </div>

  </div>
</template>


<template>
  <div v-if="movie" class="z-40 text-white w-[53%] pt-20">
    <div class="text-[55px] font-semibold font-serif">{{ movie.title }}</div>
    <div class="flex items-center text-lg pt-4">
      <div>{{ movie.release_date.split('-')[0] }}</div>
      <div v-for="(genre, index) in movie.genres" :key="index" class="relative">
        <span class="absolute left-[2px] -top-[12px] text-[40px]">.</span>
        <span class="pl-4">{{ genre.name }}</span>
      </div>
    </div>
    <div class="text-2xl pt-6 movie-overview">{{ truncatedOverview }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ movie: Object });

const truncatedOverview = computed(() => {
  const maxLength = 200; // Set the maximum length for the description
  if (props.movie.overview.length > maxLength) {
    return props.movie.overview.substring(0, maxLength) + '...';
  }
  return props.movie.overview;
});
</script>

<style>
.movie-overview {
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
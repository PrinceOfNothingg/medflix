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
    <div class="text-2xl pt-6">{{ movie.overview }}</div>
  </div>
</template>

<script setup>
defineProps({ movie: Object })
</script>
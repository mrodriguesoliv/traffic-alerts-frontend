// src/pages/home/HomePage.vue
<script lang="ts">
export const description = "A sidebar in a dialog."
export const iframeHeight = "800px"
</script>

<script setup lang="ts">
import HomeContent from "./components/HomeContent.vue";
</script>

<template>
  <div class="flex h-svh items-center justify-center">
    <HomeContent />
  </div>
</template>

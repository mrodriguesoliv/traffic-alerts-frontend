// src/pages/home/HomePage.vue
<script lang="ts">
export const description = "A sidebar in a dialog."
export const iframeHeight = "800px"
</script>

<script setup lang="ts">
import AppLayout from "./layouts/AppLayout.vue";
</script>

<template>
  <div class="flex h-svh items-center justify-center overflow-hidden">
    <AppLayout />
  </div>
</template>

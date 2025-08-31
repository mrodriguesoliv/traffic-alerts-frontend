<script lang="ts">
export const description = "A simple login form."
</script>

<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue"
</script>

<template>
  <div class="w-full position absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <LoginForm />
  </div>
</template>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset class="flex flex-col h-screen overflow-hidden">
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-2" />
        <h1 class="text-xl font-bold text-sidebar-foreground">DASHBOARD</h1>
      </header>

      <main>
        <router-view />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AppSidebar from "../components/AppSidebar.vue";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

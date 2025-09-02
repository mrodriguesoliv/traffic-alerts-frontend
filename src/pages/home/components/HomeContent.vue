<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset class="flex flex-col h-screen">
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden block">
              <BreadcrumbLink href="/">Traffic Alerts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{{ route.name || route.path }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main class="flex-1 overflow-y-auto p-4">
        <router-view />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppSidebar from "../components/AppSidebar.vue"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const route = useRoute()
</script>

// src/pages/home/components/AppSidebar.vue
<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

  SidebarRail,
} from "@/components/ui/sidebar"

const props = defineProps<SidebarProps>()

const data = {
  navMain: [
    {
      title: "Traffic Alerts",

      items: [
      ],
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader class="flex flex-row items-center gap-2 mt-4 mb-4 px-4">
        <img src="/waze1.svg" alt="Logo" class="h-8 w-8"/> 
        <h2 class="text-lg font-semibold">Traffic Alerts</h2>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="item in data.navMain" :key="item.title">
        <SidebarGroupLabel>{{ item.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="childItem in item.items" :key="childItem.title">
              <SidebarMenuButton as-child :is-active="childItem.isActive">
                <a :href="childItem.url">{{ childItem.title }}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>

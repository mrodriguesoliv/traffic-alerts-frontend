<template>
  <Card class="m-4 p-0 h-96 md:h-[32rem] lg:h-[32rem]">
    <CardContent class="p-4 h-full">
      <div ref="mapContainer" class="w-full h-full rounded-lg"></div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import L from 'leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { type Alert } from '@/types';

const props = defineProps<{ alerts: Alert[] }>();

const mapContainer = ref<HTMLDivElement | null>(null);
let map: L.Map | null = null;
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  map = L.map(mapContainer.value).setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  resizeObserver = new ResizeObserver(() => {
    if (map) {
      map.invalidateSize();
    }
  });
  resizeObserver.observe(mapContainer.value);
});

onBeforeUnmount(() => {
  if (resizeObserver && mapContainer.value) {
    resizeObserver.unobserve(mapContainer.value);
  }
  if (map) {
    map.remove();
  }
});

watch(
  () => props.alerts,
  (newAlerts) => {
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    const markers = newAlerts.map(alert =>
      L.marker([alert.location.latitude, alert.location.longitude])
        .bindPopup(`<b>${alert.type}</b><br>${alert.description}`)
        .addTo(map!)
    );

    if (markers.length) {
      const group = new L.FeatureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  },
  { deep: true, immediate: true }
);
</script>
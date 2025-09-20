<template>
  <TrafficMap :alerts="alerts"/>

  <Separator class="my-4" />

  <p v-if="loading" class="text-gray-500 text-center">Carregando alertas!</p>

  <div v-else-if="alerts.length" class="grid m-4 gap-4">
    <ScrollArea class="h-69">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          v-for="alert in alerts"
          :key="alert.id"
          :class="[
            'p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer border-0',
            getAlertBorderClass(alert.type)
          ]"
        >
          <CardContent class="p-0 flex items-center gap-2">
            <img
              :src="getAlertIcon(alert.type)"
              alt="alert icon"
              class="w-8 h-8 mr-2"
            />
            <div>
              <p class="uppercase font-bold text-xs mb-1">{{ alert.type }}</p>
              <p class="text-sm">
                {{ alert.description }}
                <small class="text-gray-500">({{ formatTimestamp(alert.time) }})</small>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  </div>
  
  <p v-else class="text-gray-500 mt-4 text-center">
    Nenhum alerta de tráfego no momento.
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchTrafficAlerts } from '@/services/apiService';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';
import { getAlertIcon, getAlertBorderClass } from '@/utils/alerts/icons/getAlertStyle';
import TrafficMap from '../components/TrafficMap.vue';
import { type Alert } from '@/types';

const alerts = ref<Alert[]>([]);
const loading = ref(true);
let intervalId: number | null = null;
 
const formatTimestamp = (ts: number): string => new Date(ts).toLocaleString();

const fetchAlerts = async () => {
  loading.value = true;
  try {
    const data = await fetchTrafficAlerts();
    alerts.value = data.alerts || [];
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    alerts.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAlerts();
  intervalId = setInterval(fetchAlerts, 60000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>


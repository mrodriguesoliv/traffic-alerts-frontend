<template>
  <Card class="h-120 m-4">
    <CardContent class="p-4">
      <!-- Aqui vai o mapa, depois você decide Leaflet, MapLibre, Google Maps etc -->
    </CardContent>
  </Card>

  <Separator class="my-4" />
    <p class="font-bold ml-5">Alertas de Tráfego</p>

  <p v-if="loading" class="text-gray-500">Carregando alertas!</p>

  <div v-if="alerts.length" class="grid m-4 md:grid-cols-2 lg:grid-cols-3 gap-4">

    <ScrollArea>
      <div>
        <Card v-for="alert in alerts" :key="alert.id" class="p-4 mb-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <CardContent class="p-0">
            <p class="uppercase font-bold text-xs mb-3">{{ alert.type }}</p>
            <p class="text-sm"> {{ alert.description }} -
              <small class="text-gray-500">{{ formatTimestamp(alert.time) }}</small>
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>

    <p v-if="!alerts.length && !loading" class="text-gray-500 mt-4 text-center">
      Nenhum alerta de tráfego no momento.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchTrafficAlerts } from '@/services/apiService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Separator from '@/components/ui/separator/Separator.vue';

const alerts = ref([]);
const jams = ref([]);
const loading = ref(true);
let intervalId = null;

const formatTimestamp = (ts) => new Date(ts).toLocaleString();

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

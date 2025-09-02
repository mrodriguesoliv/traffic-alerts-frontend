<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-semibold mb-4">Traffic Notification</h1>

    <p v-if="loading" class="text-gray-500">Carregando alertas...</p>

    <div v-if="alerts.length" class="grid gap-2">
      <Card 
        v-for="alert in alerts" 
        :key="alert.id" 
        class="p-4 w-auto shadow rounded-lg border border-gray-200"
      >
        <CardHeader>
          <CardTitle class="uppercase font-bold text-sm">{{ alert.type }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{{ alert.description }}</p>
          <small class="text-gray-500">{{ formatTimestamp(alert.time) }}</small>
        </CardContent>
      </Card>
    </div>

    <div v-if="jams.length" class="grid gap-2 mt-2">
      <Card 
        v-for="jam in jams" 
        :key="jam.id" 
        class="p-4 w-auto shadow rounded-lg border border-gray-200"
      >
        <CardHeader>
          <CardTitle class="uppercase font-bold text-sm">Trânsito lento</CardTitle>
        </CardHeader>
        <CardContent class="space-y-1">
          <p>Velocidade média: {{ jam.speed }} km/h</p>
          <small class="text-gray-500">Linhas afetadas: {{ jam.line.length }}</small>
        </CardContent>
      </Card>
    </div>

    <p v-if="!alerts.length && !jams.length && !loading" class="text-gray-500 mt-4 text-center">
      Nenhum alerta de tráfego no momento.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchTrafficAlerts } from '@/services/apiService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
    jams.value = data.jams || [];
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    alerts.value = [];
    jams.value = [];
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

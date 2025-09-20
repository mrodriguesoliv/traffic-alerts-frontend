<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { login } from "@/services/apiService";
import { useAuthStore } from "@/stores/authStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  errorMsg.value = "";
  if (!email.value || !password.value) {
    errorMsg.value = "Preencha email e senha";
    return;
  }

  loading.value = true;
  try {
    const data = await login(email.value, password.value);

    if (data?.token) {
      authStore.setUser(email.value, data.token);
      router.push("/dashboard");
    } else {
      errorMsg.value = "Usuário ou senha inválidos";
    }
  } catch (err) {
    console.error(err);
    errorMsg.value = "Erro ao conectar com o servidor";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Card class="mx-auto max-w-sm mt-[50vh] transform -translate-y-1/2">
    <CardHeader>
      <CardTitle class="text-2xl">Sign In</CardTitle>
      <CardDescription>Entre com seu email e senha</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="grid gap-4" @submit.prevent="handleLogin">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required v-model="email" />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Senha</Label>
          </div>
          <Input id="password" type="password" required v-model="password" />
        </div>

        <Button type="submit" class="w-full" :disabled="loading">
          <span v-if="loading">Entrando...</span>
          <span v-else>Login</span>
        </Button>

        <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
      </form>

      <div class="mt-4 text-center text-sm">
        Não tem uma conta?
        <RouterLink to="/auth/signin" class="font-bold">Cadastre-se</RouterLink>
      </div>
    </CardContent>
  </Card>
</template>

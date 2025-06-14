<script setup lang="ts">
import Top from '@/components/menu/TopMenu.vue'
import Side from '@/components/menu/SideMenu.vue'
import Button from '@/components/menu/AddButtonMenu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <Top />

    <!-- Contenedor principal -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar a la izquierda -->
      <Side />

      <!-- Contenedor de contenido + botón -->
      <div class="flex-1 relative overflow-auto p-6">
        <!-- Contenido principal -->
        <RouterView />

        <!-- Botón flotante -->
        <div class="absolute bottom-6 right-6 z-50">
          <Button />
        </div>
      </div>
    </div>
  </div>
</template>

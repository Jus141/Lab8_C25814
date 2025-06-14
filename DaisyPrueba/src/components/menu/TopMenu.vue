<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="navbar bg-base-200 shadow-sm">
      
      <RouterLink to="/" class="btn btn-ghost text-xl">Gestor de Proyectos</RouterLink>
      
      <RouterLink to="/proyectos" class="btn btn-ghost">Visualizar Proyectos</RouterLink>
    </div>
  </header>
</template>


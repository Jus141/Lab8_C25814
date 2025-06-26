<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useProyectosStore } from './stores/proyectos'

const store = useProyectosStore()

onMounted(() => {
  store.cargarDesdeLocalStorage()
})
</script>

<template>
    <RouterView />
</template>

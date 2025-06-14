<template>
  <div class="overflow-x-auto p-6">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proyecto in store.proyectos" :key="proyecto.id">
          <td class="font-bold">{{ proyecto.nombre }}</td>
          <td>{{ proyecto.tareas.length }}</td>
          <td class="w-1/3">
            <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                class="h-4 rounded-full bg-blue-500 text-xs flex items-center justify-center text-white"
                :style="{ width: calcularAvance(proyecto) + '%' }"
              >
                {{ calcularAvance(proyecto) }}%
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="store.proyectos.length === 0">
          <td colspan="3" class="text-center text-gray-400">No existen proyectos</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useProyectosStore } from '@/stores/proyectos'
import type { Proyecto } from '@/stores/proyectos'

const store = useProyectosStore()

function calcularAvance(proyecto: Proyecto) {
  if (proyecto.tareas.length === 0) return 0
  const completadas = proyecto.tareas.filter(t => t.completada).length
  return Math.round((completadas / proyecto.tareas.length) * 100)
}
</script>

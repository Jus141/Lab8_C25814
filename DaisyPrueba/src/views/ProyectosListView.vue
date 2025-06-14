<script setup lang="ts">
import { useProyectosStore } from '@/stores/proyectos'
import { useRouter } from 'vue-router'
import ProgressBar from '@/components/menu/ProgressBar.vue'

const store = useProyectosStore()
const router = useRouter()

const irAProyecto = (id: number) => {
  router.push(`/proyecto/${id}`)
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Proyectos</h1>
    
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tareas</th>
            <th>Progreso</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="proyecto in store.proyectos" 
            :key="proyecto.id"
            class="hover:bg-base-200 cursor-pointer"
            @click="irAProyecto(proyecto.id)"
          >
            <td class="font-bold">{{ proyecto.nombre }}</td>
            <td>{{ proyecto.tareas.length }}</td>
            <td class="w-1/3">
              <div class="flex items-center gap-2">
                <ProgressBar :value="store.calcularAvance(proyecto)" />
                <span class="text-sm">{{ store.calcularAvance(proyecto) }}%</span>
              </div>
            </td>
          </tr>
          <tr v-if="store.proyectos.length === 0">
            <td colspan="3" class="text-center text-gray-500">
              No existen proyectos
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 
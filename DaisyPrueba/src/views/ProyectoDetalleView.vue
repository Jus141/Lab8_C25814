<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProyectosStore } from '@/stores/proyectos'
import type { Tarea } from '@/stores/proyectos'
import ProgressBar from '@/components/menu/ProgressBar.vue'

const route = useRoute()
const router = useRouter()
const store = useProyectosStore()
const nuevaTarea = ref('')


const editandoTarea = ref<number | null>(null)
const nombreTareaEditando = ref('')
const inputTareaRef = ref<HTMLInputElement | null>(null)

const proyecto = computed(() => {
  const id = Number(route.params.id)
  return store.proyectos.find(p => p.id === id)
})

const agregarTarea = () => {
  if (nuevaTarea.value.trim() && proyecto.value) {
    store.agregarTarea(proyecto.value.id, nuevaTarea.value.trim())
    nuevaTarea.value = ''
  }
}

const toggleTarea = (tareaId: number) => {
  if (proyecto.value) {
    store.toggleTarea(proyecto.value.id, tareaId)
  }
}

const iniciarEdicionTarea = (tarea: Tarea) => {
  editandoTarea.value = tarea.id
  nombreTareaEditando.value = tarea.nombre
  
  nextTick(() => {
    inputTareaRef.value?.focus()
  })
}

const guardarEdicionTarea = (tareaId: number) => {
  if (nombreTareaEditando.value.trim() && proyecto.value) {
    store.editarNombreTarea(proyecto.value.id, tareaId, nombreTareaEditando.value)
  }
  editandoTarea.value = null
  nombreTareaEditando.value = ''
}

const cancelarEdicionTarea = () => {
  editandoTarea.value = null
  nombreTareaEditando.value = ''
}

const eliminarTarea = (tareaId: number) => {
  if (proyecto.value && confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    store.eliminarTarea(proyecto.value.id, tareaId)
  }
}

const manejarKeydownTarea = (event: KeyboardEvent, tareaId: number) => {
  if (event.key === 'Enter') {
    guardarEdicionTarea(tareaId)
  } else if (event.key === 'Escape') {
    cancelarEdicionTarea()
  }
}

const manejarClickInputTarea = (event: Event) => {
  event.stopPropagation() 
}


onMounted(() => {
  if (!proyecto.value) {
    router.push('/')
  }
})
</script>

<template>
  <div class="p-6">
    <div v-if="proyecto" class="space-y-6">
      <h1 class="text-2xl font-bold">{{ proyecto.nombre }}</h1>
      
      <div class="flex items-center gap-2">
        <ProgressBar :value="store.calcularAvance(proyecto)" />
        <span class="text-sm">{{ store.calcularAvance(proyecto) }}%</span>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Completado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tarea in proyecto.tareas" :key="tarea.id">
              <td>{{ tarea.id }}</td>
              <td>
                <!-- Modo edición -->
                <div v-if="editandoTarea === tarea.id" class="flex items-center gap-2">
                  <input
                    ref="inputTareaRef"
                    v-model="nombreTareaEditando"
                    type="text"
                    class="input input-bordered input-sm flex-1"
                    @keydown="manejarKeydownTarea($event, tarea.id)"
                    @blur="guardarEdicionTarea(tarea.id)"
                    @click="manejarClickInputTarea"
                    autofocus
                  />
                </div>
                <!-- Modo visualización -->
                <div 
                  v-else 
                  @dblclick="iniciarEdicionTarea(tarea)"
                  class="min-h-[2rem] flex items-center cursor-pointer hover:bg-base-200 px-2 rounded"
                >
                  {{ tarea.nombre }}
                </div>
              </td>
              <td>
                <input
                  type="checkbox"
                  :checked="tarea.completada"
                  @change="toggleTarea(tarea.id)"
                  class="checkbox"
                />
              </td>
              <td>
                <div class="flex gap-2">
                  <button
                    @click="iniciarEdicionTarea(tarea)"
                    class="btn btn-md btn-ghost"
                    title="Editar nombre"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button
                    @click="eliminarTarea(tarea.id)"
                    class="btn btn-md btn-error btn-outline"
                    title="Eliminar tarea"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="proyecto.tareas.length === 0">
              <td colspan="4" class="text-center text-gray-500">
                No existen tareas en este proyecto
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex gap-2">
        <input
          v-model="nuevaTarea"
          type="text"
          placeholder="Nueva tarea"
          class="input input-bordered flex-1"
          @keydown.enter.prevent="agregarTarea"
        />
        <button
          class="btn btn-primary"
          @click="agregarTarea"
          :disabled="!nuevaTarea.trim()"
        >
          Agregar
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Proyecto no encontrado
    </div>
  </div>
</template> 
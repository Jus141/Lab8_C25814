<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useProyectosStore } from '@/stores/proyectos'
import { useRouter } from 'vue-router'
import ProgressBar from '@/components/menu/ProgressBar.vue'

const store = useProyectosStore()
const router = useRouter()


const editandoProyecto = ref<number | null>(null)
const nombreEditando = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const irAProyecto = (id: number) => {
  router.push(`/proyecto/${id}`)
}

const iniciarEdicion = (proyecto: any) => {
  editandoProyecto.value = proyecto.id
  nombreEditando.value = proyecto.nombre
 
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const guardarEdicion = (proyectoId: number) => {
  if (nombreEditando.value.trim()) {
    store.editarNombreProyecto(proyectoId, nombreEditando.value)
  }
  editandoProyecto.value = null
  nombreEditando.value = ''
}

const cancelarEdicion = () => {
  editandoProyecto.value = null
  nombreEditando.value = ''
}

const eliminarProyecto = (proyectoId: number, event: Event) => {
  event.stopPropagation() 
  if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
    store.eliminarProyecto(proyectoId)
  }
}

const manejarKeydown = (event: KeyboardEvent, proyectoId: number) => {
  if (event.key === 'Enter') {
    guardarEdicion(proyectoId)
  } else if (event.key === 'Escape') {
    cancelarEdicion()
  }
}

const manejarClickInput = (event: Event) => {
  event.stopPropagation() 
}

const limpiarDatos = () => {
  if (confirm('¿Estás seguro de que quieres eliminar todos los proyectos y tareas? Esta acción no se puede deshacer.')) {
    store.limpiarLocalStorage()
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Proyectos</h1>
      <button
        @click="limpiarDatos"
        class="btn btn-error btn-outline"
        title="Limpiar todos los datos"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        Limpiar Datos
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tareas</th>
            <th>Progreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="proyecto in store.proyectos" 
            :key="proyecto.id"
            class="hover:bg-base-200 cursor-pointer"
            @click="irAProyecto(proyecto.id)"
          >
            <td class="font-bold">
              <!-- Modo edición -->
              <div v-if="editandoProyecto === proyecto.id" class="flex items-center gap-2">
                <input
                  ref="inputRef"
                  v-model="nombreEditando"
                  type="text"
                  class="input input-bordered input-sm flex-1"
                  @keydown="manejarKeydown($event, proyecto.id)"
                  @blur="guardarEdicion(proyecto.id)"
                  @click="manejarClickInput"
                  autofocus
                />
              </div>
              <!-- Modo visualización -->
              <div 
                v-else 
                @dblclick.stop="iniciarEdicion(proyecto)"
                class="min-h-[2rem] flex items-center"
              >
                {{ proyecto.nombre }}
              </div>
            </td>
            <td>{{ proyecto.tareas.length }}</td>
            <td class="w-1/3">
              <div class="flex items-center gap-2">
                <ProgressBar :value="store.calcularAvance(proyecto)" />
                <span class="text-sm">{{ store.calcularAvance(proyecto) }}%</span>
              </div>
            </td>
            <td>
              <div class="flex gap-2" @click.stop>
                <button
                  @click="iniciarEdicion(proyecto)"
                  class="btn btn-md btn-ghost"
                  title="Editar nombre"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button
                  @click="eliminarProyecto(proyecto.id, $event)"
                  class="btn btn-md btn-error btn-outline"
                  title="Eliminar proyecto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="store.proyectos.length === 0">
            <td colspan="4" class="text-center text-gray-500">
              No existen proyectos
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 
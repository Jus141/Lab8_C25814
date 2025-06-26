<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AddButtonMenu2 from '@/components/menu/AddButtonMenu2.vue'
import { useProyectosStore } from '@/stores/proyectos'

const store = useProyectosStore()
const router = useRouter()
const nuevoProyecto = ref('')

const irAProyecto = (id: number) => {
  router.push(`/proyecto/${id}`)
}

const eliminarProyecto = (proyectoId: number, event: Event) => {
  event.stopPropagation() 
  if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
    store.eliminarProyecto(proyectoId)
   
    if (router.currentRoute.value.params.id === proyectoId.toString()) {
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="relative min-h-screen p-6">
    <ul
      v-if="store.proyectos.length > 0"
      class="menu bg-base-200 rounded-box w-56 mb-4"
    >
      <li v-for="proyecto in store.proyectos" :key="proyecto.id">
        <div class="flex items-center justify-between w-full">
          <a @click="irAProyecto(proyecto.id)" class="cursor-pointer flex-1">
            {{ proyecto.nombre }}
          </a>
          <button
            @click="eliminarProyecto(proyecto.id, $event)"
            class="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
            title="Eliminar proyecto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500 italic">
      No existen proyectos
    </p>

    <AddButtonMenu2 @guardar="(nuevo) => { store.agregarProyecto(nuevo) }">
      <template #default="{ guardar, close }">
        <h3 class="font-bold text-lg">Agregar proyecto</h3>
        <input
          v-model="nuevoProyecto"
          type="text"
          placeholder="Nombre del proyecto"
          class="input input-bordered w-full my-4"
          @keydown.enter.prevent="
            nuevoProyecto.trim() !== '' && (
              guardar(nuevoProyecto.trim()), 
              nuevoProyecto = ''
            )
          "
        />
        <div class="modal-action flex justify-between">
          <button
            class="btn btn-success w-1/2 mr-2"
            @click="guardar(nuevoProyecto.trim()); nuevoProyecto = ''"
            :disabled="nuevoProyecto.trim() === ''"
          >
            Guardar
          </button>
          <button
            class="btn btn-outline w-1/2"
            @click="close(); nuevoProyecto = ''"
          >
            Cerrar
          </button>
        </div>
      </template>
    </AddButtonMenu2>
  </div>
</template>

<style scoped>
:deep(.btn-circle) {
  width: 3.5rem;
  height: 3.5rem;
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
}
</style>

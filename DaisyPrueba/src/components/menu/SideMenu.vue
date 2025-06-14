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
</script>

<template>
  <div class="relative min-h-screen p-6">
    <ul
      v-if="store.proyectos.length > 0"
      class="menu bg-base-200 rounded-box w-56 mb-4"
    >
      <li v-for="proyecto in store.proyectos" :key="proyecto.id">
        <a @click="irAProyecto(proyecto.id)" class="cursor-pointer">
          {{ proyecto.nombre }}
        </a>
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

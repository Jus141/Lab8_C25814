<script setup lang="ts">
import { ref, defineExpose, defineEmits } from 'vue'
const modalRef = ref<HTMLDialogElement | null>(null)
const emit = defineEmits(['guardar'])
const openModal = () => modalRef.value?.showModal()
const closeModal = () => modalRef.value?.close()
defineExpose({ openModal, closeModal })
</script>

<template>
  <div>
    <button
      @click="openModal"
      class="btn btn-circle btn-primary"
      aria-label="Abrir modal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>
    </button>
    <dialog ref="modalRef" class="modal">
      <div class="modal-box">
        <slot
          :close="closeModal"
          :guardar="(texto: string) => { emit('guardar', texto); closeModal() }"
        />
      </div>
    </dialog>
  </div>
</template>



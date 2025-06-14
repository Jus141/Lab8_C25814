<script setup lang="ts">
defineProps<{
  value: number
  max?: number
}>()
</script>

<template>
  <progress 
    class="progress progress-primary w-full" 
    :value="value" 
    :max="max || 100"
  ></progress>
</template> 
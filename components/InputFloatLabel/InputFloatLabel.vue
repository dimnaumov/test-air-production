<script setup lang="ts">
const props = defineProps<{
  error?: string;
}>();
</script>

<template>
  <div class="input-float-label">
    <NuxtFloatLabel>
      <slot />
    </NuxtFloatLabel>

    <div v-if="props.error" class="error">
      {{ props.error }}
    </div>
  </div>
</template>

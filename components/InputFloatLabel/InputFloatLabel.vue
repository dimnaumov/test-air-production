<script setup lang="ts">
const props = defineProps<{
  error?: string;
}>();
</script>

<template>
  <div :class="$style.inputFloatLabel">
    <NuxtFloatLabel>
      <slot />
    </NuxtFloatLabel>
  </div>

  <div v-if="props.error" :class="$style.error">
    {{ props.error }}
  </div>
</template>

<style lang="scss" module>
@use '~/assets/styles/form' as form;

.inputFloatLabel {
  @include form.field;

  label {
    left: 0;
  }
}

.error {
  @include form.error;
}
</style>

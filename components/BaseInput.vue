<script setup lang="ts">
type Props = {
  type: string;
  placeholder?: string;
  mask?: string;
}

defineProps({
  type: {
    type: String,
    default: 'text',
  },

  placeholder: {
    type: String,
    default: '',
  },

  mask: {
    type: String,
  },
});

const value = defineModel();

const inputElement: Ref<HTMLInputElement | null> = ref(null);

defineExpose({
  inputElement,
});
</script>

<template>
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    v-mask="mask ?? null"
    ref="inputElement"
  />
</template>

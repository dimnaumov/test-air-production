<script setup lang="ts">
type Props = {
  modelValue: string;
  type: string;
  placeholder?: string;
  mask?: string;
}

const props: Props = defineProps({
  modelValue: {
    type: [String],
    required: true,
  },

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

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value.toString());
  }
});
</script>

<template>
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    v-mask="mask ?? null"
  />
</template>

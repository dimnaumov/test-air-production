<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
    required: true,
  },
  error: {
    type: String,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectRef = ref(null);

function updateValue(event) {
  const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
  emit('update:modelValue', selectedOptions);
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (selectRef.value && props.multiple) {
      Array.from(selectRef.value.options).forEach((option) => {
        option.selected = newValue.includes(option.value);
      });
    }
  },
);
</script>

<template>
  <select
    ref="select"
    :multiple="multiple"
    @change="updateValue"
  >
    <option value="">Выберите один из вариантов</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :selected="modelValue.includes(option.value)"
    >
      {{ option.label }}
    </option>
  </select>

  <div v-if="props.error" class="error">
    {{ props.error }}
  </div>
</template>

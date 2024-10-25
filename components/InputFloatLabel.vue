<script setup lang="ts">
import { useField } from 'vee-validate';

type Props = {
  name: string;
  type: string;
  placeholder: string;
  mask: string;
}

const props: Props = defineProps({
  name: {
    type: String,
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
    default: '',
  },
});

const { value, errorMessage } = useField(props.name as string);
</script>

<template>
  <div class="wrapper">
    <div class="input">
      <NuxtFloatLabel>
        <input
          v-model="value"
          :type="type || 'text'"
          :placeholder="placeholder"
          v-mask="props.mask"
        />
      </NuxtFloatLabel>
    </div>

    <div class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

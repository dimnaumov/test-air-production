<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

type Props = {
  title?: string;
  onConfirm?: () => void;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();

const closeModal = () => {
  emit('confirm');
}
</script>

<template>
  <VueFinalModal
    :class="$style.modalResident"
    :content-class="$style.modalContent"
  >
    <FormResident @closeModal="closeModal" />
  </VueFinalModal>
</template>

<style lang="scss" module>
.modalResident {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalContent {
  width: 100%;
  max-width: 800px;
  background-color: white;
  padding: 40px;
}
</style>

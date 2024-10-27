<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

type Props = {
  title?: string;
  onConfirm?: () => void;
}

defineProps<Props>();

const onOpened = async () => {
  await nextTick();
};
</script>

<template>
  <VueFinalModal
    :class="$style.modalResident"
    :content-class="$style.modalContent"
    @opened="onOpened"
  >
    <FormResident />
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

<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'
import BaseModal from '~/components/BaseModal.vue';

const { open, close } = useModal({
  component: BaseModal,
  attrs: {
    title: 'Заполните заявку, чтобы стать резидентом',
    onConfirm: function() {
      close()
    },
  },
});
</script>

<template>
  <div :class="$style.container">
    <button @click="() => open()" :class="$style.button">
      Стать резидентом
    </button>

    <ModalsContainer />
  </div>
</template>

<style lang="scss" module>
@use '~/assets/styles/button' as button;

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.button {
  @include button.button-outline;
}
</style>

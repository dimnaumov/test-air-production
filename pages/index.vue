<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalResident from '~/components/ModalResident.vue';

const { open, close } = useModal({
  component: ModalResident,
  attrs: {
    title: 'Заполните заявку, чтобы стать резидентом',
    onConfirm: function() {
      close()
    },
  },
});
</script>

<template>
  <div>
    <h1>Index.vue</h1>

    <button @click="() => open()">
      Стать резидентом
    </button>

    <ModalsContainer />
  </div>
</template>

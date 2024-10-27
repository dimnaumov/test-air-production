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
  <div>
    <h1>Index.vue</h1>

    <button @click="() => open()">
      Стать резидентом
    </button>

    <ModalsContainer />
  </div>
</template>

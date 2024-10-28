import { defineNuxtPlugin } from '#app'
import { mask } from 'vue-the-mask'

// ts-ignore: https://github.com/vuejs-tips/vue-the-mask/issues/82

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', {
    mounted(el, binding) {
      if (!binding.value) return;
      // @ts-ignore
      mask(el, binding);
    },
    updated(el, binding) {
      if (!binding.value) return;
      // @ts-ignore
      mask(el, binding);
    }
  });
})

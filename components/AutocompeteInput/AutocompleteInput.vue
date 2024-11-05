<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import debounce from 'debounce';
import type { ModelRef } from 'vue';

const AUTOCOMPLETE_URL = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const AUTOCOMPLETE_KEY = '5803b7769cfffcc01f0aec7a5e5933208ef46786';

interface Suggestion {
  value: string;
  unrestricted_value: string;
  data: object;
}

const value = defineModel() as ModelRef<string>;

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  }
})

const autocompleteList: Ref<Suggestion[]> = ref([]);
const input: Ref<{ inputElement: HTMLInputElement | null } | null> = ref(null);

const debouncedFetch = debounce((newValue: string) => {
  fetchData(newValue);
}, 500);

watch(value, (newValue: string) => {
  if (newValue.trim().length) {
    debouncedFetch(newValue);
  }
});

async function fetchData(query: string) {
  const options = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + AUTOCOMPLETE_KEY
    },
    body: JSON.stringify({ query: query }),
  };

  try {
    const response = await fetch(AUTOCOMPLETE_URL, options);

    if (!response.ok) {
      throw createError({
        status: response.status,
        statusCode: response.status,
        statusMessage: response.statusText,
        statusText: response.statusText,
        message: `${response.status} - ${response.statusText}`,
      });  
    }

    const data = await response.json();

    autocompleteList.value = data.suggestions
      .filter((suggestion: Suggestion) => suggestion.value !== value.value.trim());
  } catch (error) {
    console.error("error", error);
  }
}

function chooseHandle(choosedValue: string) {
  value.value = `${choosedValue} `;
  input.value?.inputElement?.focus();
}
</script>

<template>
  <div :class="$style.root">
    <InputFloatLabel
      :error="error"
    >
      <BaseInput ref="input" v-model="value" :placeholder="props.placeholder"/>
    </InputFloatLabel>

    <div v-if="autocompleteList.length" :class="$style.autocompleteList">
      <div
        v-for="item in autocompleteList"
        :key="item.value"
        :class="$style.autocompleteItem"
        @click="chooseHandle(item.value)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@use '~/assets/styles/form' as form;

.root {
  position: relative;
}

.autocompleteList {
  @include form.field;

  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 10px 0;
  background-color: var(--color-other-main-bg);
  z-index: 1;
}

.autocompleteItem {
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-primary);
    color: var(--color-black-white-white-fixed);
  }
}
</style>

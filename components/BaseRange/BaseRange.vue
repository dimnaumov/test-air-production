<script setup lang="ts">

type Props = {
  labelFrom: string;
  labelTo: string;
  errorFrom: string;
  errorTo: string;
  type?: string;
}

const props: Props = defineProps({
  labelFrom: {
    type: String,
    default: '',
  },

  labelTo: {
    type: String,
    default: '',
  },

  errorFrom: {
    type: String,
    default: '',
  },

  errorTo: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },
});

const from = defineModel('from');
const to = defineModel('to');
</script>

<template>
  <div v-if="$slots.label" :class="$style.label">
    <slot name="label" />
  </div>

  <div :class="$style.range">
    <div>
      <div :class="$style.field">
        <label for="from">{{ props.labelFrom }}</label>
  
        <BaseInput
          v-model="from"
          :type="props.type"
          id="from"
        />
      </div>
  
      <div v-if="props.errorFrom" :class="$style.error">
        {{ props.errorFrom }}
      </div>
    </div>

    <div>
      <div :class="$style.field">
        <label for="to">{{ props.labelTo }}</label>
  
        <BaseInput
          v-model="to"
          :type="props.type"
          id="to"
        />  
      </div>

      <div v-if="props.errorTo" :class="$style.error">
        {{ props.errorTo }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@use '~/assets/styles/form' as form;

.label {
  margin-bottom: 20px;
}

.range {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.field {
  @include form.field;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  align-items: center;

  input {
    text-align: right;
  }
}

.error {
  @include form.error;
}
</style>

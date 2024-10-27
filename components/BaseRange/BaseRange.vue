<script setup lang="ts">

type Props = {
  from: string;
  to: string;
  labelFrom: string;
  labelTo: string;
  errorFrom: string;
  errorTo: string;
  type?: string;
}

const props: Props = defineProps({
  from: {
    type: [String],
    default: '',
  },

  to: {
    type: [String],
    default: '',
  },

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

const emit = defineEmits(['update:from', 'update:to']);

const valueFrom = computed({
  get() {
    return props.from;
  },
  set(value) {
    emit('update:from', value);
  }
});

const valueTo = computed({
  get() {
    return props.to;
  },
  set(value) {
    emit('update:to', value);
  }
});

</script>

<template>
  <div class="range">
    <div class="from">
      <div class="labelFrom">{{ props.labelFrom }}</div>

      <BaseInput
        v-model="valueFrom"
        :type="props.type"
      />

      <div v-if="props.errorFrom" class="error">
        {{ props.errorFrom }}
      </div>
    </div>

    <div class="to">
      <div class="labelTo">{{ props.labelTo }}</div>

      <BaseInput
        v-model="valueTo"
        :type="props.type"
      />

      <div v-if="props.errorTo" class="error">
        {{ props.errorTo }}
      </div>
    </div>
  </div>
</template>

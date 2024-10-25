<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

type Props = {
  title?: string;
  onConfirm?: () => void;
}

defineProps<Props>();

const phoneMask = '+7 (###) ###-####';

const options = [
  {
    label: 'Производственные площади',
    value: 'production-areas',
  },
  {
    label: 'Складские помещения',
    value: 'warehouse-areas',
  } , 
    {
    label: 'Офисы',
    value: 'offices',
  },
    {
    label: 'Торговые площади',
    value: 'reatail-areas',
  },
    {
    label: 'Выставочные площади',
    value: 'exhibition-areas',
  },
  {
    label: 'Сервисные станции',
    value: 'service-stations',
  },
];

const multiple = true;

const selectedValues = ref([]);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string()
      .required('Это поле обязательно для заполнения')
      .min(8, 'Минимум 8 символов')
      .max(50, 'Максимум 50 символов'),

    phone: yup.string()
      .required('Телефон обязателен')
      .matches(/^\+7 \(\d{3}\) \d{3}-\d{4}$/, `Формат телефона должен быть: ${phoneMask}`),

    address: yup.string().required(),
  }),
});

const onSubmit = handleSubmit(values => {
  console.warn(JSON.stringify(values, null, 2));
});
</script>

<template>
  <VueFinalModal
    :class="$style.modalResident"
    :content-class="$style.modalContent"
  >
    <h1 class="text-xl">
      {{ title }}
    </h1>

    <form @submit="onSubmit">
      <InputFloatLabel
        name="name"
        type="text"
        placeholder="Наименование организации / ИП"
      />

      <InputFloatLabel
        name="phone"
        type="text"
        :mask="phoneMask"
        placeholder="Контактный телефон"
      />

      <InputFloatLabel
        name="address"
        type="text"
        placeholder="Адрес"
      />

      <BaseSelect
        :options="options"
        :multiple="multiple"
        v-model="selectedValues"
      />

      <button>Отправить</button>
    </form>
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

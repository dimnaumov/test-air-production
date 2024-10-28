<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const phoneMask = '+7 (###) ###-####';

const options = [
  {
    label: 'Производственные площади',
    value: 'production-areas',
  },
  {
    label: 'Складские помещения',
    value: 'warehouse-areas',
  },
  {
    label: 'Офисы',
    value: 'offices',
  },
  {
    label: 'Торговые площади',
    value: 'retail-areas',
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

const emit = defineEmits<{
  (e: 'closeModal'): void;
}>();

const validationSchema = yup.object({
  name: yup.string()
    .required('Это поле обязательно для заполнения')
    .min(5, 'Минимум 5 символов')
    .max(50, 'Максимум 50 символов'),

  phone: yup.string()
    .required('Телефон обязателен')
    .matches(
      /^\+7 \(\d{3}\) \d{3}-\d{4}$/,
      `Формат телефона должен быть: ${phoneMask}`
    ),

  address: yup.string()
    .required('Это поле обязательно для заполнения'),

  areas: yup.array()
    .required('Выберите тип помещения из списка')
    .min(1, 'Выберите хотя бы один тип помещения')
    .of(yup.string().oneOf(options.map(option => option.value), 'Выберите тип помещения из списка')),

  areaFrom: yup.number()
    .required('Поле обязательно для заполнения')
    .min(1, 'Значение должно быть больше 0'),

  areaTo: yup
    .number()
    .required('Поле обязательно для заполнения')
    .moreThan(yup.ref('areaFrom'), 'Значение "до" должно быть больше значения "от"'),

  rentFrom: yup.date()
    .required('Дата начала обязательна')
    .typeError('Некорректная дата'),

  rentTo: yup.date()
    .required('Дата окончания обязательна')
    .typeError('Некорректная дата')
    .min(yup.ref('rentFrom'), 'Дата окончания должна быть позже даты начала'),

});

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    phone: '',
    address: '',
    areas: [],
    areaFrom: "0",
    areaTo: "0",
    rentFrom: '',
    rentTo: '',
  },
});

const { value: fieldNameValue, errorMessage: fieldNameError } = useField('name');
const { value: fieldPhoneValue, errorMessage: fieldPhoneError } = useField('phone');
const { value: fieldAddressValue, errorMessage: fieldAddressError } = useField('address');
const { value: fieldAreasValue, errorMessage: fieldAreasError } = useField('areas');

const { value: fieldAreaFrom, errorMessage: fieldAreaFromError } = useField('areaFrom');
const { value: fieldAreaTo, errorMessage: fieldAreaToError } = useField('areaTo');

const { value: fieldRentFrom, errorMessage: fieldRentFromError } = useField('rentFrom');
const { value: fieldRentTo, errorMessage: fieldRentToError } = useField('rentTo');

const formSubmitted: Ref<boolean> = ref(false);
const errorMessage: Ref<string | null> = ref(null);
const successMessage: Ref<string | null> = ref('Форма успешно сохранена');

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch('/api/form', {
      method: 'POST',
      body: values,
    });

    if (response.success) {
      successMessage.value = response.message || 'Форма успешно сохранена';
      formSubmitted.value = true;
    } else {
      errorMessage.value = response.message || 'Неизвестная ошибка при сохранении формы';
    }
  } catch (error) {
    console.error('Ошибка сохранения формы:', error);
    errorMessage.value = 'Произошла ошибка при отправке формы. Попробуйте еще раз.';
  }
});
</script>

<template>
  <form v-if="!formSubmitted" @submit.prevent="onSubmit">
    <div :class="$style.formGroup">
      <InputFloatLabel
        :error="fieldNameError"
      >
        <BaseInput
          v-model="fieldNameValue as string"
          placeholder="Наименование организации / ИП"
        />
      </InputFloatLabel>
    </div>

    <div :class="$style.formGroup">
      <InputFloatLabel
        :error="fieldPhoneError"
      >
        <BaseInput
          v-model="fieldPhoneValue as string"
          :mask="phoneMask"
          placeholder="Контактный телефон"
        />
      </InputFloatLabel>
    </div>

    <div :class="$style.formGroup">
      <InputFloatLabel
        :error="fieldAddressError"
      >
        <BaseInput
          v-model="fieldAddressValue as string"
          placeholder="Адрес"
        />
      </InputFloatLabel>
    </div>

    <div :class="$style.formGroup">
      <BaseSelect
        :options="options"
        :multiple="false"
        v-model="fieldAreasValue as Array<string>"
        :error="fieldAreasError"
      >
        <template v-slot:label>
          Тип помещения
        </template>
      </BaseSelect>
    </div>

    <div :class="$style.formGroup">
      <BaseRange
        v-model:from="fieldAreaFrom as string"
        v-model:to="fieldAreaTo as string"
        :error-from="fieldAreaFromError"
        :error-to="fieldAreaToError"
        label-from="от"
        label-to="до"
        type="number"
      >
        <template v-slot:label>
          Площадь помещения (м<sup>2</sup>)
        </template>
      </BaseRange>
    </div>

    <div :class="$style.formGroup">
      <BaseRange
        v-model:from="fieldRentFrom as string"
        v-model:to="fieldRentTo as string"
        :error-from="fieldRentFromError"
        :error-to="fieldRentToError"
        label-from="с"
        label-to="по"
        type="date"
      >
        <template v-slot:label>
          Дата начала аренды
        </template>
      </BaseRange>
    </div>

    <div :class="$style.formFooter">
      <div v-if="errorMessage" :class="$style.error">
        {{ errorMessage }}
      </div>

      <div class="buttons">
        <button :class="$style.button" type="submit">Отправить</button>
      </div>
    </div>
  </form>

  <div v-if="formSubmitted" :class="$style.success">
    <div :class="$style.successMessage">
      {{ successMessage }}
    </div>

    <button :class="$style.button" @click="emit('closeModal')">Закрыть</button>
  </div>
</template>

<style lang="scss" module>
@use '~/assets/styles/button' as button;
@use '~/assets/styles/form' as form;
@use '~/assets/styles/fonts' as fonts;

.formGroup {
  margin-bottom: 20px;
}

.formFooter {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  @include button.button-primary;
}

.error {
  @include form.error;
  margin-bottom: 8px;
}

.success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.successMessage {
  @include fonts.text-l;
  margin-bottom: 20px;
}
</style>

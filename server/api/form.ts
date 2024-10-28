import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log('Received data:', body);

  // ...

  // return { success: true, message: 'Форма успешно сохранена' };
  return { success: false, message: 'Ошибка сохранения формы. Попробуйте еще раз.'};
});

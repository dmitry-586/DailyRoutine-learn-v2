import z from 'zod'

export const baseOrderSchema = z
  .number({
    message: 'Введите число',
  })
  .int('Только целые')
  .positive('Должно быть > 0')

export const entitySchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  order: baseOrderSchema,
})

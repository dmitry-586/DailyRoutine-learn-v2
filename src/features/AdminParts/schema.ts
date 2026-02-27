import z, { ZodIssueCode } from 'zod'

// Базовая схема для числовых полей порядка
export const baseOrderSchema = z
  .number({
    message: 'Введите число',
  })
  .refine((val) => !isNaN(val), { message: 'Введите число' })
  .pipe(
    z
      .number()
      .int('Должно быть целым числом')
      .positive('Должно быть положительным'),
  )

// Общая схема для сущностей (часть, глава), имеющих заголовок и порядок
export const entitySchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  order: baseOrderSchema,
})

// Схема для создания новой части
export const partSchema = entitySchema

// Схема для всего редактора карточки части (включая главы)
export const createPartEditorSchema = (minOrder: number, maxOrder: number) =>
  z
    .object({
      part: entitySchema,
      chapters: z.array(
        entitySchema.extend({
          order: baseOrderSchema
            .refine((value) => value >= minOrder, {
              message: `Минимум: ${minOrder}`,
            })
            .refine((value) => value <= maxOrder, {
              message: `Максимум: ${maxOrder}`,
            }),
        }),
      ),
    })
    .superRefine((data, ctx) => {
      const orders = data.chapters.map((c) => c.order)
      if (new Set(orders).size !== orders.length) {
        ctx.addIssue({
          path: ['chapters'],
          message: 'Номера глав должны быть уникальны внутри части',
          code: ZodIssueCode.custom,
        })
      }
    })

export type PartFormValues = z.infer<typeof partSchema>
export type PartEditorValues = z.infer<
  ReturnType<typeof createPartEditorSchema>
>

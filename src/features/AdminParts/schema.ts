import { baseOrderSchema, entitySchema } from '@/shared/lib'
import z from 'zod'

// Схема для создания новой части
export const createPartSchema = (maxOrder: number) =>
  entitySchema.extend({
    order: baseOrderSchema.max(maxOrder, `Максимум: ${maxOrder}`),
  })

// Схема для всего редактора карточки части (включая главы)
export const createPartEditorSchema = (minOrder: number, maxOrder: number) =>
  z.object({
    part: entitySchema,
    chapters: z.array(
      entitySchema.extend({
        order: baseOrderSchema
          .min(minOrder, `Минимум: ${minOrder}`)
          .max(maxOrder, `Максимум: ${maxOrder}`),
      }),
    ),
  })

export type PartFormValues = z.infer<typeof entitySchema>
export type PartEditorValues = z.infer<
  ReturnType<typeof createPartEditorSchema>
>

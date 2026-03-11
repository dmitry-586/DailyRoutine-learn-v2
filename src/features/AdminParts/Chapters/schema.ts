import z from 'zod'
import { baseOrderSchema, entitySchema } from '../schema'

// Схема для добавления главы с проверкой диапазона порядка
export const createChapterSchema = (minOrder: number, maxOrder: number) =>
  entitySchema.extend({
    order: baseOrderSchema
      .min(minOrder, `Минимум: ${minOrder}`)
      .max(maxOrder, `Максимум: ${maxOrder}`),
  })

// Схема подглавы
export const createSubchapterSchema = (maxOrder: number) =>
  entitySchema.extend({
    order: baseOrderSchema.min(1).max(maxOrder, `Максимум: ${maxOrder}`),
    description: z.string().min(1, 'Обязательное поле'),
  })

export type ChapterFormValues = z.infer<typeof entitySchema>
export type SubchapterFormValues = z.infer<
  ReturnType<typeof createSubchapterSchema>
>

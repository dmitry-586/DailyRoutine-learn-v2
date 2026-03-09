import z from 'zod'
import { baseOrderSchema, entitySchema } from '../schema'

// Схема для добавления главы с проверкой диапазона порядка
export const createChapterSchema = (minOrder: number, maxOrder: number) =>
  entitySchema.extend({
    order: baseOrderSchema
      .refine((value) => value >= minOrder, {
        message: `Минимум: ${minOrder}`,
      })
      .refine((value) => value <= maxOrder, {
        message: `Максимум: ${maxOrder}`,
      }),
  })

// Базовая схема главы
export const chapterSchema = entitySchema

// Схема подглавы
export const createSubchapterSchema = (maxOrder: number) =>
  createChapterSchema(1, maxOrder).extend({
    title: z.string(),
    description: z.string().min(1, 'Обязательное поле'),
  })

export type ChapterFormValues = z.infer<typeof chapterSchema>
export type SubchapterFormValues = z.infer<
  ReturnType<typeof createSubchapterSchema>
>

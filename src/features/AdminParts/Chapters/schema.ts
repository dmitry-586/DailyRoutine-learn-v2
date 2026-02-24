import z from 'zod'
import { baseOrderSchema } from '../helpers/schema'

export const createChapterSchema = (minOrder: number, maxOrder: number) =>
  z.object({
    title: z.string().min(6, 'Минимум 6 символов'),
    order: baseOrderSchema
      .refine((value) => value >= minOrder, {
        message: `Минимальное значение: ${minOrder}`,
      })
      .refine((value) => value <= maxOrder, {
        message: `Максимальное значение: ${maxOrder}`,
      }),
  })

export const chapterSchema = createChapterSchema(1, Number.MAX_SAFE_INTEGER)

export type ChapterFormValues = z.infer<typeof chapterSchema>

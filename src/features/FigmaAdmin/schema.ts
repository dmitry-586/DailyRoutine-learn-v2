import { baseOrderSchema, entitySchema } from '@/shared/lib'
import z from 'zod'

export const createFigmaChapterSchema = (maxOrder: number) =>
  entitySchema.extend({
    order: baseOrderSchema.max(maxOrder, `Максимум: ${maxOrder}`),
  })

export const createFigmaSectionSchema = (maxOrder: number) =>
  z.object({
    title: z.string(),
    content: z.string().min(1, 'Обязательное поле'),
    order: baseOrderSchema.max(maxOrder, `Максимум: ${maxOrder}`),
  })

export type FigmaChapterFormValues = z.infer<
  ReturnType<typeof createFigmaChapterSchema>
>

export type FigmaSectionFormValues = z.infer<
  ReturnType<typeof createFigmaSectionSchema>
>

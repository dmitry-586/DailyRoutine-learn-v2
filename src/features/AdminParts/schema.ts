import z from 'zod'
import { baseOrderSchema } from './helpers/schema'

export const partSchema = z.object({
  title: z.string().min(6, 'Минимум 6 символов'),
  order: baseOrderSchema,
})

export type PartFormValues = z.infer<typeof partSchema>

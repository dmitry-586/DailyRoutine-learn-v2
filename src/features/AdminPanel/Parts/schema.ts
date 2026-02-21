import z from 'zod'

export const partSchema = z.object({
  title: z.string().min(6, 'Минимум 6 символов'),
  order: z
    .any()
    .transform((val) => {
      const n = Number(val)
      return isNaN(n) ? 0 : n
    })
    .pipe(z.number().min(1, 'Минимальное значение: 1')),
})

export type PartFormValues = z.infer<typeof partSchema>

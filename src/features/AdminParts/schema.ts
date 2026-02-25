import z from 'zod'

const baseOrderSchema = z
  .any()
  .transform((val) => {
    const n = Number(val)
    return isNaN(n) ? 0 : n
  })
  .pipe(z.number())

const partSchema = z.object({
  title: z.string().min(6, 'Минимум 6 символов'),
  order: baseOrderSchema,
})

export { baseOrderSchema, partSchema }

export type PartFormValues = z.infer<typeof partSchema>

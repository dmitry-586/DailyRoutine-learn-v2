import z from 'zod'

export const baseOrderSchema = z
  .any()
  .transform((val) => {
    const n = Number(val)
    return isNaN(n) ? 0 : n
  })
  .pipe(z.number())

import { z } from 'zod'

export const localizedField = <T extends z.ZodTypeAny>(type: T) =>
  z.object({}).catchall(type)

export const extractLocalizedField = <T extends z.ZodTypeAny>(type: T) => {
  return localizedField(type).transform((value, ctx) => {
    const id = Object.values(value)[0]

    if (id === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ID is required"
      })

      return z.NEVER
    }

    return id
  })
}

export const extractOptionalLocalizedField = <T extends z.ZodTypeAny>(type: T) => {
  return localizedField(type).optional().transform((value, ctx) => {
    if (value === undefined) {
      return
    }

    const id = Object.values(value)[0]

    if (id === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ID is required"
      })

      return z.NEVER
    }

    return id!
  })
}
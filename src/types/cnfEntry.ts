import { z } from 'zod'

export const cnfEntry_schema = <T extends z.ZodTypeAny>(type: T) => z.object({
  fields: type
})

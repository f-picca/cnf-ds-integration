import { z } from 'zod'
import { extractLocalizedField } from '../utils/helpers'

export const cnfProduct_schema = z.object({
  name: extractLocalizedField(z.string())
})

import { RawDataMarkdown } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField} from '../utils/helpers'


export const cnfMarkdownComponent_schema: z.ZodType<RawDataMarkdown, z.ZodTypeDef, unknown> = z.object({
    id: extractLocalizedField(z.string()),
    content: extractLocalizedField(z.string()),
    type: z.string().optional().transform(() => 'markdown' as const)
})

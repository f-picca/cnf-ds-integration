import { RawDataProductGrid } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField} from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfProduct_schema } from './cnfProducts'

export const cnfProductGridComponent_schema : z.ZodType<RawDataProductGrid, z.ZodTypeDef, unknown> = z.object({
    id: extractLocalizedField(z.string()),
    title: extractLocalizedField(z.string()),
    skus: extractLocalizedField(z.string().array()),
    type: z.string().optional().transform(()=> 'product-grid' as const)
})
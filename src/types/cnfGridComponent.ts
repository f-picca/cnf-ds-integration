import { RawDataGrid } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField} from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfItem_schema } from './cnfItem'

export const cnfGridComponent_schema: z.ZodType<RawDataGrid, z.ZodTypeDef, unknown>  = z.object({
    id: extractLocalizedField(z.string()),
    items: extractLocalizedField(cnfEntry_schema(cnfItem_schema).array()).
        transform(cnfItems => cnfItems.map(
            cnfItem => cnfItem.fields
        )),
    type: z.string().optional().transform(()=> 'grid' as const)
})
import { RawDataCarousel } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField} from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfItem_schema } from './cnfItem'

export const cnfCarouselComponent_schema: z.ZodType<RawDataCarousel, z.ZodTypeDef, unknown> = z.object({
    id: extractLocalizedField(z.string()),
    slides: extractLocalizedField(cnfEntry_schema(cnfItem_schema).array()).
    transform(cnfItems => cnfItems.map(
        cnfItem => cnfItem.fields
    )),
    type: z.string().optional().transform(()=> 'carousel' as const)
})
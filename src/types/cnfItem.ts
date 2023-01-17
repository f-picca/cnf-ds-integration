import { z } from 'zod'
import { extractLocalizedField} from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfAsset_schema } from './cnfAsset'
import { ItemSchema } from '@commercelayer/demo-store-types/dist/json/page-components/item'

type RawDataItem = z.infer<ItemSchema>;

export const cnfItem_schema: z.ZodType<RawDataItem, z.ZodTypeDef, unknown> = z.object({
    title: extractLocalizedField(z.string()),
    description: extractLocalizedField(z.string()),
    image: extractLocalizedField(cnfEntry_schema(cnfAsset_schema))
        .transform(asset => {
            return {
            src: asset.fields.file.url,
            alt: asset.fields.description
        }}),
    linkLabel: extractLocalizedField(z.string()),
    linkHref: extractLocalizedField(z.string())
})

export const cnfItems_schema = cnfEntry_schema(cnfItem_schema)
  .transform(cnfItems => cnfItems.fields).array()
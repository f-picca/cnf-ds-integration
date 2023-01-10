import { z } from 'zod'
import { extractLocalizedField,localizedField} from '../utils/helpers'
import { cnfAsset_schema } from './cnfAsset'
import { cnfEntry_schema } from './cnfEntry'


const cnfSKU_schema = z.object ({
  code: extractLocalizedField(z.string()),
  slug: extractLocalizedField(z.string()),
  size: extractLocalizedField(z.string())
})

export const cnfProduct_schema = z.object({
  name: extractLocalizedField(z.string()),
  code: extractLocalizedField(z.string()),
  baseProductId: extractLocalizedField(z.string()),
  description: localizedField((z.string())),
  images: extractLocalizedField(cnfEntry_schema(cnfAsset_schema).array())
    .transform(images => images.map(image => image.fields.file.url)),
  color: extractLocalizedField(z.string()),
  skus:   extractLocalizedField(cnfEntry_schema(cnfSKU_schema).array())
    .transform(skus => skus.map(sku => sku.fields.code))

})

export const cnfProducts_schema = cnfEntry_schema(cnfProduct_schema)
  .transform(cnfProducts => cnfProducts.fields).array()
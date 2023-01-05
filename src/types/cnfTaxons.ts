import { RawDataTaxon } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField, extractOptionalLocalizedField, localizedField } from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfProduct_schema } from './cnfProducts'

export const cnfTaxon_schema: z.ZodType<RawDataTaxon, z.ZodTypeDef, unknown> = z.lazy(
  () => {
    const partialTaxon_schema = z.object({
      id: extractLocalizedField(z.string()),
      name: extractLocalizedField(z.string()),
      label: localizedField((z.string())),
      description: localizedField((z.string())),
      slug: extractLocalizedField(z.string()).transform(slug => slug.replace(/^\//, '')),
      references: extractOptionalLocalizedField(cnfEntry_schema(cnfProduct_schema).array())
        .transform(products => products ? products.map(product => product.fields.name) : [])
    })

    return partialTaxon_schema.extend({
      taxons: extractOptionalLocalizedField(cnfEntry_schema(partialTaxon_schema).array())
        .transform(taxons => {
          if (taxons) {
            return taxons.map(taxon => taxon.fields.id)
          }

          return
        })
    })
  }
)

export const cnfTaxons_schema = cnfEntry_schema(cnfTaxon_schema)
  .transform(cnfTaxons => cnfTaxons.fields).array()


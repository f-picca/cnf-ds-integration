import { RawDataLanguage } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField } from '../utils/helpers'
import { cnfCatalog_schema } from './cnfCatalogs'
import { cnfEntry_schema } from './cnfEntry'

export const cnfLanguage_schema: z.ZodType<RawDataLanguage, z.ZodTypeDef, unknown> = z.object({
   code: extractLocalizedField(z.string()),
   name: extractLocalizedField(z.string()),
   catalog: extractLocalizedField(cnfEntry_schema(cnfCatalog_schema))
    .transform(catalog => catalog.fields.name)
})

export const cnfLanguages_schema = cnfEntry_schema(cnfLanguage_schema)
  .transform(cnfLanguages => cnfLanguages.fields).array()

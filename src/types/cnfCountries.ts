import { RawDataCountry } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField } from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfLanguage_schema } from './cnfLanguages'
import { cnfCatalog_schema } from './cnfCatalogs'


const cnfRegion_schema = z.object({
    name: extractLocalizedField(z.string())
})

export const cnfCountry_schema: z.ZodType<RawDataCountry, z.ZodTypeDef, unknown> = z.object({
   name: extractLocalizedField(z.string()),
   code: extractLocalizedField(z.string()),
   market: extractLocalizedField(z.string()).transform(market => Number(market)),
   region: extractLocalizedField(cnfEntry_schema(cnfRegion_schema))
    .transform(region => region.fields.name),
   languages: extractLocalizedField(cnfEntry_schema(cnfLanguage_schema).array())
    .transform(languages => languages.map(language => language.fields.code)),
   catalog: extractLocalizedField(cnfEntry_schema(cnfCatalog_schema))
   .transform(catalog => catalog.fields.id) 
})

export const cnfCountries_schema = cnfEntry_schema(cnfCountry_schema)
  .transform(cnfCatalogs => cnfCatalogs.fields).array()

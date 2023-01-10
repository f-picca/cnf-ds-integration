import { RawDataCatalog } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField } from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfTaxonomy_schema } from './cnfTaxonomies'

export const cnfCatalog_schema: z.ZodType<RawDataCatalog, z.ZodTypeDef, unknown> = z.object({
    id: extractLocalizedField(z.string()),
    name: extractLocalizedField(z.string()),
    taxonomies: extractLocalizedField(cnfEntry_schema(cnfTaxonomy_schema).array())
        .transform(taxonomies => taxonomies
            .map(taxonomy => taxonomy.fields.id))
})

export const cnfCatalogs_schema = cnfEntry_schema(cnfCatalog_schema)
  .transform(cnfCatalogs => cnfCatalogs.fields).array()

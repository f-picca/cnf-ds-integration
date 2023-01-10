import { RawDataTaxonomy } from '@commercelayer/demo-store-types'
import { z } from 'zod'
import { extractLocalizedField } from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfTaxon_schema } from './cnfTaxons'

export const cnfTaxonomy_schema: z.ZodType<RawDataTaxonomy, z.ZodTypeDef, unknown> = z.object({
    id: extractLocalizedField(z.string()),
    name: extractLocalizedField(z.string()),
    facetKey: extractLocalizedField(z.string()),
    taxons: extractLocalizedField(cnfEntry_schema(cnfTaxon_schema).array())
        .transform(taxons => taxons
            .map(taxon => taxon.fields.id))
})

export const cnfTaxonomies_schema = cnfEntry_schema(cnfTaxonomy_schema)
  .transform(cnfTaxonomies => cnfTaxonomies.fields).array()

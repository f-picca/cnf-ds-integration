import { z } from 'zod'
import { extractLocalizedField, extractOptionalLocalizedField} from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfAsset_schema } from './cnfAsset'
import { RawDataHero } from '@commercelayer/demo-store-types'

export const cnfHeroComponent_schema : z.ZodType<RawDataHero, z.ZodTypeDef, unknown> = z.object({
    id: extractLocalizedField(z.string()),
    title: extractLocalizedField(z.string()),
    image: extractLocalizedField(cnfEntry_schema(cnfAsset_schema))
        .transform(asset => {
            return {
            src: asset.fields.file.url,
            alt: asset.fields.description
        }}),
    description: extractOptionalLocalizedField(z.string()),
    href: extractLocalizedField(z.string()),
    type: z.string().optional()
        .transform(()=> 'hero' as const)
})
import { z } from 'zod'
import { extractLocalizedField,localizedField,extractOptionalLocalizedField} from '../utils/helpers'
import { cnfEntry_schema } from './cnfEntry'
import { cnfMarkdownComponent_schema } from './cnfMarkdownComponent'
import { cnfProductGridComponent_schema } from './cnfProductGridComponent'
import { cnfHeroComponent_schema } from './cnfHeroComponent'
import { cnfGridComponent_schema } from './cnfGridComponent'
import { cnfCarouselComponent_schema } from './cnfCarouselComponent'
import { RawDataLocalizedPage, RawDataPage } from '@commercelayer/demo-store-types'
import { transform } from 'typescript'

const cnfComponentsCollection_schema = z.union([
        cnfCarouselComponent_schema,
        cnfGridComponent_schema,
        cnfHeroComponent_schema,
        cnfProductGridComponent_schema,
        cnfMarkdownComponent_schema]
);

export const cnfPage_schema: z.ZodType<RawDataPage, z.ZodTypeDef, unknown> = z.object({
    title: extractOptionalLocalizedField(z.string()),
    description: extractOptionalLocalizedField(z.string()),
    components: extractLocalizedField(cnfEntry_schema(cnfComponentsCollection_schema).array())
        .transform(components => components.map(component => component.fields))
})


export const cnfLocalizedPage_schema = z.object({
    slug: extractLocalizedField(z.string()),
    localizedPages: localizedField(cnfEntry_schema(cnfPage_schema))
        .transform((localizedPages) => { 
            return Object.fromEntries(Object.entries(localizedPages).map(([key,value]) => [ 
                key, value.fields
            ]))
        })
    }
)


export const cnfLocalizedPages_schema = (cnfEntry_schema(cnfLocalizedPage_schema)
  .transform(cnfLocalizedPages => cnfLocalizedPages.fields).array())
    .transform( (localizedPages) => {
        return localizedPages.reduce((a, v) => ({ ...a, [v.slug]: v.localizedPages}), {})
  } )

import { RawDataTaxon,RawDataProduct, RawDataTaxonomy, RawDataCatalog, RawDataLanguage, RawDataCountry, RawDataPage, RawDataLocalizedPage } from '@commercelayer/demo-store-types'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { cnfTaxons_schema } from './types/cnfTaxons'
import { cnfTaxonomies_schema } from './types/cnfTaxonomies'
import { cnfProducts_schema } from './types/cnfProducts'
import { cnfCatalogs_schema } from './types/cnfCatalogs'
import { cnfLanguages_schema } from './types/cnfLanguages'
import { cnfCountries_schema } from './types/cnfCountries'
import { cnfLocalizedPages_schema } from './types/cnfLocalizedPage'
import { OPERATIONS, logger }  from './utils/helpers'
import ContentfulService from './utils/contentful_service'

(async () => {
  const _WHO_ = "[📦 Products 📦]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })

  const products = await ContentfulService.instance.getEntriesByType("product")
  const result  = cnfProducts_schema.parse(products)

  
  const converted: RawDataProduct[] = result
    .flatMap(cnfProduct => cnfProduct.skus
      .map(
        cnfSku => ({
          name: cnfProduct.name,
          productCode: cnfProduct.baseProductId,
          variantCode: cnfProduct.code,
          sku: cnfSku.fields.code,
          slug: cnfSku.fields.slug,
          color: cnfProduct.color,
          size: cnfSku.fields.size,
          description: cnfProduct.description,
          images: cnfProduct.images,
        })
  ))

  logger({ who: _WHO_, what: OPERATIONS.write })
  
  const jsonPath = resolve(__dirname, '../data', 'json')
  
  writeFileSync(resolve(jsonPath, 'products.json'), JSON.stringify(converted, null, 2))
  
  logger({ who: _WHO_, what: OPERATIONS.done })
})()

;(async () => {
  const _WHO_ = "[🍃 Taxons 🍃]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })


  const taxons = await ContentfulService.instance.getEntriesByType("taxon")
  
  const result: RawDataTaxon[] = cnfTaxons_schema.parse(taxons)

  logger({ who: _WHO_, what: OPERATIONS.write })
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'taxons.json'), JSON.stringify(result, null, 2))
  
  logger({ who: _WHO_, what: OPERATIONS.done })
})()



;(async () => {
  const _WHO_ = "[🌳 Taxonomies 🌳]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })
  
  const taxonomies = await ContentfulService.instance.getEntriesByType("taxonomy")
  
  const result: RawDataTaxonomy[] = cnfTaxonomies_schema.parse(taxonomies)
  
  logger({ who: _WHO_, what: OPERATIONS.write })
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'taxonomies.json'), JSON.stringify(result, null, 2))
  logger({ who: _WHO_, what: OPERATIONS.done })  
})()


;(async () => {
  const _WHO_ = "[📖 Catalogs 📖]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })
  
  const catalogs = await ContentfulService.instance.getEntriesByType("catalog")
  
  const result: RawDataCatalog[] = cnfCatalogs_schema.parse(catalogs)
  
  logger({ who: _WHO_, what: OPERATIONS.write })
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'catalogs.json'), JSON.stringify(result, null, 2))
  logger({ who: _WHO_, what: OPERATIONS.done })      
})()


;(async () => {
  const _WHO_ = "[🆎 Languages 🆎]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })
  
  const languages = await ContentfulService.instance.getEntriesByType("language")
  
  const result: RawDataLanguage[] = cnfLanguages_schema.parse(languages)
  
  logger({ who: _WHO_, what: OPERATIONS.write })
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'languages.json'), JSON.stringify(result, null, 2))
  logger({ who: _WHO_, what: OPERATIONS.done })        
})()


;(async () => {
  const _WHO_ = "[🌎 Countries 🌎]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })
  
  const countries = await ContentfulService.instance.getEntriesByType("country")
  
  const result: RawDataCountry[] = cnfCountries_schema.parse(countries)
  
  logger({ who: _WHO_, what: OPERATIONS.write })
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'countries.json'), JSON.stringify(result, null, 2))
  logger({ who: _WHO_, what: OPERATIONS.done })        
})()


;(async () => {
  const _WHO_ = "[📄 Contents 📄]"
  logger({ who: _WHO_, what: OPERATIONS.fetch })

  const pages = await ContentfulService.instance.getEntriesByType("localizedPage")
  
  const result = cnfLocalizedPages_schema.parse(pages)

  logger({ who: _WHO_, what: OPERATIONS.write })

  const jsonPath = resolve(__dirname, '../data', 'json')
  
  writeFileSync(resolve(jsonPath, 'pages.json'), JSON.stringify(result, null, 2))
  
  logger({ who: _WHO_, what: OPERATIONS.done })

})()

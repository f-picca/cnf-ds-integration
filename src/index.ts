import { RawDataTaxon } from '@commercelayer/demo-store-types'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { cnfTaxons_schema } from './types/cnfTaxons'
import { cnfProduct_schema,cnfProducts_schema } from './types/cnfProducts'
import type { CONTENTFUL_DEFAULT_LOCALE_CODE, ICatalogFields, ICountryFields, ILanguageFields, ITaxonomyFields } from './types/contentful'
import ContentfulService from './utils/contentful_service'

const DEFAULT_LOCALE: CONTENTFUL_DEFAULT_LOCALE_CODE = "en"


/*
 * if there's only one locale we assume is the default: 
 * - replace the value with the default locale one
 */
/*
function adjustLocales(object){
  Object.keys(object).forEach((key) => {
    if(Object.keys(object[key]).length == 1){ 
      object[key] = object[key][DEFAULT_LOCALE]
    }
  })
  return object
}
*/

// ;(async () => {
//  const products = await ContentfulService.instance.getEntriesByType("product")
//  const result  = cnfProducts_schema.parse(products);
 
// })()

;(async () => {
  const taxons = await ContentfulService.instance.getEntriesByType("taxon")
  
  const result: RawDataTaxon[] = cnfTaxons_schema.parse(taxons)

  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'taxons.json'), JSON.stringify(result, null, 2))
  
})()


/*
;(async () => {
  const taxonomies = (
    await ContentfulService.instance.getEntriesByType<ITaxonomyFields>("taxonomy")
  )
  .map((entry) => entry.fields)
  .map((taxonomy) => adjustLocales(taxonomy))
  .map(taxonomy => ({
      ...taxonomy,
      "taxons": taxonomy.taxons?.map(taxon => adjustLocales(taxon.fields).id)
      }
  ))
  
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'taxonomies.json'), JSON.stringify(taxonomies, null, 2))
    
})()

;(async () => {
  const catalogs = (
    await ContentfulService.instance.getEntriesByType<ICatalogFields>("catalog")
  )
  .map((entry) => entry.fields)
  .map((catalog) => adjustLocales(catalog))
  .map(catalog => ({
      ...catalog,
      "taxonomies": catalog.taxonomies?.map(taxonomy => adjustLocales(taxonomy.fields).id)
      }
  ))
  
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'catalogs.json'), JSON.stringify(catalogs, null, 2))
    
})()


;(async () => {
  const countries = (
    await ContentfulService.instance.getEntriesByType<ICountryFields>("country")
  )
  .map((entry) => entry.fields)
  .map((country) => adjustLocales(country))
  .map(country => ({
      ...country,
      "market" : Number(country.market),
      "catalog": adjustLocales(country.catalog.fields).id,
      "region": adjustLocales(country.region.fields).name,
      "languages": country.languages.map(language => adjustLocales( language.fields).code)  
      }
  ))
  
  
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'countries.json'), JSON.stringify(countries, null, 2))
    
})()

;(async () => {
  const languages = (
    await ContentfulService.instance.getEntriesByType<ILanguageFields>("language")
  )
  .map((entry) => entry.fields)
  .map((language) => adjustLocales(language))
  .map(language => ({
      ...language,
      "catalog": adjustLocales(language.catalog.fields).id,
      }
  ))
  
  
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'languages.json'), JSON.stringify(languages, null, 2))
    
})()
*/
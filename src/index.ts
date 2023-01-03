import type {RawDataTaxon} from '../demo-store-core/packages/types/src'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import type {ITaxonFields} from './types/contentful'
import DEFAULT_LOCALE from './types/contentful'
import * as Contentful from 'contentful'
import ContentfulService from './utils/contentful_service'

import * as dotenv from 'dotenv' 
dotenv.config()




;(async () => {
  const cnfTaxons = (
    await ContentfulService.instance.getEntriesByType<ITaxonFields>("taxon")
  )
  .map((entry) => entry.fields)
  
  console.log(cnfTaxons[0].id[DEFAULT_LOCALE])
})()


/*
;(async () => {
  const cnfTaxons = (
    await ContentfulService.instance.getEntriesByType<ITaxonFields>("taxon")
  )
  .map((entry) => entry.fields)
  .map(cnfTaxon => ({
      ...cnfTaxon,
      "taxons": cnfTaxon.taxons?.map(taxon => taxon.fields.id)
      }
  ))
  
  const jsonPath = resolve(__dirname, '../data', 'json')

  writeFileSync(resolve(jsonPath, 'cnfTaxons.json'), JSON.stringify(cnfTaxons, null, 2))
    
})()
*/


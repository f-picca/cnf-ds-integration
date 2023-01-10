import { z } from 'zod'
import { extractLocalizedField,localizedField } from '../utils/helpers'

const cnfFileDetailImage_schema = z.object({
    width: z.number(),
    height: z.number()
})

const cnfFileDetail_schema = z.object({
    size: z.number(),
    image: cnfFileDetailImage_schema.optional(),
})

const cnfFile_schema = z.object({
    url: z.string(),
    details: cnfFileDetail_schema,
    fileName: z.string(),
    contentType: z.string()
})

export const cnfAsset_schema = z.object({
  title: extractLocalizedField(z.string()),
  description: extractLocalizedField(z.string()),
  file: extractLocalizedField(cnfFile_schema),
})






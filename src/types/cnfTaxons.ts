import { z } from 'zod'

const localizedField = <T extends z.ZodTypeAny>(type: T) =>
  z.object({}).catchall(type);

const extractLocalizedField = <T extends z.ZodTypeAny>(type: T) =>
  localizedField(type).transform((value, ctx) => {
    const id = Object.values(value)[0];

    if (id === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ID is required"
      });

      return z.NEVER;
    }

    return id;
  });

const cnfTaxon_schema = z.object({
  id: localizedField(z.string()).transform(id => Object.values(id)[0]),
  name: localizedField((z.string())).transform(name => Object.values(name)[0]),
  label: localizedField((z.string())),
  description: localizedField((z.string())),
  slug: localizedField(z.string()).transform(id => Object.values(id)[0]).transform(slug => slug.replace(/^\//, '')),
  references: localizedField(z.any())
    .transform(references => Object.values(references)[0])
    .transform(references => references.map(reference => reference.fields.name)),
  taxons: localizedField(z.any())
    .transform(taxons => Object.values(taxons)[0])
    .transform(taxons => taxons.map(taxon => taxon.fields.name))
})

export const cnfTaxons_schema = cnfTaxon_schema.array()




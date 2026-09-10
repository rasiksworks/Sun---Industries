import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const business = defineCollection({
  loader: file("src/content/business/business.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    foundedYear: z.number(),
    founder: z.string(),
    phone: z.string(),
    googleRating: z.number(),
    googleReviewCount: z.number(),
    address: z.string().nullable(),
    email: z.string().nullable(),
    workingHours: z.string().nullable(),
    closingTime: z.string(),
  }),
});

const specsUpvc = defineCollection({
  loader: file("src/content/specs/upvc.json"),
  schema: z.object({
    id: z.string(),
    ratePerSqFt: z.number(),
    reinforcementThicknessMm: z.number(),
    gasketMaterial: z.string(),
    profileBrand: z.string().nullable(),
    frameWarrantyYears: z.number(),
    hardwareWarrantyYears: z.number(),
    turnaroundDays: z.number(),
    productTypes: z.array(z.string()),
    glassOptions: z.array(z.string()),
  }),
});

const specsSteel = defineCollection({
  loader: file("src/content/specs/steel.json"),
  schema: z.object({
    id: z.string(),
    productRange: z.string().nullable(),
  }),
});

const specsClamps = defineCollection({
  loader: file("src/content/specs/clamps.json"),
  schema: z.object({
    id: z.string(),
    types: z.array(z.string()),
    buyerType: z.string(),
    shipsOutsideDistrict: z.boolean(),
    knownDestinations: z.array(z.string()),
  }),
});

const specsLaserCutting = defineCollection({
  loader: file("src/content/specs/laser-cutting.json"),
  schema: z.object({
    id: z.string(),
    materialsCut: z.array(z.string()).nullable(),
    thicknessRange: z.string().nullable(),
    maxSheetSize: z.string().nullable(),
    machineAndWattage: z.string().nullable(),
    tolerance: z.string().nullable(),
    drawingFormats: z.array(z.string()),
    turnaround: z.string().nullable(),
    minimumOrder: z.string().nullable(),
  }),
});

const serviceArea = defineCollection({
  loader: file("src/content/service-area.json"),
  schema: z.object({
    id: z.string(),
    confirmedTowns: z.array(z.string()),
    note: z.string(),
  }),
});

const whyChooseUs = defineCollection({
  loader: file("src/content/why-choose-us.json"),
  schema: z.object({
    id: z.string(),
    customerReasonGiven: z.string(),
    topPhoneQuestion: z.string(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/gallery" }),
  schema: z.object({
    image: z.string(),
    caption: z.string(),
    village: z.string(),
    productType: z.string(),
  }),
});

export const collections = {
  business,
  specsUpvc,
  specsSteel,
  specsClamps,
  specsLaserCutting,
  serviceArea,
  whyChooseUs,
  gallery,
};

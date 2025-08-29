import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const figures = defineCollection({
  loader: glob({ base: "./src/content/figures", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    status: z.string(),
    photoUrl: z.string(),
    posts: z
      .array(
        z.object({
          type: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
  }),
});

export const collections = { figures };

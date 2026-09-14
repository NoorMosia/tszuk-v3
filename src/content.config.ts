import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * caseStudies — the type-safe Content Collection driving every Client_Card,
 * group index page, and Case_Study_Page. Presentation is a pure function of
 * these entries; there is no per-client bespoke markup.
 *
 * Slug strategy: slug = entry id derived from the file path relative to `base`
 * (e.g. `boss-reminisce.mdx` -> `/work/boss-reminisce`).
 *
 * Validation runs at build/sync time — a missing required field, an
 * out-of-range value, a bad `group`, or an unresolved image reference fails
 * the build and names the offending entry and field.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      // --- Required (Req 4.2) ---
      name: z.string().min(1).max(100),
      group: z.enum(['business', 'personality']), // Req 4.4 — total & binary
      order: z.number().int().default(999), // display order within a group (lower first)
      description: z.string().min(1).max(300),
      scope: z.array(z.string().min(1)).min(1).max(10), // 1..10 Scope_Pills
      heroImage: image(),
      heroImageAlt: z.string().min(1).max(200),
      story: z.object({
        challenge: z.string().min(1),
        approach: z.string().min(1),
        outcome: z.string().min(1),
      }),

      // --- Optional (Req 4.3) ---
      testimonial: z
        .object({
          quote: z.string().min(1),
          attribution: z.string().min(1),
        })
        .optional(),
      liveLink: z.string().url().optional(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string().min(1).max(200),
          })
        )
        .max(20)
        .optional(),
      pullQuote: z.string().min(1).max(300).optional(),
    }),
});

export const collections = { caseStudies };

# Locked decisions for v2

This is the agreed direction after reviewing thoughts_v1. Everything here is settled and will
feed the v2 spec (requirements, design, tasks). Written plainly on purpose.

## Settled

1. Motion and scroll. Adopt Lenis for smooth scroll, keep our own IntersectionObserver reveals,
   and use the font-ready gate plus fallback timeout and reduced-motion short-circuit from Boss.
   Reserve GSAP only if a specific parallax or clip-path moment needs it.
2. Landing page is a hub. It summarises everything and links out to dedicated pages.
3. Contact email and canonical domain are tszuk.co.za. Contact address is hello@tszuk.co.za.
   All references to tszuk.com get corrected to tszuk.co.za so the domain is consistent.
4. The One Room inspirations are in: shining blend-mode nav, wider shell, and the founder layout.
5. Palette moves to warm greige / soft platinum. Not cool silver. We re-value tokens, keeping
   the single warm terracotta accent. No green or cyan.
6. Landing format follows the old one-pager idea: a condensed summary of everything including
   behind-the-brand, with the founders getting their own dedicated page.
7. Personality images get smaller. Cap the round frame diameter and tighten the grid.
8. About page is at least 100vh (using min-height so it can grow on small screens).
9. FAQ on the home page, built with native details and summary so it works with no JS.
10. Contact form asks for email only, required, plus one optional message field. Keep the
    mailto:hello@tszuk.co.za fallback.
11. Businesses are stacked editorial rows with alternating image side. Personalities stay a
    round-card grid, so the two groups stay visually distinct.
12. Replace filled pills with the chosen alternative: inline text with middot dividers for the
    warm editorial feel, and key-value rows on the full case study page.
13. Landing links out to client live sites, and FAQs live on the landing page.
14. What We Do becomes process-led. The organizing spine is the way we work (Discover, Design,
    Build, Grow) with services nested under each phase. Existing copy is mostly reused, regrouped.
15. Visual direction: warm brutalist-lite as the dominant language, Swiss grid for structure and
    breathing room. Details in the next section.
16. We are writing v2 specs for all of this.

## SEO work carried in (point 3)

- Add @astrojs/sitemap and a robots.txt pointing at the sitemap.
- Add Organization structured data with sameAs links for Instagram, LinkedIn, Substack.
- Per-page titles, descriptions, and OG images (case studies share their hero image).
- Per-case-study structured data.
- Keep Core Web Vitals healthy; do not let Lenis or any reveal JS hurt LCP or INP.

## Real clients (point 17)

Solar Valley Energies, Mendys Online Shop, The One Room. All businesses. Seed real case study
entries using the existing logo assets, each with a heroImage and a liveLink.

## Writing and polish note

Remove em dashes across copy. Avoid patterns that read as generated: overused colon-heavy
subheads, "unlock/elevate/seamless" filler, three-item lists that all start the same way, and
hedging phrases. Keep the voice warm, plain, and specific.

---

## Point 15: blending warm brutalist-lite with Swiss grid

You liked the width and confidence of warm brutalist-lite most, and the minimalism and breathing
space of Swiss grid second. Good news: these two combine cleanly because they solve different
problems. Brutalist gives us the personality (type, width, borders, hover). Swiss gives us the
underlying order (grid, rhythm, whitespace). See sample 05-hybrid-brutalist-swiss.html for a
working demo.

### What we take from warm brutalist-lite (the lead, roughly 70 percent)

- Full-bleed width. Content runs edge to edge with a single side padding token, not a narrow
  centered box. This is the width you liked. It fixes the boxed-in feeling from the old 1200px
  container.
- Big, heavy, uppercase display type for headings and client names.
- Hard structural lines. A 2px rule under the header and around major sections.
- One warm accent used with intent: terracotta on numbers, hover fills, and key labels.
- Mono type for small labels and metadata, which adds the studio-tool feel.
- Hover states that flip a whole row to the accent color.

### What we take from Swiss grid (the discipline, roughly 30 percent)

- A real 12-column grid with consistent gutters. Everything snaps to it, so the brutalist
  boldness never turns into chaos. This is what keeps it from looking loud.
- Generous vertical breathing space between sections.
- Column alignment for header, hero, and work rows, so numbers, names, descriptions, and
  categories line up down the page.
- Restraint in color and decoration. Whitespace does the work.

### How the two resolve, concretely

- Width comes from brutalist (full bleed), order comes from Swiss (12-col grid inside the bleed).
  So we are edge to edge and still aligned.
- Type scale is brutalist (large, uppercase). Type placement is Swiss (grid columns).
- Borders are brutalist (2px hard rules for section edges), hairlines are Swiss (1px between rows).
- Motion stays subtle per the design rules. Hover fills and reveals only.

### Open sub-questions to settle in the spec

- Display typeface. The demo uses system fonts. Brutalist lives or dies on the type, so we should
  pick one licensed grotesk with a strong heavy weight. This is the biggest single lever.
- How far the hover fill goes on mobile, where hover does not exist. Likely a static accent tick
  or left border instead.
- Whether personalities section softens the brutalism a little, since round cards and heavy
  uppercase can fight. Proposal: keep the grid and labels, ease the type weight for that section.

### My recommendation

Build the system on sample 05. Lead with brutalist width and type, hold it together with the
Swiss grid and whitespace, and spend real effort on the display typeface. That gives you the
confident, non-corporate, boutique feel without looking noisy.

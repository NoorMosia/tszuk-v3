# thoughts_v1 — Kiro's opinions before the v2 amendments

Written after reading: the current `1 tszuk redefined` project, `5 boss` (Boss Reminisce),
`TheRoom` (The One Room), and the old `1 tszuk` one-pager. These are my honest takes,
point by point, so we can argue about them before writing specs.

---

## 1. Copy the Boss Reminisce scrolling feel

I read Boss's scripts. The feel comes from two libraries working together:

- **Lenis** — smooth-scroll (inertia/momentum on the wheel). One small file, ~1 config block.
- **GSAP + ScrollTrigger** — the reveals, the parallax on the portrait, clip-path wipes,
  the stacked-card discography, and the nav "is-scrolled" toggle.

**How much JS is it?** Honestly, moderate — not heavy. Lenis is tiny. The GSAP file is ~250
lines but it's all declarative reveal config, not complex logic. GSAP+ScrollTrigger is a
well-optimized, battle-tested lib. The real cost is the ~40KB of GSAP core + plugin.

**My recommendation:** We already have a hand-rolled `SmoothScroll.astro` and IntersectionObserver
reveals in this project. Two options:
- **(a)** Adopt Lenis for smooth scroll (it's genuinely better than our lerp loop) and keep
  our own IntersectionObserver reveals. Low JS, keeps things light.
- **(b)** Go full Boss: Lenis + GSAP ScrollTrigger for parallax and clip-path wipes.
  More polish, more JS.

I lean **(a)** for most of the site, and reserve GSAP only if we want the specific
parallax/clip-path moments. It keeps us honest with the "CSS-first, minimal JS" design rule.
The one thing I'd definitely steal from Boss regardless: the **font-ready gate + 3s fallback
timeout** before animating, and the reduced-motion short-circuit that shows everything
immediately. That pattern is solid.

Caveat: Lenis + our own persisted smooth-scroll singleton across `astro:page-load` needs care
so it isn't re-instantiated on every view transition. Doable, just a spec detail.

## 2. Landing = summary of everything, click through to dedicated pages

Agreed, this is the right structure and it matches point 6. The landing page becomes a
"hub": condensed hero, a taste of businesses, a taste of personalities, behind-the-brand
teaser, FAQs, contact. Each section links to its full page. This is cleaner than the current
setup and better for SEO (internal linking + clear crawl paths).

## 3. SEO checkup — what else can we do technologically

The current Layout is already decent: canonical, Open Graph, Twitter card, description,
per-site structured data. Good baseline. What's **missing / worth adding**:

- **`@astrojs/sitemap`** — we have none. Static Astro + this integration = free `sitemap.xml`.
  High value, low effort.
- **`robots.txt`** — none in `public/`. Add one pointing at the sitemap.
- **Per-page structured data** — right now StructuredData is site-scope only. Add
  `Organization` (with `sameAs` links to your Insta / LinkedIn / Substack — this is exactly
  how Google ties your socials to the brand), and per-case-study structured data
  (`CreativeWork` or `Article`).
- **Per-page titles/descriptions** — make sure every page (about, work indexes, each case
  study) sets its own `title` + `description`, not the default. Case study pages especially.
- **`sameAs` socials** — feed Insta/LinkedIn/Substack URLs into the Organization schema.
- **Image alt discipline** — already in your accessibility rules; it doubles as image SEO.
- **`og:image` per page** — case studies should OG-share their hero image, not the default.
- **Domain consistency** — Layout falls back to `tszuk.co.za` but product/contact rules
  mention `hello@tszuk.com`. Pick one canonical domain and be consistent; mixed domains
  hurt SEO and trust. (Worth a decision.)
- **Performance = SEO** — Core Web Vitals. Static Astro is already fast; just keep the
  smooth-scroll/GSAP JS from hurting INP/LCP. Lazy-load below-fold images (already a rule).

Substack note: if you cross-post writing, canonical tags matter so you don't compete with
yourself. Worth a line in the spec.

## 4. The One Room as inspiration (width, navbar shine, logo color-change)

I read TheRoom's Navbar and globals. Here's what's actually happening and my take:

- **The "shine / color-change" navbar** is `mix-blend-mode: difference` on the fixed nav.
  The nav text inverts against whatever section is behind it — dark text over light
  sections, light over dark. That's the effect you like. It's **pure CSS, zero JS**, and
  it's gorgeous. Strong yes. Caveat: `mix-blend-mode: difference` produces *inverted*
  colors, not arbitrary brand colors, and contrast can get weird over busy imagery — we'd
  verify AA and probably disable blend mode on mobile (TheRoom does exactly this).
- **The logo shining** on the top-left is the same blend-mode trick applied to the wordmark.
- **Width / side space**: TheRoom uses full-bleed `100vw` sections and a wide content
  container, with generous but not huge side padding. Our current site uses
  `--content-max-width: 1200px` centered, which is what makes "About tszuk" feel narrow and
  boxed-in — that's the narrow feel you dislike. **My recommendation:** introduce a wider
  content width (or full-bleed sections with tighter side padding), and reserve the narrow
  `--manifesto-max-width: 650px` only for long-form reading text. Basically: widen the
  shell, keep reading columns narrow.
- **The founder layout** in TheRoom (50/50 image-left, text-right, full 100vh) is a great
  template for our separate founders page (point 6).

## 5. Moving to silver-ish instead of warm white

My honest opinion: **be careful here.** Silver/cool-grey directly contradicts the current
design-system rule ("warm neutrals, no green/cyan, single warm accent"). Silver is a *cool*
neutral. Two risks:
- Cool silver + warm terracotta accent can clash (warm/cool tension) unless we retune the
  accent too.
- Silver reads more "tech/corporate SaaS" than "warm boutique branding studio," which fights
  your own brand tone ("warm, refined, inviting, never cold or corporate").

**What I'd suggest instead:** if you want that refined, elevated, less-cream feel, go for a
**warm-leaning greige / soft platinum** — a very desaturated warm grey rather than true cool
silver. You keep sophistication without going cold. If you genuinely want silver, then we
should re-value the *whole* token set (accent included) so it's cohesive — not just swap the
background. Either way this is a token re-valuing exercise, which the design rules explicitly
allow (re-value, don't restructure). I'd want to see a quick palette mock before committing.

## 6. Landing format like the old site (summary incl. "behind the brand" + about; founders on own page)

Agreed and I like it. The old `1 tszuk` index was a true one-pager (Cover → Hero → Work →
Marquee → Capabilities → Minds → Footer). The plan:
- Landing keeps a **condensed** version of everything: hero, work taste, behind-the-brand,
  about teaser, FAQs, contact.
- **Founders get their own page** styled like TheRoom's Founder section (big portrait, quote,
  bio, signature). This lets the landing stay light while giving Zukisa & Tshepo room to
  shine. Good separation of concerns and good for the "content as data" principle.

## 7. Personalities images are too big

Agreed, easy fix. Per your design rules, personality cards are round (`border-radius: 50%`).
Big round images dominate. I'd cap their diameter (e.g. a max-width on the round frame) and
let them sit in a tighter grid. This is a CSS tweak on `ClientCard` / `WorkSection`, not a
structural change.

## 8. About page ≥ 100vh

Agreed and trivial. TheRoom's `.section-fullscreen { min-height: 100vh }` is exactly the
pattern. We give the about page a `min-height: 100vh` shell. Just watch mobile — use
`min-height` (not fixed `height`) so content can grow past the viewport on small screens.

## 9. Common questions (FAQ) on home page

Yes — see also point 13 (you mention it twice). Good for users *and* SEO (FAQ structured data
= `FAQPage` schema can earn rich results). Implement as an accessible accordion (native
`<details>`/`<summary>` is the progressive-enhancement-friendly choice — works with zero JS,
which fits your rules perfectly). I'd strongly push for `<details>` here.

## 10. Contact form asks only for email

I actually **like this** for a boutique studio — low friction, "leave your email, we reach
out." It signals confidence and a personal touch (matches your brand voice). Two thoughts:
- **Add an optional single-line message field** (optional, not required). Some people want to
  say one sentence about what they need, and it helps you prioritize. Keep email the only
  *required* field.
- Keep the **`mailto:hello@tszuk.com` fallback** (accessibility + no-JS rule). Actually, if
  the form is *only* an email capture, a well-styled mailto might even be enough — but the
  Supabase capture lets you collect leads without them opening a mail client, so I'd keep the
  form + fallback.

Verdict: ship the email-only form, add an optional message field, keep the fallback.

## 11. Businesses stacked, alternating image sides (left image/right text, then flip)

**Strong yes.** This is a classic editorial "zig-zag" layout and it reads as premium. It suits
businesses (squarish cards) much better than a grid, gives each client room to breathe, and
alternating sides creates rhythm as you scroll. It also pairs beautifully with scroll-reveal
(each row wipes/fades in as it enters). Personalities can stay as the round-card grid so the
two groups remain visually distinct (per product rule). This gives us a nice contrast:
businesses = editorial rows, personalities = round grid.

## 12. Alternatives to pills (more modern)

Pills are fine but overused. Modern alternatives for the `scope` field:
- **Inline text with dividers** — `Brand identity · Web · Packaging` (thin separators). Very
  editorial, very "boutique." My favorite for your tone.
- **Underline / hairline tags** — no filled background, just a bottom border. Lighter than
  pills.
- **Numbered list** — `01 Brand identity  02 Web  03 Packaging`. Feels intentional/curated.
- **Outlined chips** — pills but border-only, no fill. Half-step from current.
- **Key-value rows** — `Scope — Brand, Web, Packaging` as a small definition list. Reads like
  a case-study spec sheet, very refined.

My pick: **inline text with middot dividers** for the warm/editorial feel, or **key-value
rows** on the full case-study page. Drop filled pills.

## 13. Landing: links to companies' live sites + FAQs on landing

- **Live links**: yes. The schema already has an optional `liveLink`. Surface it on the
  business rows (point 11) and case-study pages as a clear "Visit site ↗". Good for users and
  gives you outbound-context signals. Solar Valley Energies, Mendys Online Shop, The One Room
  all have live sites we can link.
- **FAQs on landing**: covered in point 9. Agreed.

## 14. "What We Do" page — modernize, disorganized text/sections, open to wholesale change

I read `Capabilities.astro`. Your instinct is right — it's a flat 4-column list of services
with no hierarchy, no visual interest, and the groupings ("Brand Engineering", "Creative
Management", etc.) blur together. A wholesale rethink is justified. Options:

- **Numbered service index** — big numbers (01–04), each service a row that expands on hover
  or reveals a one-line description. Editorial, structured, scannable.
- **Sticky-scroll narrative** — service titles pin on the left while descriptions scroll on
  the right (a very "Awwwards" pattern, pairs with GSAP from point 1).
- **Process-led framing** — reframe from a service *list* into a *story*: how you work
  (Discover → Design → Build → Grow). This fixes the "disorganized" feeling by giving it a
  spine, and matches your "brand experience, not delivery" vision.

My recommendation: **process-led narrative** as the organizing spine, with services nested
under each phase. It solves the organization problem at the root rather than restyling a list.
The current copy stays mostly reusable; we just re-group it.

## 15. Modern theme ideas for a boutique tech/branding studio

A few directions that fit "warm, refined, restraint over spectacle":
- **Editorial / magazine** — big serif or grotesk display type, generous whitespace, hairline
  rules, asymmetric grids. Reads expensive. (This is where I'd lean given your tone.)
- **Warm brutalist-lite** — bold type, raw structure, one warm accent, mono/label details.
  Confident without being cold. (Boss and TheRoom both flirt with this.)
- **Swiss / grid-forward** — strict grid, precise type scale, lots of negative space.
  Timeless, "systems director" energy (fits Tshepo's half of the brand).
- **Tactile / textured** — subtle grain overlay (TheRoom uses an SVG noise texture in the
  body — cheap and adds warmth), soft shadows, paper-like surfaces.

My pick for tszuk: **editorial base + subtle grain texture + one warm accent + a shining
blend-mode nav.** That combination is distinctive, warm, and Awwwards-credible without heavy
JS. The grain trick from TheRoom is a 5-minute win.

## 16. Should we write v2 specs for all these amendments?

**Yes, strongly.** This is 15+ interlocking changes (palette, layout system, new pages,
new components, SEO integrations, motion library decisions). Doing it ad-hoc will create
inconsistency and rework. A v2 spec lets us:
- lock the palette/token decision (point 5) *before* touching components,
- decide the motion stack (Lenis only vs Lenis+GSAP) *once*,
- sequence the work (tokens → layout width → landing restructure → per-page → SEO → motion),
- keep the "content as data" and accessibility rules enforced throughout.

I'd structure it as requirements → design → tasks, same as before. The `amendments/v2_1.md`
file already exists, so there's a precedent to build on.

## 17. Current companies (Solar Valley Energies, Mendys Online Shop, The One Room) + logos

Noted. We have the assets:
- `src/assets/solar valley logo.png`
- `src/assets/mendys ecommerce logo.jpg`
- `src/assets/the one room logo.jpg`

These are real clients, so the case-study content collection should be seeded with real
entries for them (replacing/augmenting the current placeholder entries like
`atelier-nine`, `harbor-coffee`, etc.). Note the filenames have spaces — when we import them
as optimized `<Image />` assets that's fine, but we should confirm each has a proper
`heroImage` and a live `liveLink`. All three are **businesses** (Solar Valley = energy,
Mendys = online shop, The One Room = venue/brand), so they'd populate the alternating
business rows from point 11.

---

## Summary of my leanings (the TL;DR)

- **Do**: Lenis for smooth scroll, blend-mode shining nav, wider shell + narrow reading
  columns, editorial zig-zag for businesses, round-grid for personalities, `<details>` FAQ,
  email-first contact (+ optional message), sitemap + robots + richer structured data,
  process-led "what we do", real client entries, founders on their own page, about ≥ 100vh.
- **Push back on**: true cool silver — I'd go warm greige/platinum instead, or re-value the
  whole palette cohesively.
- **Decide before building**: motion stack (Lenis vs Lenis+GSAP), canonical domain
  (`.co.za` vs `.com`), and the exact palette. These three unblock everything else.
- **Yes to v2 specs.** Let's write them.

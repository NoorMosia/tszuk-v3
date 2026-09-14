# Advanced Add-Ons (for later)

A parking lot of optional enhancements for the tszuk-redefined project: **skills**, **powers**, and **MCP servers** worth considering as the project matures. **None of these are required to build the current spec** — the site is a self-contained static Astro build. Add them only when the matching need actually arrives.

Quick definitions:

- **Skill** — an on-demand, step-by-step playbook for a repeatable procedure (`.kiro/skills/<name>/SKILL.md`).
- **Steering** — passive rules/context injected automatically to shape how work is done (`.kiro/steering/*.md`).
- **Power** — a package of docs, workflow guides, and optionally MCP servers/tools.
- **MCP server** — a Model Context Protocol integration that connects to external systems/tools. Configured in `.kiro/settings/mcp.json` (workspace) or `~/.kiro/settings/mcp.json` (user).

---

## Already in place

- **Steering**: `product.md`, `tech.md`, `structure.md`, `design-system.md` (always included); `astro-motion.md`, `accessibility.md` (conditional on `**/*.astro`).
- **Skill**: `add-case-study` — adding a client to the content collection.

---

## Skills to consider later

### 1. `verify-palette-contrast`
- **What**: A procedure to check every in-use color token pair against WCAG AA — body text >= 4.5:1, large text / non-text UI >= 3:1 — and darken accent/muted tokens that fall short.
- **When**: Whenever the warm palette changes or new token pairs are introduced.
- **Why later**: Most valuable once the palette hex values are finalized during implementation.

### 2. `add-pbt-property`
- **What**: A playbook for authoring a new fast-check property test in the project convention: >= 100 iterations, tagged `Feature: tszuk-redefined, Property {n}: {text}`, placed alongside the feature it verifies.
- **When**: When extending the correctness properties beyond the current P1-P12.
- **Why later**: Only relevant once the test tooling (Vitest + fast-check) is installed.

### 3. `add-page` / `add-component`
- **What**: A scaffold playbook for a new page or component that wires it into the shared layout, applies token discipline, adds semantic landmarks, and re-inits motion on `astro:page-load`.
- **When**: If the site grows beyond the planned pages (e.g. a journal/blog, services detail pages).
- **Why later**: The current page set is fixed by the spec; revisit only if scope expands.

### 4. `seo-structured-data`
- **What**: A procedure for adding/validating a new JSON-LD block (choosing the schema.org type, the null-omission guard, and validating output).
- **When**: If new structured-data types are needed (e.g. `FAQPage` for the About FAQ, `BreadcrumbList`).
- **Why later**: The current Organization/Person/CreativeWork coverage satisfies the spec.

---

## Powers to consider later

Powers bundle documentation, workflow guides, and optionally MCP servers. None are required for the current build.

### 1. Supabase power (if it bundles the Supabase MCP + guides)
- **When**: When wiring the real contact-form backend (moving from "ready to wire" to live).
- **Value**: Packaged Supabase workflow guidance plus DB tooling in one install.

### 2. Design/Figma power
- **When**: If a Figma file ever becomes the source of truth for the visual design.
- **Value**: Pull design tokens, spacing, and specs directly from Figma into implementation.

### 3. Astro/web-docs power
- **When**: If Astro version upgrades or unfamiliar APIs become frequent.
- **Value**: Curated, current framework documentation on hand.
- **Note**: Low priority — web fetch already covers occasional doc lookups.

---

## MCP servers to consider later

### 1. Supabase MCP   **(top candidate)**
- **When**: Wiring the live contact-form backend (a separate future effort, like the TheRoom project).
- **Value**: Inspect the Supabase project, create the `contact_messages` table, set up the Row Level Security insert policy, and verify schema directly — instead of hand-running SQL.
- **Pairs with**: The `src/lib/contact.ts` env-gated adapter and `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY`.
- **Example config sketch** (fill in real values; keep secrets out of the repo — prefer env references):

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": { "SUPABASE_ACCESS_TOKEN": "<from-env-not-committed>" },
      "disabled": true
    }
  }
}
```

### 2. Vercel MCP  *(nice-to-have)*
- **When**: If deployment troubleshooting gets tedious.
- **Value**: Check deployment status, build logs, and env-var configuration without leaving the editor.
- **Note**: Everything is also doable in the Vercel dashboard, so this is convenience, not necessity.

### Explicitly skip
- **Playwright / browser MCP** — redundant; the spec already uses Playwright as a normal dev dependency.
- **Filesystem / git MCP** — redundant; direct file and terminal access already exist in-workspace.

---

## Suggested sequencing

1. **Now** — build the spec with the existing steering + `add-case-study` skill. No add-ons needed.
2. **During implementation** — optionally add `verify-palette-contrast` and `add-pbt-property` skills once the palette is finalized and test tooling is installed.
3. **When wiring the backend** — add the **Supabase MCP** (and optionally a Supabase power); flip its `disabled` flag to `false` and set credentials via env.
4. **If deployment friction appears** — add the **Vercel MCP**.

> Reminder: keep all credentials out of the repository. MCP `env` values should reference environment variables or local-only secrets, never hard-coded keys.

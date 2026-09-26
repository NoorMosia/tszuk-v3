/**
 * site.ts — single source of truth for site-wide constants.
 *
 * Domain, contact email, social profiles, FAQ content, a short founder summary,
 * and the process phases all live here so rendered markup and structured data
 * never drift apart. The full founder biographies live in the Minds component.
 */

/** Canonical domain (no trailing slash). */
export const SITE_DOMAIN = 'https://tszuk.co.za';

/** Organization name and description, used by structured data. */
export const ORG_NAME = 'tszuk';
export const ORG_DESCRIPTION =
  'tszuk is a branding studio in Port Elizabeth, South Africa, collaborating with companies and personalities to build identities that resonate.';

/** Contact address used in every mailto and displayed contact email. */
export const CONTACT_EMAIL = 'hello@tszuk.co.za';

/**
 * Contact phone number. `display` is the human-readable form; `tel` is the
 * E.164 form for `tel:` links; `wa` is the digits-only form WhatsApp's wa.me
 * links require (no `+` or spaces). Keep all three in sync.
 */
export const CONTACT_PHONE = {
  display: '+27 81 087 0400',
  tel: '+27810870400',
  wa: '27810870400',
} as const;

/** Studio location. */
export const LOCATION = 'Port Elizabeth, South Africa';

/**
 * External profile URLs. Fed into the Organization structured data `sameAs`
 * array and the footer social links. Update the placeholders with the real
 * handles when available.
 */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/tszuk',
  linkedin: 'https://linkedin.com/company/tszuk',
  substack: 'https://tszuk.substack.com',
  whatsapp: `https://wa.me/${CONTACT_PHONE.wa}`,
} as const;

/**
 * Ordered array form of the social profiles for `sameAs`. WhatsApp is a direct
 * chat link rather than an identifying profile page, so it is intentionally
 * excluded from `sameAs` (structured data) while still appearing in the footer.
 */
export const SOCIAL_SAME_AS: string[] = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.substack,
];

/**
 * Common questions. One array feeds the FAQ section markup (native
 * details/summary) and the FAQPage JSON-LD, so they can never disagree.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who does tszuk work with?',
    answer:
      'Two kinds of clients, businesses and personalities. Companies wanting an identity that feels as considered as their work, and individuals who need a presence that carries their voice online.',
  },
  {
    question: 'What is it actually like to work with you?',
    answer:
      'Personal. We start with the feeling you want people to walk away with, then build everything around it. You are close to the process the whole way, never handed a template and left to guess.',
  },
  {
    question: 'Do you only design logos?',
    answer:
      'No. A logo is one small part of a brand. We shape the whole experience, how it looks, how it feels, and how it shows up wherever people meet it.',
  },
  {
    question: 'Where are you based?',
    answer:
      'Port Elizabeth, South Africa. We collaborate with clients wherever they are.',
  },
];

/**
 * Short founder summary for the home behind-the-brand teaser. Full biographies,
 * portraits, roles, and qualifications live in the Minds component, which the
 * Founders page reuses in expanded mode.
 */
export interface FounderSummary {
  name: string;
  role: string;
}

export const FOUNDERS: FounderSummary[] = [
  { name: 'Zukisa', role: 'Co-Founder & Project Manager' },
  { name: 'Mosia', role: 'Co-Founder & Technical Lead' },
];

/**
 * How we work, as ordered phases. Replaces the flat "What We Do" list; each
 * phase groups the former capability items under a stage of the process.
 */
export interface ProcessPhase {
  name: string;
  items: string[];
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    name: 'Discover',
    items: ['Brand strategy', 'Positioning', 'Audience & voice'],
  },
  {
    name: 'Design',
    items: ['Visual identity', 'Brand guidelines', 'Art direction'],
  },
  {
    name: 'Build',
    items: ['Web design & development', 'UI/UX', 'E-commerce experience'],
  },
  {
    name: 'Grow',
    items: ['Campaign & release', 'Social direction', 'Partnerships & growth'],
  },
];

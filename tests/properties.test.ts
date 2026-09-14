import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { isValidEmail } from '../src/lib/contact';
import { businessRowImageSide } from '../src/lib/layout';

/**
 * Property-based tests for the tszuk v2 amendments.
 * fast-check, >= 100 iterations each, tagged per the tech steering.
 */

describe('Feature: tszuk-v2-amendments, Property 1: Alternating business row sides', () => {
  it('places consecutive rows on opposite image sides', () => {
    fc.assert(
      fc.property(fc.nat({ max: 500 }), (i) => {
        const a = businessRowImageSide(i);
        const b = businessRowImageSide(i + 1);
        // Adjacent rows never share a side, and even = left, odd = right.
        expect(a).not.toBe(b);
        expect(a).toBe(i % 2 === 0 ? 'left' : 'right');
      }),
      { numRuns: 200 }
    );
  });
});

describe('Feature: tszuk-v2-amendments, Property 4: Email-first validation', () => {
  it('accepts addresses with one @, a non-empty local part, and a dotted domain', () => {
    const localArb = fc
      .string({ minLength: 1, maxLength: 20 })
      .filter((s) => !s.includes('@') && !s.includes('.') && s.trim().length > 0);
    const labelArb = fc
      .string({ minLength: 1, maxLength: 10 })
      .filter((s) => !s.includes('@') && !s.includes('.') && s.trim().length > 0);

    fc.assert(
      fc.property(localArb, labelArb, labelArb, (local, host, tld) => {
        const email = `${local}@${host}.${tld}`;
        expect(isValidEmail(email)).toBe(true);
      }),
      { numRuns: 200 }
    );
  });

  it('rejects addresses that break the format rule', () => {
    fc.assert(
      fc.property(fc.string({ maxLength: 30 }), (s) => {
        const atCount = (s.match(/@/g) || []).length;
        const [local, domain] = s.split('@');
        const structurallyValid =
          atCount === 1 &&
          local?.length > 0 &&
          domain?.includes('.') &&
          !domain.split('.').some((l) => l.length === 0);
        // isValidEmail must agree with the structural rule for arbitrary input.
        if (!structurallyValid) {
          expect(isValidEmail(s)).toBe(false);
        }
      }),
      { numRuns: 200 }
    );
  });

  it('rejects an empty email (only required field)', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
  });
});

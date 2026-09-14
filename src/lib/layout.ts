/**
 * layout.ts — framework-free layout helpers.
 *
 * Pure functions used by presentation components, kept out of .astro files so
 * they can be unit- and property-tested directly.
 */

/**
 * The image side for a business row at a given zero-based index. Even indexes
 * place the image on the left, odd indexes on the right, producing an
 * alternating zig-zag down the page.
 */
export function businessRowImageSide(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'left' : 'right';
}

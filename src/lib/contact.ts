/**
 * Contact adapter — env-gated and lazy.
 *
 * The Supabase client is guarded behind a dynamic import inside submitContact,
 * so a static build never requires the package unless the adapter is configured.
 * With no env vars set, submitContact returns 'fallback' and never touches the
 * network — enabling the adapter is purely installing @supabase/supabase-js and
 * setting PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY.
 */

export interface ContactSubmission {
  email: string;
  message?: string;
}

export type ContactResult =
  | { status: 'sent' } // adapter inserted
  | { status: 'fallback' } // adapter disabled -> success + mailto
  | { status: 'error'; message: string }; // insert failed -> mailto fallback

/** True only when both Supabase env vars are present. */
export function isAdapterEnabled(): boolean {
  return Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL &&
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Validate an email: exactly one "@", a non-empty local part, and a domain
 * containing at least one ".".
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (local.length === 0) return false;
  if (!domain.includes('.')) return false;
  // Domain must not start or end with a dot and must have a non-empty TLD.
  const labels = domain.split('.');
  if (labels.some((l) => l.length === 0)) return false;
  return true;
}

export async function submitContact(
  data: ContactSubmission
): Promise<ContactResult> {
  if (!isAdapterEnabled()) return { status: 'fallback' };
  try {
    // Lazy dynamic import so the dependency is optional at build time.
    // The specifier is computed and marked @vite-ignore so the bundler does not
    // try to resolve @supabase/supabase-js during a static build where the
    // package is not installed. It is only reached when the adapter is enabled.
    const pkg = ['@supabase', 'supabase-js'].join('/');
    const { createClient } = await import(/* @vite-ignore */ pkg);
    const client = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL!,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY!
    );
    const { error } = await client.from('contact_messages').insert(data);
    if (error) return { status: 'error', message: error.message };
    return { status: 'sent' };
  } catch {
    return { status: 'error', message: 'Message could not be sent.' };
  }
}

/**
 * Contact adapter — Formspree, env-gated.
 *
 * Submissions POST as JSON to the Formspree endpoint configured via
 * PUBLIC_FORMSPREE_ENDPOINT. With that var unset, submitContact returns
 * 'fallback' and never touches the network, so a static build with no
 * configuration still degrades cleanly to the mailto link.
 */

export interface ContactSubmission {
  email: string;
  message?: string;
}

export type ContactResult =
  | { status: 'sent' } // Formspree accepted the submission
  | { status: 'fallback' } // adapter disabled -> success + mailto
  | { status: 'error'; message: string }; // submission failed -> mailto fallback

/** True only when the Formspree endpoint is configured. */
export function isAdapterEnabled(): boolean {
  return Boolean(import.meta.env.PUBLIC_FORMSPREE_ENDPOINT);
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
  const endpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;
  if (!endpoint) return { status: 'fallback' };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) return { status: 'sent' };
    // Formspree returns a JSON body with an `errors` array on failure.
    const body = await response.json().catch(() => null);
    const message =
      body?.errors?.map((e: { message: string }) => e.message).join(', ') ||
      'Message could not be sent.';
    return { status: 'error', message };
  } catch {
    return { status: 'error', message: 'Message could not be sent.' };
  }
}

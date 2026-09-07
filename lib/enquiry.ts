/* =============================================================================
 * ENQUIRY SUBMISSION - the single backend integration point
 * =============================================================================
 *
 *  This is a frontend-only build, so nothing here sends anything anywhere yet.
 *  The contact form is fully built and validated; it just has no destination.
 *
 *  TO CONNECT A BACKEND LATER, edit only this file:
 *
 *    1. Set NEXT_PUBLIC_ENQUIRY_ENDPOINT at build time (or hard-code the URL
 *       into ENQUIRY_ENDPOINT below).
 *    2. Adjust the fetch in `submitEnquiry` to match the API's contract.
 *
 *  Nothing in components/ContactForm.tsx needs to change. Until an endpoint is
 *  configured, `submitEnquiry` returns "not-configured" and the form says so
 *  plainly rather than claiming a message was delivered.
 * ========================================================================== */

/** Destination for enquiries. `null` means no backend is connected yet. */
export const ENQUIRY_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? null;

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  /** Which of the enquiry reasons the visitor picked. */
  need: string;
  message: string;
  /** Product name when the visitor arrived from an "Enquire Now" button. */
  product?: string;
  /** Route the enquiry was sent from, useful for triage. */
  sourcePath: string;
}

export type EnquiryResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

/**
 * Sends an enquiry, if there is anywhere to send it.
 * Never throws - callers switch on the returned status.
 */
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  if (!ENQUIRY_ENDPOINT) {
    return { status: "not-configured" };
  }

  try {
    const response = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "We could not send your message just now. Please try again.",
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message:
        "We could not reach our server. Please check your connection and try again.",
    };
  }
}

/** Options for the "What do you need?" field. */
export const enquiryReasons = [
  "Choosing the right battery",
  "Battery replacement",
  "Battery installation",
  "Battery inspection",
  "Warranty support",
  "Something else",
] as const;

/**
 * Emits a JSON-LD block.
 *
 * The payload is produced by lib/schema.ts via `JSON.stringify`, so it is
 * already valid JSON; `<` is escaped to close off the one way a string value
 * could otherwise break out of the script element.
 */
export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- serialised JSON, escaped below
      dangerouslySetInnerHTML={{ __html: data.replace(/</g, "\\u003c") }}
    />
  );
}
